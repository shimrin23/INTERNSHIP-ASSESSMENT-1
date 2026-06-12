document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navigationMenu = document.getElementById('navigation-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle Menu
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navigationMenu.classList.toggle('active');
    
    // Toggle aria state
    const expanded = mobileMenuBtn.classList.contains('active');
    mobileMenuBtn.setAttribute('aria-expanded', expanded);
  });

  // Close Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navigationMenu.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', false);
    });
  });


  /* ==========================================================================
     SCROLL SPY & ACTIVE NAV LINKS
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  
  function scrollSpy() {
    let currentSectionId = 'home';
    const scrollPosition = window.scrollY + 100; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Initial call


  /* ==========================================================================
     VINTAGE TV SLIDESHOW LOGIC (How It Works)
     ========================================================================== */
  const slides = document.querySelectorAll('.tv-slide');
  const dots = document.querySelectorAll('.tv-dot');
  const prevBtn = document.getElementById('tv-prev-btn');
  const nextBtn = document.getElementById('tv-next-btn');
  let currentSlideIndex = 0; // 0-indexed corresponding to slides 1-4

  function showSlide(index) {
    // Wrap around bounds
    if (index >= slides.length) {
      currentSlideIndex = 0;
    } else if (index < 0) {
      currentSlideIndex = slides.length - 1;
    } else {
      currentSlideIndex = index;
    }

    // Toggle active slide class
    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Toggle active dot class
    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Arrow controls
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlideIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      showSlide(currentSlideIndex + 1);
    });
  }

  // Dot/Number controls
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
    });
  });


  /* ==========================================================================
     FAQ ACCORDION
     ========================================================================== */
  const faqQuestions = document.querySelectorAll('.faq-question');

  // Initialize active FAQ item height on load
  const activeFaq = document.querySelector('.faq-item.active');
  if (activeFaq) {
    const activeAnswer = activeFaq.querySelector('.faq-answer');
    if (activeAnswer) {
      // Set initial height after DOM has fully rendered
      setTimeout(() => {
        activeAnswer.style.maxHeight = activeAnswer.scrollHeight + 'px';
      }, 50);
    }
  }

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const faqAnswer = faqItem.querySelector('.faq-answer');
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        item.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        // Set dynamic height for transition
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      }
    });
  });



});
