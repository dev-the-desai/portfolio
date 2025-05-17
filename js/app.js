// Combined app.js for Dev Desai's Portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initPlaceholderImages();
  initPageTransitions();
  initScrollAnimations();
  initHoverEffects();
  initHeaderScroll();
  initCircuitAnimation();
  handlePageExitAnimations();
});

// ========================
// PLACEHOLDER IMAGES
// ========================
function initPlaceholderImages() {
  // Array of colors for placeholder backgrounds
  const colors = [
    '#5D8CF7', '#6B74E8', '#8A64EB', '#A457DD', 
    '#FF7676', '#FF9A5A', '#FFCE56', '#7ED7C1'
  ];
  
  // Get all project image containers
  const projectImages = document.querySelectorAll('.project-image');
  
  // Apply random colors from the array to each project image
  projectImages.forEach((imageDiv, index) => {
    // Use modulo to cycle through colors if there are more projects than colors
    const colorIndex = index % colors.length;
    imageDiv.style.backgroundColor = colors[colorIndex];
    
    // Add placeholder text with project number
    const placeholderText = document.createElement('div');
    placeholderText.classList.add('placeholder-text');
    placeholderText.textContent = `Project ${index + 1}`;
    placeholderText.style.color = '#ffffff';
    placeholderText.style.textAlign = 'center';
    placeholderText.style.padding = '40px 0';
    placeholderText.style.fontWeight = 'bold';
    
    imageDiv.appendChild(placeholderText);
  });
  
  // If about image exists, add a placeholder there too
  const aboutImage = document.querySelector('.about-image');
  if (aboutImage) {
    aboutImage.style.backgroundColor = '#5D8CF7';
    
    const placeholderText = document.createElement('div');
    placeholderText.classList.add('placeholder-text');
    placeholderText.textContent = 'Your Profile Photo';
    placeholderText.style.color = '#ffffff';
    placeholderText.style.textAlign = 'center';
    placeholderText.style.padding = '100px 0';
    placeholderText.style.fontWeight = 'bold';
    
    aboutImage.appendChild(placeholderText);
  }
}

// ========================
// CIRCUIT ANIMATION
// ========================
function initCircuitAnimation() {
  const heroPattern = document.querySelector('.hero-pattern');
  if (!heroPattern) return;
  
  // Add mouse follow effect
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = (mouseX - 0.5) * 8; // Increased movement
    const moveY = (mouseY - 0.5) * 8;
    
    heroPattern.style.transform = `rotate(45deg) translate(${moveX}px, ${moveY}px)`;
  });
  
  // Create container for animated elements
  const circuitContainer = document.createElement('div');
  circuitContainer.classList.add('circuit-dots');
  heroPattern.appendChild(circuitContainer);
  
  // Available colors
  const colors = [1, 2, 3, 4, 5];
  
  // Create digital pulses on circuit traces with random colors
  for (let i = 1; i <= 6; i++) {
    // First instance
    const dot = document.createElement('div');
    const colorClass = `color-${colors[Math.floor(Math.random() * colors.length)]}`;
    dot.classList.add('circuit-dot', `path-${i}`, colorClass);
    circuitContainer.appendChild(dot);
    
    // Second instance with delay and different color
    const dot2 = document.createElement('div');
    const colorClass2 = `color-${colors[Math.floor(Math.random() * colors.length)]}`;
    dot2.classList.add('circuit-dot', `path-${i}`, colorClass2);
    dot2.style.animationDelay = '1.2s';
    circuitContainer.appendChild(dot2);
    
    // Third instance with longer delay and different color
    const dot3 = document.createElement('div');
    const colorClass3 = `color-${colors[Math.floor(Math.random() * colors.length)]}`;
    dot3.classList.add('circuit-dot', `path-${i}`, colorClass3);
    dot3.style.animationDelay = '2.4s';
    circuitContainer.appendChild(dot3);
  }
  
  // Create pulsing nodes at intersections
  for (let i = 0; i < 9; i++) {
    const node = document.createElement('div');
    node.classList.add('node-pulse');
    circuitContainer.appendChild(node);
  }
  
  // Add data burst effects
  for (let i = 0; i < 5; i++) {
    const burst = document.createElement('div');
    burst.classList.add('data-burst');
    circuitContainer.appendChild(burst);
  }
  
  // Add click interaction with pulse and burst for the entire hero section
  const heroSection = document.querySelector('.hero');
  heroSection.addEventListener('click', function(e) {
    // Don't trigger effect if clicking on buttons, links or other interactive elements
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input') || e.target.closest('label') || e.target.closest('form')) {
      return;
    }
    
    // Get position relative to the pattern (even when clicking outside it)
    const heroRect = heroSection.getBoundingClientRect();
    const patternRect = heroPattern.getBoundingClientRect();
    
    // Calculate relative position within the hero section
    const heroX = e.clientX - heroRect.left;
    const heroY = e.clientY - heroRect.top;
    
    // Map the hero position to the pattern area
    let patternX, patternY;
    
    // If clicked within the pattern's bounds, use direct mapping
    if (e.clientX >= patternRect.left && e.clientX <= patternRect.right && 
        e.clientY >= patternRect.top && e.clientY <= patternRect.bottom) {
      patternX = e.clientX - patternRect.left;
      patternY = e.clientY - patternRect.top;
    } else {
      // If clicked outside the pattern, map to a corresponding position within the pattern
      patternX = patternRect.width * (0.15 + (heroX / heroRect.width) * 0.7);
      patternY = patternRect.height * (0.1 + (heroY / heroRect.height) * 0.8);
    }
    
    // Convert to percentage within the pattern
    const clickX = (patternX / patternRect.width) * 100;
    const clickY = (patternY / patternRect.height) * 100;
    
    // Ensure click position is within bounds (0-100%)
    const boundedX = Math.max(0, Math.min(100, clickX));
    const boundedY = Math.max(0, Math.min(100, clickY));
    
    // Random color for the burst
    const colorIndex = Math.floor(Math.random() * 5) + 1;
    
    // Create a burst effect
    const burst = document.createElement('div');
    burst.classList.add('click-burst', `color-${colorIndex}`);
    burst.style.left = boundedX + '%';
    burst.style.top = boundedY + '%';
    circuitContainer.appendChild(burst);
    
    // Create a pulsing effect that stays at the click location
    const pulse = document.createElement('div');
    pulse.classList.add('pulse-at-click', `color-${colorIndex}`);
    pulse.style.left = boundedX + '%';
    pulse.style.top = boundedY + '%';
    circuitContainer.appendChild(pulse);
    
    // Create 3-5 additional bursts with random offsets for more visual impact
    const burstCount = 3 + Math.floor(Math.random() * 3); // 3 to 5 bursts
    
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        // Random position offset from click point
        const offsetX = (Math.random() * 10) - 5; // -5 to +5 percent offset
        const offsetY = (Math.random() * 10) - 5;
        
        const randColorIndex = Math.floor(Math.random() * 5) + 1;
        
        // Create a random colored burst
        const extraBurst = document.createElement('div');
        extraBurst.classList.add('click-burst', `color-${randColorIndex}`);
        extraBurst.style.left = (boundedX + offsetX) + '%';
        extraBurst.style.top = (boundedY + offsetY) + '%';
        circuitContainer.appendChild(extraBurst);
        
        // Remove the extra burst after animation
        setTimeout(() => { extraBurst.remove(); }, 1000);
      }, i * 100); // Stagger the bursts by 100ms
    }
    
    // Remove the elements after animations complete
    setTimeout(() => {
      burst.remove();
    }, 1000);
    
    setTimeout(() => {
      pulse.remove();
    }, 2000);
  });
  
  // Create random colored bursts periodically for continuous excitement
  setInterval(() => {
    // Only create random bursts when the user isn't interacting
    if (document.querySelectorAll('.click-burst').length < 2) {
      const randX = Math.random() * 100;
      const randY = Math.random() * 100;
      const randColor = Math.floor(Math.random() * 5) + 1;
      
      const randomBurst = document.createElement('div');
      randomBurst.classList.add('click-burst', `color-${randColor}`);
      randomBurst.style.left = randX + '%';
      randomBurst.style.top = randY + '%';
      circuitContainer.appendChild(randomBurst);
      
      setTimeout(() => {
        randomBurst.remove();
      }, 1000);
    }
  }, 3000); // Create a random burst every 3 seconds
}

