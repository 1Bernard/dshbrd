// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay'); // Get the overlay element
const allSideDivider = document.querySelectorAll('#sidebar .divider'); // Get all dividers

allDropdown.forEach(item => {
  const a = item.parentElement.querySelector('a:first-child');
  a.addEventListener('click', function (e) {
    e.preventDefault();

    // Check sidebar state before attempting to expand
    const isSidebarHiddenOnTablet = window.innerWidth > 768 && window.innerWidth <= 1024 && sidebar.classList.contains('hide');
    console.log(`[Dropdown Click] Current width: ${window.innerWidth}. Sidebar has 'hide' class: ${sidebar.classList.contains('hide')}. Condition to expand: ${isSidebarHiddenOnTablet}`);


    // If on tablet and sidebar is collapsed, expand it first
    if (isSidebarHiddenOnTablet) {
      sidebar.classList.remove('hide'); // Expand the sidebar
      console.log('[Dropdown Click] Sidebar was hidden on tablet, now removing "hide" class.');
      updateDividerText(); // Update divider text to show full text
    }

    // Close other open dropdowns
    if (!this.classList.contains('active')) {
      allDropdown.forEach(i => {
        const aLink = i.parentElement.querySelector('a:first-child');
        aLink.classList.remove('active');
        i.classList.remove('show');
      })
    }

    // Toggle current dropdown
    this.classList.toggle('active');
    item.classList.toggle('show');
  })
})

// Function to update divider text based on sidebar state (desktop/tablet collapsed)
function updateDividerText() {
  // Only set '-' for desktop/tablet when sidebar is collapsed
  if (window.innerWidth > 768 && sidebar.classList.contains('hide')) {
    allSideDivider.forEach(item => {
      item.textContent = '-'; // Show '-' for collapsed/hidden state
    });
  } else { // For mobile (always full text when visible), and desktop/tablet when open
    allSideDivider.forEach(item => {
      item.textContent = item.dataset.text; // Show full text
    });
  }
}


// SIDEBAR COLLAPSE / DRAWABLE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const closeSidebarBtn = document.querySelector('#sidebar .close-sidebar-btn'); // Get the new close button


// Initial check for sidebar state on page load
document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth <= 768) { // For mobile (drawable)
    sidebar.classList.add('hide'); // Sidebar starts off-screen (translateX(-100%))
    sidebarOverlay.classList.remove('show-overlay'); // Ensure overlay is hidden
  } else if (window.innerWidth > 768 && window.innerWidth <= 1024) { // For tablet (collapsed)
    sidebar.classList.add('hide'); // Sidebar starts collapsed (width: 60px)
    sidebarOverlay.classList.remove('show-overlay'); // Ensure overlay is hidden
  } else { // For large desktop (open)
    sidebar.classList.remove('hide'); // Sidebar starts open (width: 260px)
    sidebarOverlay.classList.remove('show-overlay'); // Ensure overlay is hidden
  }
  updateDividerText(); // Set initial divider text based on initial state
});


// Event listener for sidebar toggle button (click)
toggleSidebar.addEventListener('click', function () {
  if (window.innerWidth <= 768) { // Mobile: Drawable sidebar
    if (sidebar.classList.contains('hide')) { // If currently off-screen
      sidebar.classList.remove('hide'); // Slide in
      sidebarOverlay.classList.add('show-overlay'); // Show overlay
    } else { // If currently on-screen
      sidebar.classList.add('hide'); // Slide out
      sidebarOverlay.classList.remove('show-overlay'); // Hide overlay
    }
  } else { // Tablet and Desktop: Collapsible sidebar
    sidebar.classList.toggle('hide');
    updateDividerText();
  }
  // Close any open dropdowns when toggling sidebar
  allDropdown.forEach(item => {
    const a = item.parentElement.querySelector('a:first-child');
    a.classList.remove('active');
    item.classList.remove('show');
  });
});

// Event listener for overlay click (to close drawable sidebar on mobile)
if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', function () {
    // Only close if sidebar is currently visible (not .hide) and on mobile
    if (!sidebar.classList.contains('hide') && window.innerWidth <= 768) {
      sidebar.classList.add('hide'); // Slide out
      sidebarOverlay.classList.remove('show-overlay'); // Hide overlay
      // Close dropdowns
      allDropdown.forEach(item => {
        const a = item.parentElement.querySelector('a:first-child');
        a.classList.remove('active');
        item.classList.remove('show');
      });
    }
  });
}

