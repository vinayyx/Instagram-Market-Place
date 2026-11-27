import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./Utility/ScrollToTop.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrandProvider } from "./context/BrandContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BrandProvider>
        <AuthProvider>
          <ScrollToTop />
          <App />
        </AuthProvider>
      </BrandProvider>
    </BrowserRouter>
  </StrictMode>,
);
