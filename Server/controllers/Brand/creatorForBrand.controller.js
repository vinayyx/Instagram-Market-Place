
const Creator = require("../../models/Creator/creator.model");
const mongoose = require("mongoose")


//CONSTANT FOR NICHES
const NICHES = [
    "Fashion & Beauty",
    "Fitness & Health",
    "Technology",
    "Gaming",
    "Travel",
    "Food",
    "Lifestyle",
    "Education",
    "Entertainment",
    "Finance",
    "Photography",
    "Comedy",
    "Other",
];

const getAllCreator = async (req, res) => {
    try {
        const {
            search,
            category,
            platform,
            creatorType,
            minFollowers,
            maxFollowers,
            minEngagement,
            sort = "most_followers",
            page = 1,
            limit = 12,
        } = req.query;

        // 1. Pagination
        const currentPage = Math.max(1, Number(page) || 1);
        const pageLimit = Math.min(50, Math.max(1, Number(limit) || 12));
        const skip = (currentPage - 1) * pageLimit;

        // 2. Category validation
        if (category && !NICHES.includes(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid creator category",
            });
        }

        // 3. Platform validation
        if (platform && platform.toLowerCase() !== "instagram") {
            return res.status(400).json({
                success: false,
                message: "Currently only Instagram creators are supported",
            });
        }

        // 4. Creator type validation
        if (
            creatorType &&
            !["individual", "theme_page"].includes(creatorType)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid creator type",
            });
        }

        // 5. Followers validation
        const min =
            minFollowers === undefined ? undefined : Number(minFollowers);

        const max =
            maxFollowers === undefined ? undefined : Number(maxFollowers);

        if (
            (min !== undefined && (!Number.isFinite(min) || min < 0)) ||
            (max !== undefined && (!Number.isFinite(max) || max < 0)) ||
            (min !== undefined && max !== undefined && min > max)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid followers range",
            });
        }

        // 6. Sorting options
        const sortOptions = {
            most_followers: { followers: -1 },
            highest_engagement: { engagementRate: -1 },
            most_views: { avgViews: -1 },
        };

        if (!sortOptions[sort]) {
            return res.status(400).json({
                success: false,
                message: "Invalid sorting option",
            });
        }

        // 7. Aggregation pipeline
        const pipeline = [
            // 8. Select individual or theme page profile
            {
                $addFields: {
                    creatorProfile: {
                        $cond: [
                            { $eq: ["$accountType", "individual"] },
                            "$individualProfile",
                            "$themePageProfile",
                        ],
                    },
                },
            },

            // 9. Calculate average views, likes and followers
            {
                $addFields: {
                    avgViews: {
                        $avg: {
                            $map: {
                                input: { $ifNull: ["$bestReels", []] },
                                as: "reel",
                                in: "$$reel.views",
                            },
                        },
                    },

                    avgLikes: {
                        $avg: {
                            $map: {
                                input: { $ifNull: ["$bestReels", []] },
                                as: "reel",
                                in: "$$reel.likes",
                            },
                        },
                    },

                    followers: {
                        $ifNull: ["$creatorProfile.followers", 0],
                    },
                },
            },

            // 10. Calculate engagement rate (2 decimal places)
            {
                $addFields: {
                    engagementRate: {
                        $round: [
                            {
                                $cond: [
                                    { $gt: ["$avgViews", 0] },
                                    {
                                        $multiply: [
                                            { $divide: ["$avgLikes", "$avgViews"] },
                                            100,
                                        ],
                                    },
                                    0,
                                ],
                            },
                            2,
                        ],
                    },
                },
            },


        ];

        if (minEngagement !== undefined && minEngagement !== "") {
            pipeline.push({
                $match: {
                    engagementRate: {
                        $gte: Number(minEngagement),
                    },
                },
            });
        }

        // 11. Build filters
        const match = {
            isActive: true,
        };

        // 12. Search by name or Instagram username
        if (search && search.trim()) {
            const safeSearch = search
                .trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            const regex = new RegExp(safeSearch, "i");

            match.$or = [
                { fullName: regex },
                { "creatorProfile.instagramUsername": regex },
                { "creatorProfile.pageName": regex },
            ];
        }

        // 13. Category filter
        if (category) {
            match.$and = [
                ...(match.$and || []),
                {
                    $or: [
                        { "creatorProfile.primaryNiche": category },
                        { "creatorProfile.otherNiches": category },
                    ],
                },
            ];
        }

        // 14. Individual / Theme Page filter
        if (creatorType) {
            match.accountType = creatorType;
        }

        // 15. Followers range filter
        if (min !== undefined || max !== undefined) {
            match.followers = {};

            if (min !== undefined) {
                match.followers.$gte = min;
            }

            if (max !== undefined) {
                match.followers.$lte = max;
            }
        }

        // 16. Apply filters
        pipeline.push({
            $match: match,
        });

        // 17. Remove private fields
        pipeline.push({
            $project: {
                password: 0,
                email: 0,
                phone: 0,
                dob: 0,
            },
        });

        // 18. Sort, paginate and count
        pipeline.push({
            $facet: {
                creators: [
                    { $sort: sortOptions[sort] },
                    { $skip: skip },
                    { $limit: pageLimit },
                ],

                totalCount: [
                    { $count: "count" },
                ],
            },
        });

        // 19. Execute aggregation
        const [result] = await Creator.aggregate(pipeline);

        const creators = result?.creators || [];
        const totalCreators = result?.totalCount[0]?.count || 0;

        // 20. Send response
        return res.status(200).json({
            success: true,
            creators,
            pagination: {
                totalCreators,
                currentPage: Number(page),
                totalPages: Math.ceil(totalCreators / Number(limit)),
                limit: Number(limit),
                hasMore: Number(page) < Math.ceil(totalCreators / Number(limit)),
            },
        });

    } catch (error) {
        console.error("Get All Creator Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


const getCreatorById = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Validate Creator ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid creator ID",
            });
        }

        // 2. Fetch Creator
        const creator = await Creator.findOne({
            _id: id,
            isActive: true,
        })
            .select("-password -email -phone -dob -__v")
            .lean();

        // 3. Check Creator Exists
        if (!creator) {
            return res.status(404).json({
                success: false,
                message: "Creator not found",
            });
        }

        // 4. Select Correct Profile
        const profile =
            creator.accountType === "individual"
                ? creator.individualProfile
                : creator.themePageProfile;

        // 5. Calculate Average Reel Views and Likes
        const reels = creator.bestReels || [];

        const avgViews = reels.length
            ? Math.round(
                reels.reduce((sum, reel) => sum + (reel.views || 0), 0) /
                reels.length
            )
            : 0;

        const avgLikes = reels.length
            ? Math.round(
                reels.reduce((sum, reel) => sum + (reel.likes || 0), 0) /
                reels.length
            )
            : 0;

        // 6. Calculate Engagement Rate
        const engagementRate =
            avgViews > 0
                ? Number(((avgLikes / avgViews) * 100).toFixed(2))
                : 0;

        // 7. Response
        return res.status(200).json({
            success: true,
            message: "Creator fetched successfully",
            creator: {
                ...creator,
                creatorProfile: profile,
                followers: profile?.followers || 0,
                avgViews,
                avgLikes,
                engagementRate,
            },
        });
    } catch (error) {
        console.error("Get Creator By ID Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
module.exports = {
    getAllCreator,
    getCreatorById
};


