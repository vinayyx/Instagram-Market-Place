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

//IMPORTS FOR BRAND
import BrandSignup from "./Brand/Auth/BrandSinup";

//LAYOUTS
import CreatorLayout from "./Creator/layouts/CreatorLayout";

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
