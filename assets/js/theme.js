/**
 * Theme Toggle and Site Interactions
 * Handles dark/light mode switching, mobile navigation, and skills filtering
 */

(function() {
  'use strict';

  // Theme Management
  const ThemeManager = {
    init() {
      this.themeToggle = document.querySelector('.theme-toggle');
      this.htmlElement = document.documentElement;
      this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
      
      this.setTheme(this.currentTheme);
      this.bindEvents();
    },

    getStoredTheme() {
      return localStorage.getItem('theme');
    },

    getPreferredTheme() {
      const siteDefault = this.htmlElement.getAttribute('data-theme') || 'dark';
      if (this.getStoredTheme()) {
        return this.getStoredTheme();
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : siteDefault;
    },

    setTheme(theme) {
      this.htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.updateThemeToggle(theme);
      this.updateMetaThemeColor(theme);
    },

    updateThemeToggle(theme) {
      if (this.themeToggle) {
        this.themeToggle.setAttribute('aria-label', 
          theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
      }
    },

    updateMetaThemeColor(theme) {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#0d1117' : '#ffffff');
      }
    },

    toggleTheme() {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.currentTheme = newTheme;
      this.setTheme(newTheme);
    },

    bindEvents() {
      if (this.themeToggle) {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
      }

      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  };

  // Mobile Navigation
  const MobileNav = {
    init() {
      this.toggle = document.querySelector('.mobile-menu-toggle');
      this.menu = document.querySelector('.navbar-menu');
      this.navLinks = document.querySelectorAll('.nav-link');
      
      this.bindEvents();
    },

    bindEvents() {
      if (this.toggle && this.menu) {
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
          link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
          if (!this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
            this.closeMenu();
          }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            this.closeMenu();
          }
        });
      }
    },

    toggleMenu() {
      const isExpanded = this.toggle.getAttribute('aria-expanded') === 'true';
      this.toggle.setAttribute('aria-expanded', !isExpanded);
      this.menu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    },

    closeMenu() {
      this.toggle.setAttribute('aria-expanded', 'false');
      this.menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Skills Filter
  const SkillsFilter = {
    init() {
      this.filterButtons = document.querySelectorAll('.filter-btn');
      this.skillCategories = document.querySelectorAll('.skill-category');
      
      if (this.filterButtons.length > 0) {
        this.bindEvents();
      }
    },

    bindEvents() {
      this.filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const filter = e.target.getAttribute('data-filter');
          this.filterSkills(filter);
          this.updateActiveButton(e.target);
        });
      });
    },

    filterSkills(filter) {
      this.skillCategories.forEach(category => {
        const categoryName = category.getAttribute('data-category');
        
        if (filter === 'all' || categoryName === filter) {
          category.style.display = 'block';
          // Animate in
          category.style.opacity = '0';
          category.style.transform = 'translateY(20px)';
          
          requestAnimationFrame(() => {
            category.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
          });
        } else {
          category.style.opacity = '0';
          category.style.transform = 'translateY(-20px)';
          
          setTimeout(() => {
            category.style.display = 'none';
          }, 300);
        }
      });
    },

    updateActiveButton(activeButton) {
      this.filterButtons.forEach(button => {
        button.classList.remove('active');
      });
      activeButton.classList.add('active');
    }
  };

  // Smooth Scrolling for Anchor Links
  const SmoothScroll = {
    init() {
      // Only apply to anchor links that start with #
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      
      anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          const target = document.querySelector(href);
          
          if (target) {
            e.preventDefault();
            
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            target.scrollIntoView({
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
              block: 'start'
            });
            
            // Update URL without triggering scroll
            if (history.pushState) {
              history.pushState(null, null, href);
            }
            
            // Focus the target for accessibility
            target.focus({ preventScroll: true });
          }
        });
      });
    }
  };

  // Contact Form Enhancement
  const ContactForm = {
    init() {
      this.form = document.querySelector('.contact-form');
      this.successMessage = document.querySelector('.form-success');
      this.errorMessage = document.querySelector('.form-error');
      
      if (this.form) {
        this.bindEvents();
      }
    },

    bindEvents() {
      this.form.addEventListener('submit', (e) => {
        this.handleSubmit(e);
      });
    },

    async handleSubmit(e) {
      e.preventDefault();
      
      const formData = new FormData(this.form);
      const submitButton = this.form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Show loading state
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      try {
        const response = await fetch(this.form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          this.showMessage(this.successMessage);
          this.form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        this.showMessage(this.errorMessage);
      } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    },

    showMessage(messageElement) {
      if (messageElement) {
        messageElement.style.display = 'block';
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
          messageElement.style.display = 'none';
        }, 5000);
      }
    }
  };

  // Intersection Observer for Animations
  const AnimationObserver = {
    init() {
      // Only animate if user hasn't requested reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe sections and cards
      const elementsToAnimate = document.querySelectorAll('.section, .project-card, .timeline-item');
      elementsToAnimate.forEach(el => {
        this.observer.observe(el);
      });
    }
  };

  // Keyboard Navigation Enhancement
  const KeyboardNav = {
    init() {
      this.bindEvents();
    },

    bindEvents() {
      document.addEventListener('keydown', (e) => {
        // Skip to main content with Alt+M
        if (e.altKey && e.key === 'm') {
          e.preventDefault();
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  };

  // Performance: Lazy load images
  const LazyImages = {
    init() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
      }
    }
  };

  // Initialize everything when DOM is ready
  function init() {
    ThemeManager.init();
    MobileNav.init();
    SkillsFilter.init();
    SmoothScroll.init();
    ContactForm.init();
    AnimationObserver.init();
    KeyboardNav.init();
    LazyImages.init();
  }

  // DOM ready check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .section, .project-card, .timeline-item {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .section, .project-card, .timeline-item {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `;
  document.head.appendChild(style);

})();
