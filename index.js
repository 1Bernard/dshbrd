document.addEventListener("DOMContentLoaded", () => {
  const sideMenu = document.querySelector("aside");
  const menuBtn = document.querySelector("#menu-btn");
  const closeBtn = document.querySelector("#close-btn");
  const themeToggler = document.querySelector(".theme-toggler");
  const root = document.documentElement;

  // Sidebar toggle
  if (menuBtn && sideMenu) {
    menuBtn.addEventListener("click", () => {
      sideMenu.style.display = "block";
    });
  }

  if (closeBtn && sideMenu) {
    closeBtn.addEventListener("click", () => {
      sideMenu.style.display = "none";
    });
  }

  // Theme toggler
  if (themeToggler) {
    const lightModeIcon = themeToggler.querySelector("span:nth-child(1)");
    const darkModeIcon = themeToggler.querySelector("span:nth-child(2)");

    if (root.classList.contains("dark-theme-variables")) {
      lightModeIcon.classList.remove("active");
      darkModeIcon.classList.add("active");
    } else {
      lightModeIcon.classList.add("active");
      darkModeIcon.classList.remove("active");
    }

    themeToggler.addEventListener("click", () => {
      root.classList.toggle("dark-theme-variables");

      if (root.classList.contains("dark-theme-variables")) {
        localStorage.setItem("darkMode", "enabled");
        lightModeIcon.classList.remove("active");
        darkModeIcon.classList.add("active");
      } else {
        localStorage.setItem("darkMode", "disabled");
        lightModeIcon.classList.add("active");
        darkModeIcon.classList.remove("active");
      }
    });
  }

  // More options mini-modal
  document.querySelectorAll(".more-options").forEach((option) => {
    const moreIcon = option.querySelector(".more-icon");
    const miniModal = option.querySelector(".mini-modal");

    moreIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      miniModal.classList.toggle("show");
    });

    document.addEventListener("click", (event) => {
      if (!option.contains(event.target)) {
        miniModal.classList.remove("show");
      }
    });
  });
});
