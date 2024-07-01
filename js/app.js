document.addEventListener('DOMContentLoaded', () => {
  const navItems = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#schedules', text: 'Schedule' },
    { href: '#contact', text: 'Contact' },
    { href: '#signup', text: 'Sign up', class: 'btn' },
  ];

  const navbar = document.getElementById('navbar');

  // Create navigation links
  navItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.text;
    if (item.class) {
      a.classList.add(item.class);
    }
    li.appendChild(a);
    navbar.appendChild(li);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Set active class to clicked item
        setActiveNavItem(this);
      }
    });
  });

  // Function to determine which section is in the viewport and highlight the nav item
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar a');

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isInViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );

      if (isInViewport) {
        // Add active class to the section and its corresponding nav item
        section.classList.add('active');
        const targetId = '#' + section.id;
        const targetNavItem = document.querySelector(`#navbar a[href="${targetId}"]`);
        targetNavItem.classList.add('active');
      } else {
        // Remove active class from inactive sections and nav items
        section.classList.remove('active');
        const targetId = '#' + section.id;
        const targetNavItem = document.querySelector(`#navbar a[href="${targetId}"]`);
        targetNavItem.classList.remove('active');
      }
    });
  }

  // Event listener for scroll events
  window.addEventListener('scroll', highlightNavOnScroll);

  // Set active class to navigation item
  function setActiveNavItem(targetNavItem) {
    // Remove active class from all nav items
    document.querySelectorAll('#navbar a').forEach(item => {
      item.classList.remove('active');
    });

    // Add active class to the clicked item
    targetNavItem.classList.add('active');
  }

  // Initial highlight based on initial scroll position
  highlightNavOnScroll();
});
