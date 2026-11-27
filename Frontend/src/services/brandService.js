
import api from "./api";

const formatCount = (value = 0) => {
  const number = Number(value) || 0;

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return String(number);
};

// Backend Creator document -> CreatorCard format
export const normalizeCreator = (creator) => {
  const profile =
    creator.creatorProfile ||
    (creator.accountType === "individual"
      ? creator.individualProfile
      : creator.themePageProfile) ||
    {};

  const followers = Number(
    profile.followers ?? creator.followers ?? 0
  );

  const avgViews = Number(creator.avgViews ?? 0);

  const instagramUsername =
    profile.instagramUsername ||
    creator.instagramUsername ||
    "";

  const username = instagramUsername
    ? `@${instagramUsername.replace(/^@/, "")}`
    : "";

  const location =
    creator.accountType === "individual"
      ? [profile.city, profile.state].filter(Boolean).join(", ")
      : profile.mainAudienceCountry || "";

  return {
    _id: creator._id,

    // Identity
    name: profile.pageName || creator.fullName || "Creator",
    username,

    // Profile
    bio: profile.bio || profile.pageDescription || "",
    avatar: creator.avatar || profile.avatar || "",
    cover: creator.cover || profile.cover || "",

    // Category and location
    category: profile.primaryNiche || "",
    location,

    // Social platform
    platforms: ["Instagram"],

    // Metrics
    followers,
    followersLabel: formatCount(followers),

    avgViews,
    avgViewsLabel: formatCount(avgViews),

    engagement: Number(
      creator.engagementRate ?? creator.engagement ?? 0
    ),

    // Other card fields
    availability: creator.isActive === false ? "Unavailable" : "Available",
    verified: Boolean(creator.isVerified),

    // Keep original data available for the details page
    accountType: creator.accountType,
    profile,
  };
};

export const getAllCreators = async (filters = {}, signal) => {
  const { data } = await api.get("brand/creator/all", {
    params: filters,
    signal,
  });


  const rawCreators =
    data.creators ||
    data.data?.creators ||
    [];

  return {
    ...data,
    creators: rawCreators.map(normalizeCreator),
  };
};


// Get creator details by MongoDB ID
export const getCreatorById = async (id) => {
  const { data } = await api.get(`brand/creator/${id}`);

  if (!data.success || !data.creator) {
    throw new Error(data.message || "Creator not found");
  }

  const creator = data.creator;
  const profile = creator.creatorProfile ||
    (creator.accountType === "individual"
      ? creator.individualProfile
      : creator.themePageProfile) || {};

  const followers = Number(creator.followers ?? profile.followers ?? 0);
  const avgViews = Number(creator.avgViews ?? 0);
  const avgLikes = Number(creator.avgLikes ?? 0);
  const instagramUsername = profile.instagramUsername || "";

  return {
    ...creator,
    creatorProfile: profile,
    name: profile.pageName || creator.fullName || "Creator",
    username: instagramUsername ? `@${instagramUsername.replace(/^@/, "")}` : "",
    bio: profile.bio || profile.pageDescription || "",
    category: profile.primaryNiche || "",
    location:
      creator.accountType === "individual"
        ? [profile.city, profile.state].filter(Boolean).join(", ")
        : profile.mainAudienceCountry || "",
    platforms: ["Instagram"],
    followers,
    followersLabel: formatCount(followers),
    avgViews,
    avgViewsLabel: formatCount(avgViews),
    avgLikes,
    engagement: Number(creator.engagementRate ?? 0),
    availability: creator.isActive ? "Available" : "Unavailable",
    contentTypes: profile.contentType ? [profile.contentType] : [],
  };
};