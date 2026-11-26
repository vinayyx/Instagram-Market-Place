import { Routes, Route } from "react-router-dom";

//IMPORTS FOR WEBISTE
import Home from "./Web/Home";
import AccountType from "./Web/AccountType";
import Login from "./Web/Login";

//IMPORTS FOR CREATORS
import CreatorSignup from "./Creator/Auth/CreatorSignup";
import Overview from "./Creator/pages/Overview";
import CampaignDetails from "./Creator/pages/CampaignDetails";
import ExploreCampaigns from "./Creator/pages/ExploreCampaigns";
import MyApplications from "./Creator/pages/MyApplications";
import ActiveCampaigns from "./Creator/pages/ActiveCampaigns";
import MyContent from "./Creator/pages/MyContent";
import Earnings from "./Creator/components/Earnings";
import Withdrawals from "./Creator/pages/Withdrawals";
import MyProfile from "./Creator/pages/MyProfile";
import Settings from "./Creator/pages/Settings";

//IMPORTS FOR BRAND
import BrandSignup from "./Brand/Auth/BrandSinup";
import BrandOverview from "./Brand/pages/BrandOverview.jsx";
import ExploreCreators from "./Brand/pages/ExploreCreators";
import CreatorDetails from "./Brand/pages/CreatorDetails";
import MyCampaigns from "./Brand/pages/MyCampaigns";
import BrandCampaignDetails from "./Brand/pages/BrandCampaignDetails.jsx";
import CreateCampaign from "./Brand/pages/CreateCampaign.jsx";
import Applications from "./Brand/pages/Applications.jsx";
import ApplicationDetails from "./Brand/pages/ApplicationDetails.jsx";
import ActiveCollaborations from "./Brand/pages/ActiveCollaborations.jsx";
import ContentSubmissions from "./Brand/pages/ContentSubmissions.jsx";
import SubmissionDetails from "./Brand/pages/SubmissionDetails.jsx";
import Analytics from "./Brand/pages/Analytics.jsx";
import WalletBilling from "./Brand/pages/WalletBilling.jsx";
import BrandProfile from "./Brand/pages/BrandProfile.jsx";
import BrandSettings from "./Brand/pages/BrandSettings.jsx";

//LAYOUTS
import CreatorLayout from "./Creator/layouts/CreatorLayout";
import BrandLayout from "./Brand/layouts/BrandLayout";

function App() {
  return (
    <div>
      <Routes>
        {/* WEBSITE ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/account-type" element={<AccountType />} />
        <Route path="/creator-singup" element={<CreatorSignup />} />
        <Route path="/brand-singup" element={<BrandSignup />} />
        <Route path="/login" element={<Login />} />

        {/* CREATOR ROUTES */}
        <Route path="/creator" element={<CreatorLayout />}>
          <Route index element={<Overview />} />
          <Route path="campaigns" element={<ExploreCampaigns />} />
          <Route path="campaigns/:id" element={<CampaignDetails />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="active-campaigns" element={<ActiveCampaigns />} />
          <Route path="content" element={<MyContent />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="withdrawals" element={<Withdrawals />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* BRAND ROUTES */}
        <Route path="/brand" element={<BrandLayout />}>
          <Route index element={<BrandOverview />} />
          <Route path="creators" element={<ExploreCreators />} />
          <Route path="creators/:username" element={<CreatorDetails />} />
          <Route path="campaigns" element={<MyCampaigns />} />
          <Route
            path="campaigns/:campaignId"
            element={<BrandCampaignDetails />}
          />
          <Route path="create-campaign" element={<CreateCampaign />} />
          <Route path="applications" element={<Applications />} />
          <Route
            path="applications/:applicationId"
            element={<ApplicationDetails />}
          />
          <Route path="collaborations" element={<ActiveCollaborations />} />
          <Route path="content" element={<ContentSubmissions />} />
          <Route path="content/:submissionId" element={<SubmissionDetails />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="wallet" element={<WalletBilling />} />
          <Route path="profile" element={<BrandProfile />} />
          <Route path="settings" element={<BrandSettings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
