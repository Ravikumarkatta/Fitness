// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if the href is just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                
                // Scroll to the element with offset
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Initialize Testimonial Carousel
    $('.testimonial-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });
    
    // Form Validation for Newsletter (if added)
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const emailValue = emailInput.value.trim();
            
            if (!isValidEmail(emailValue)) {
                // Show error message
                showFormError(emailInput, 'Please enter a valid email address');
            } else {
                // Success - Would normally submit to server
                this.reset();
                alert('Thank you for subscribing!');
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form error helper function
    function showFormError(inputElement, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        
        // Remove any existing error message
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message after the input
        inputElement.parentElement.appendChild(errorElement);
        
        // Highlight input
        inputElement.classList.add('error');
        
        // Remove error after 3 seconds
        setTimeout(() => {
            errorElement.remove();
            inputElement.classList.remove('error');
        }, 3000);
    }
    
    // Feature card hover effect 
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // CTA button hover effect
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'transparent';
            this.style.color = '#FF6347';
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(255, 99, 71, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#FF6347';
            this.style.color = '#ffffff';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Counter animations for stats (if added)
    function animateCounters() {
        const counterElements = document.querySelectorAll('.counter');
        
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const stepTime = 50; // update every 50ms
            const totalSteps = duration / stepTime;
            const stepValue = target / totalSteps;
            let current = 0;
            
            const updateCounter = setInterval(() => {
                current += stepValue;
                counter.innerText = Math.floor(current);
                
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(updateCounter);
                }
            }, stepTime);
        });
    }
    
    // Check if elements are in viewport for counter animation
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initialize counters when in viewport
    const countersSection = document.querySelector('.stats');
    if (countersSection) {
        window.addEventListener('scroll', function() {
            if (isInViewport(countersSection)) {
                animateCounters();
                // Remove event listener after animation starts
                this.removeEventListener('scroll', arguments.callee);
            }
        });
    }
});
