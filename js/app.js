document.addEventListener('DOMContentLoaded', () => {
  const navItems = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#schedules', text: 'Schedules' },
    { href: '#contact', text: 'Contact' },
    { href: '#signup', text: 'Sign up', class: 'btn' },
  ];

  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section'); // Assume sections have id's matching navItem hrefs

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
  const navLinks = document.querySelectorAll('#navbar a');

  function scrollToSection(event) {
    event.preventDefault();

    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
  });

  // Function to highlight the active section link
  function highlightNavLink() {
    let currentSectionId = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSectionId) {
        link.classList.add('active');
      }
    });
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

    main.appendChild(clone);
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
    hamburger_menu.addEventListener('click', function() {
      this.classList.toggle('active');

      if (this.classList.contains('active')) {
        bigWrapper.classList.add('active');
      } else {
        bigWrapper.classList.remove('active');
      }
    });

    // Hide navbar on scroll down, show on scroll up
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scroll down
        navbar.classList.add('hide');
      } else {
        // Scroll up
        navbar.classList.remove('hide');
      }
      lastScrollTop = scrollTop;

      // Highlight the active section link
      highlightNavLink();
    });

    // Initial highlight on load
    highlightNavLink();
  }

  // Execute functions
  declare();
  events();
});
