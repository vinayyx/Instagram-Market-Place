
const normalizeUrl = (url = "") => {
  if (!url.trim()) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return 0;
  }

  return Number(value);
};

const normalizeUsername = (username = "") => {
  return username.trim().replace(/^@/, "");
};

export const createCreatorPayload = (payload) => {
  // Convert frontend account type to backend account type
  const accountType =
    payload.accountType === "theme" ? "theme_page" : "individual";

  // Convert best reels
  const reels = [
    {
      reelLink: payload.bestUrl,
      views: payload.bestViews,
      likes: payload.bestLikes,
      comments: payload.bestComments,
      shares: payload.bestShares,
    },
    {
      reelLink: payload.r2Url,
      views: payload.r2Views,
      likes: payload.r2Likes,
      comments: payload.r2Comments,
      shares: payload.r2Shares,
    },
    {
      reelLink: payload.r3Url,
      views: payload.r3Views,
      likes: payload.r3Likes,
      comments: payload.r3Comments,
      shares: payload.r3Shares,
    },
  ];

  const bestReels = reels
    .filter((reel) => reel.reelLink?.trim())
    .map((reel) => ({
      reelLink: normalizeUrl(reel.reelLink),
      views: toNumber(reel.views),
      likes: toNumber(reel.likes),
      comments: toNumber(reel.comments),
      shares: toNumber(reel.shares),
    }));

  // Common fields
  const commonPayload = {
    accountType,
    fullName: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    phone: payload.mobile,
    dob: payload.dob,
    bestReels,
  };

  // Individual Creator
  if (accountType === "individual") {
    return {
      ...commonPayload,

      individualProfile: {
        instagramUsername: normalizeUsername(payload.username),
        followers: toNumber(payload.followers),
        instagramProfileLink: normalizeUrl(payload.instagramUrl),

        primaryNiche: payload.primaryNiche,
        otherNiches: payload.secondaryNiches || [],
        contentLanguages: payload.languages || [],

        city: payload.city,
        state: payload.state,
        bio: payload.bio,
      },
    };
  }

  // Theme Page Creator
  return {
    ...commonPayload,

    themePageProfile: {
      pageName: payload.pageName,

      instagramUsername: normalizeUsername(payload.username),
      followers: toNumber(payload.followers),
      instagramProfileLink: normalizeUrl(payload.instagramUrl),

      primaryNiche: payload.primaryNiche,
      otherNiches: payload.secondaryNiches || [],
      contentLanguages: payload.languages || [],

      mainAudienceCountry: payload.audienceCountry,
      contentType: payload.contentType,
      publishesSponsoredContent: payload.sponsored === "yes",
      pageDescription: payload.bio,
    },
  };
};
