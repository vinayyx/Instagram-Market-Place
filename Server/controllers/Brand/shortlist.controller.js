const mongoose = require("mongoose");
const Shortlist = require("../../models/Brand/shortlist.model");
const Creator = require("../../models/Creator/creator.model");


const addToShortlist = async (req, res) => {
    try {
        const brandId = req.user.id;
        const { creatorId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(creatorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid creator ID",
            });
        }

        const creator = await Creator.findOne({
            _id: creatorId,
            isActive: true,
        }).select("_id fullName");


        if (!creator) {
            return res.status(404).json({
                success: false,
                message: "Creator not found",
            });
        }

        const existing = await Shortlist.findOne({
            brand: brandId,
            creator: creatorId,
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Creator is already shortlisted",
            });
        }

        const shortlist = await Shortlist.create({
            brand: brandId,
            creator: creatorId,

        });

        return res.status(201).json({
            success: true,
            message: "Creator added to shortlist",
            shortlist,
            creatorName: creator.fullName
        });
    } catch (error) {
        // Handles duplicate requests arriving at the same time
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Creator is already shortlisted",
            });
        }

        console.error("Add shortlist error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add creator to shortlist",
        });
    }
};


const getShortlistedCreators = async (req, res) => {
    try {
        const brandId = req.user.id;

        const shortlisted = await Shortlist.find({
            brand: brandId,
        })
            .populate({
                path: "creator",
                select:
                    "fullName accountType individualProfile themePageProfile bestReels isActive createdAt",
            })
            .sort({ createdAt: -1 })
            .lean();

        // Remove entries whose creator record no longer exists
        const creators = shortlisted
            .filter((item) => item.creator)
            .map((item) => ({
                shortlistId: item._id,
                shortlistedAt: item.createdAt,
                ...item.creator,
            }));

        return res.status(200).json({
            success: true,
            total: creators.length,
            creators,
        });
    } catch (error) {
        console.error("Get shortlist error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch shortlisted creators",
        });
    }
};


const removeFromShortlist = async (req, res) => {
    try {
        const brandId = req.user.id;
        const { creatorId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(creatorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid creator ID",
            });
        }

        const deleted = await Shortlist.findOneAndDelete({
            brand: brandId,
            creator: creatorId,
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Creator is not in your shortlist",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Creator removed from shortlist",
        });
    } catch (error) {
        console.error("Remove shortlist error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove creator from shortlist",
        });
    }
};


const checkShortlist = async (req, res) => {
    try {
        const brandId = req.user.id;
        const { creatorId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(creatorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid creator ID",
            });
        }

        const existing = await Shortlist.exists({
            brand: brandId,
            creator: creatorId,
        });

        return res.status(200).json({
            success: true,
            isShortlisted: Boolean(existing),
        });
    } catch (error) {
        console.error("Check shortlist error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to check shortlist status",
        });
    }
};

module.exports = {
    addToShortlist,
    getShortlistedCreators,
    removeFromShortlist,
    checkShortlist,
};