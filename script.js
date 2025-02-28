// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    // Do not prevent default - let Formspree handle the submission
    // Show a thank you message
    setTimeout(function() {
      alert('Thank you for reaching out! I will get back to you soon.');
    }, 100);
    // The form will be submitted to Formspree and the page will reload
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Add animations to sections when they become visible
  document.querySelectorAll('section').forEach(section => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.4 });
    observer.observe(section);
  });
  
  // Hover effects for section headers
  const headers = [
    document.querySelector('#about h1'),
    document.querySelector('#projects h2'),
    document.querySelector('#resume h2'),
    document.querySelector('#contact h2')
  ];
  headers.forEach(header => {
    if (header) {
      header.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.03)';
        this.style.color = '#00ccff';
      });
      header.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.color = '#ffffff';
      });
    }
  });
  
  // Hover effects for navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.1)';
      this.style.color = '#00ccff';
      this.style.textShadow = '0 0 10px rgba(0, 204, 255, 0.5)';
    });
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.color = '#ffffff';
      this.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.8)';
    });
  });