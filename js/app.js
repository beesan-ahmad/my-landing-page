document.addEventListener('DOMContentLoaded', () => {
  const navItems = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#schedules', text: 'Schedules' },
    { href: '#contact', text: 'Contact' },
    { href: '#signup', text: 'Sign up', class: 'btn' },
  ];

  const navbar = document.getElementById('navbar');
  const logo = document.querySelector('.logo');

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
      const sectionTop = section.offsetTop - 50;
      const sectionHeight = section.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        const targetId = '#' + section.id;
        const targetNavItem = document.querySelector(`#navbar a[href="${targetId}"]`);
        setActiveNavItem(targetNavItem);
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

  // Toggle theme
  const toggleBtn = document.querySelector('.toggle-btn');
  const bigWrapper = document.querySelector('.big-wrapper');
  let dark = false;

  function toggleAnimation() {
    dark = !dark;
    let clone = bigWrapper.cloneNode(true);
    if (dark) {
      clone.classList.remove('light');
      clone.classList.add('dark');
    } else {
      clone.classList.remove('dark');
      clone.classList.add('light');
    }
    clone.classList.add('copy');
    document.body.classList.add('stop-scrolling');

    clone.addEventListener('animationend', () => {
      document.body.classList.remove('stop-scrolling');
      bigWrapper.remove();
      clone.classList.remove('copy');
      // Reset variables and rebind events
      declare();
      events();
    });

    document.body.appendChild(clone);
  }

  // Initial function declarations
  let toggle_btn;
  let hamburger_menu;

  function declare() {
    toggle_btn = document.querySelector('.toggle-btn');
    bigWrapper = document.querySelector('.big-wrapper');
    hamburger_menu = document.querySelector('.hamburger-menu');
  }

  // Event listeners
  function events() {
    toggle_btn.addEventListener('click', toggleAnimation);
    hamburger_menu.addEventListener('click', function () {
      this.classList.toggle('active');

      if (this.classList.contains('active')) {
        bigWrapper.classList.add('active');
      } else {
        bigWrapper.classList.remove('active');
      }
    });

    // Hide navbar on scroll down, show on scroll up
    let lastScrollTop = 0;
    window.addEventListener('scroll', function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scroll down
        navbar.classList.add('hide');
      } else {
        // Scroll up
        navbar.classList.remove('hide');
      }
      lastScrollTop = scrollTop;
    });
  }

  // Execute functions
  declare();
  events();
});
