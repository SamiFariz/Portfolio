// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.preloader').classList.add('hidden');
  }, 500);
});

// Sticky Navigation
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Section Animation on Scroll
const observeSection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate skill bars when skills section becomes visible
      if (entry.target.id === 'skills') {
        animateSkillBars();
      }
    }
  });
};

const sectionObserver = new IntersectionObserver(observeSection, {
  root: null,
  threshold: 0.15,
  rootMargin: '0px'
});

document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
});

// Animate Skill Bars
function animateSkillBars() {
  document.querySelectorAll('.skill-progress-bar').forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 300);
  });
}

// Skills Circle Animation
const skillsData = [
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' }
];

function createSkillsCircle() {
  const skillsCircle = document.querySelector('.skills-circle');
  
  // Clear any existing content
  skillsCircle.innerHTML = '';
  
  // Calculate positions in a circle
  const radius = 120; // Adjust based on the circle size
  const totalSkills = skillsData.length;
  
  skillsData.forEach((skill, index) => {
    // Calculate position on the circle
    const angle = (index / totalSkills) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    // Create skill logo element
    const skillLogo = document.createElement('div');
    skillLogo.className = 'skill-logo';
    skillLogo.style.transform = `translate(${x}px, ${y}px)`;
    skillLogo.style.opacity = '0';
    skillLogo.style.animationDelay = `${index * 0.1}s`;
    
    // Create image
    const img = document.createElement('img');
    img.src = skill.icon;
    img.alt = skill.name;
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = skill.name;
    tooltip.setAttribute('data-skill', skill.name);
    
    // Append elements
    skillLogo.appendChild(img);
    skillLogo.appendChild(tooltip);
    skillsCircle.appendChild(skillLogo);
    
    // Add click interaction
    skillLogo.addEventListener('click', () => {
      skillLogo.classList.add('active');
      setTimeout(() => {
        skillLogo.classList.remove('active');
      }, 600);
    });
    
    // Add hover events for better tooltip control
    skillLogo.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
      const tooltip = skillLogo.querySelector('.skill-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
      }
    });
    
    skillLogo.addEventListener('mouseleave', (e) => {
      e.stopPropagation();
      const tooltip = skillLogo.querySelector('.skill-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = 'translateX(-50%) translateY(0)';
      }
    });
    
    // Also add events to the image for better coverage
    img.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
      const tooltip = skillLogo.querySelector('.skill-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
      }
    });
    
    img.addEventListener('mouseleave', (e) => {
      e.stopPropagation();
      const tooltip = skillLogo.querySelector('.skill-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = 'translateX(-50%) translateY(0)';
      }
    });
    
    // Animate in with stagger
    setTimeout(() => {
      skillLogo.style.opacity = '1';
      skillLogo.style.transform = `translate(${x}px, ${y}px) scale(1)`;
    }, index * 100);
  });
  
  // Add rotation animation
  animateSkillsRotation();
}

function animateSkillsRotation() {
  const skillLogos = document.querySelectorAll('.skill-logo');
  const totalSkills = skillLogos.length;
  const radius = 120;
  
  let currentAngle = 0;
  let speed = 0.003; // Slower, more elegant rotation
  
  function animate() {
    currentAngle += speed;
    
    skillLogos.forEach((logo, index) => {
      const angle = currentAngle + (index / totalSkills) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      // Add subtle floating effect
      const floatY = Math.sin(currentAngle * 2 + index) * 3;
      
      logo.style.transform = `translate(${x}px, ${y + floatY}px)`;
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Add intersection observer for skills section
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillLogos = entry.target.querySelectorAll('.skill-logo');
      skillLogos.forEach((logo, index) => {
        setTimeout(() => {
          logo.style.opacity = '1';
        }, index * 150);
      });
    }
  });
}, {
  threshold: 0.3
});

// Observe skills section
document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('.skills-circle-container');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
});

// Initialize skills circle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createSkillsCircle();
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      setTimeout(() => {
        alert('Thank you for reaching out! I will get back to you soon.');
      }, 100);
    });
  }
  
  // Project card hover effects
  document.querySelectorAll('.project-card').forEach(card => {
    let touchStartX = 0;
    let touchEndX = 0;

    // Handle touch events
    card.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    // Handle click events
    card.addEventListener('click', (e) => {
      if (window.matchMedia('(hover: none)').matches) {
        card.classList.toggle('flipped');
      }
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        card.classList.toggle('flipped');
      }
    }

    // Handle hover for non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      card.addEventListener('mouseenter', () => {
        card.classList.add('flipped');
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('flipped');
      });
    }
  });
});

// Create a favicon if it doesn't exist
function createFavicon() {
  // Check if favicon exists
  fetch('assets/favicon.png')
    .then(response => {
      if (!response.ok) {
        // Create a canvas to draw the favicon
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, 64, 64);
        gradient.addColorStop(0, '#0066cc');
        gradient.addColorStop(1, '#00cc99');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        
        // Draw text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 36px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SF', 32, 32);
        
        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/png');
        
        // Create a link element for the favicon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = dataUrl;
        
        // Add to document head
        document.head.appendChild(link);
      }
    })
    .catch(error => {
      console.error('Error checking favicon:', error);
    });
}

// Call createFavicon on page load
window.addEventListener('load', createFavicon);