// ========================
// PAGE TRANSITIONS
// ========================
function initPageTransitions() {
  // Create page overlay for transitions
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);
  
  // Hide overlay on load
  setTimeout(() => {
    overlay.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.add('animate-in');
    }
    
    // Animate project cards with staggered delay
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, 300 + (index * 100));
    });
  }, 100);
  
  // Internal page navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Smooth scroll
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================
// SCROLL ANIMATIONS
// ========================
function initScrollAnimations() {
  // Create IntersectionObserver for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);
  
  // Observe section headings
  document.querySelectorAll('.section-heading').forEach(heading => {
    heading.classList.add('animate-on-scroll');
    observer.observe(heading);
  });
  
  // Observe content paragraphs
  document.querySelectorAll('.content-area p').forEach(paragraph => {
    paragraph.classList.add('animate-on-scroll');
    observer.observe(paragraph);
  });
  
  // Observe skill categories
  document.querySelectorAll('.skills-grid > div').forEach((skill, index) => {
    skill.classList.add('animate-on-scroll');
    skill.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(skill);
  });
}

// ========================
// HOVER EFFECTS
// ========================
function initHoverEffects() {
  // Project card hover effects
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
  
  // Button hover effects
  document.querySelectorAll('.button, .button-pill').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    button.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
}

// ========================
// HEADER SCROLL EFFECT
// ========================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  if (header) {
    // Check initial scroll position
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// ========================
// PAGE EXIT ANIMATIONS
// ========================
function handlePageExitAnimations() {
  // Find all links that don't start with '#' and aren't empty
  const externalLinks = document.querySelectorAll('a:not([href^="#"]):not([href=""])');
  
  externalLinks.forEach(link => {
    // Skip links that open in new tabs
    if (link.getAttribute('target') === '_blank') return;
    
    // Add click handler for exit animation
    link.addEventListener('click', function(e) {
      // Only for links to our own pages (not external websites)
      const href = this.getAttribute('href');
      if (href && !href.includes('://')) {
        e.preventDefault();
        
        // Create or show exit overlay
        const overlay = document.querySelector('.page-transition-overlay') || 
                       createExitOverlay();
        
        // Animate overlay
        overlay.classList.remove('loaded');
        
        // Navigate after animation
        setTimeout(() => {
          window.location.href = href;
        }, 600);
      }
    });
  });
}

function createExitOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  overlay.classList.add('loaded'); // Start hidden
  document.body.appendChild(overlay);
  return overlay;
}