// Event listener for new close button click (to close drawable sidebar on mobile)
if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener('click', function () {
    if (window.innerWidth <= 768) { // Only applies to mobile
      sidebar.classList.add('hide'); // Slide out
      sidebarOverlay.classList.remove('show-overlay'); // Hide overlay
      // Close dropdowns
      allDropdown.forEach(item => {
        const a = item.parentElement.querySelector('a:first-child');
        a.classList.remove('active');
        item.classList.remove('show');
      });
    }
  });
}

// Adjust sidebar and overlay visibility on window resize
window.addEventListener('resize', function () {
  if (window.innerWidth <= 768) { // Mobile
    sidebar.classList.add('hide'); // Ensure it's off-screen (translateX(-100%))
    sidebarOverlay.classList.remove('show-overlay'); // Always hide overlay on resize
  } else if (window.innerWidth > 768 && window.innerWidth <= 1024) { // Tablet
    sidebar.classList.add('hide'); // Ensure it's collapsed (width: 60px)
    sidebarOverlay.classList.remove('show-overlay'); // Always hide overlay on resize
  } else { // Large desktop
    sidebar.classList.remove('hide'); // Ensure it's open (260px width)
    sidebarOverlay.classList.remove('show-overlay');
    delete sidebar.dataset.hoverOpen; // Clear hover flag
  }
  updateDividerText(); // Adjust divider text for new screen size
  // Close dropdowns on resize for cleaner state
  allDropdown.forEach(item => {
    const a = item.parentElement.querySelector('a:first-child');
    a.classList.remove('active');
    item.classList.remove('show');
  });
});

// Handle sidebar behavior on mouse enter (hover to open) - Desktop/Tablet only
sidebar.addEventListener('mouseenter', function () {
  // Only apply hover effect on screens wider than 768px (desktop/tablet) when it's collapsed (has hide class)
  if (window.innerWidth > 768 && sidebar.classList.contains('hide')) {
    sidebar.classList.remove('hide'); // Open it (260px)
    sidebar.dataset.hoverOpen = 'true'; // Mark that it's opened by hover
    updateDividerText(); // Show full divider text on hover open
  }
});

// Handle sidebar behavior on mouse leave (hover to close) - Desktop/Tablet only
sidebar.addEventListener('mouseleave', function () {
  // Only apply hover effect on screens wider than 768px (desktop/tablet) if it was opened by hover
  if (window.innerWidth > 768 && sidebar.dataset.hoverOpen === 'true') {
    sidebar.classList.add('hide'); // Collapse it (60px)
    delete sidebar.dataset.hoverOpen; // Remove the flag
    updateDividerText(); // Show collapsed divider text on hover close
  }
});


// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function (e) {
  e.stopPropagation(); // Prevent global click from closing it immediately
  dropdownProfile.classList.toggle('show');
})


// MENU (for general content data menus)
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item => {
  const icon = item.querySelector('.icon');
  const menuLink = item.querySelector('.menu-link');

  icon.addEventListener('click', function () {
    menuLink.classList.toggle('show');
  })
})

// Global click listener to close dropdowns when clicking outside
window.addEventListener('click', function (e) {
  // Close profile dropdown
  if (e.target !== imgProfile && !profile.contains(e.target)) { // Check if click is outside imgProfile and dropdownProfile
    if (dropdownProfile.classList.contains('show')) {
      dropdownProfile.classList.remove('show');
    }
  }

  // Close general content data menus
  allMenu.forEach(item => {
    const icon = item.querySelector('.icon');
    const menuLink = item.querySelector('.menu-link');

    if (e.target !== icon && !item.contains(e.target)) { // Check if click is outside icon and menuLink container
      if (menuLink.classList.contains('show')) {
        menuLink.classList.remove('show')
      }
    }
  })
})

// Theme Toggler Logic
const themeToggler = document.querySelector('.theme-toggler');
const lightModeIcon = themeToggler.querySelector('span:nth-child(1)');
const darkModeIcon = themeToggler.querySelector('span:nth-child(2)');

themeToggler.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables');

  lightModeIcon.classList.toggle('active');
  darkModeIcon.classList.toggle('active');
});


// Set today's date in the navbar
const today = new Date();
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', dateOptions);
document.getElementById('current-date').textContent = formattedDate;