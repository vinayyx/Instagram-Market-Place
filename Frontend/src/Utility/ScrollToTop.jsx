import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const scrollContainers = document.querySelectorAll(
      "[data-scroll-container]"
    );

    scrollContainers.forEach((container) => {
      container.scrollTop = 0;
      container.scrollLeft = 0;
    });

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;