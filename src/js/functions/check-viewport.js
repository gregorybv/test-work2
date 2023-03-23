//isMobile
export const isMobile = () => {
  if (window.innerWidth < 768) {
    return true;
  }

  return false;
};

// isTablet
export const isTablet = () => {
  if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
    return true;
  }

  return false;
};

// isDesktop
export const isDesktop = () => {
  if (window.innerWidth > 1025) {
    return true;
  }

  return false;
};
