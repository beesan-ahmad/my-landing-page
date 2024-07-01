document.addEventListener('DOMContentLoaded', () => {
  const navItems = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#schedules', text: 'Schedules' },
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
  navbar.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Remove active class from all links
        navbar.querySelectorAll('a').forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to clicked link
        this.classList.add('active');
      }
    });
  });

  // Function to determine which section is in the viewport and highlight the nav item
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar a');

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;

      if (sectionTop <= 150 && sectionBottom >= 150) {
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));

        // Find corresponding nav link and add active class
        const targetId = `#${section.id}`;
        const activeLink = document.querySelector(`#navbar a[href="${targetId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Event listener for scroll events
  window.addEventListener('scroll', highlightNavOnScroll);

  // Initial call to highlight the active section on page load
  highlightNavOnScroll();
});
