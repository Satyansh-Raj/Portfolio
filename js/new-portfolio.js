document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio page loaded');
    
    // Fade in elements with animation
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 100);
    });
    
    // Typing effect for h1 with typing-effect class
    const typingHeader = document.querySelector('h1.typing-effect');
    if (typingHeader) {
        const text = typingHeader.textContent;
        typingHeader.textContent = '';
        let i = 0;
        
        function typeText() {
            if (i < text.length) {
                typingHeader.textContent += text.charAt(i);
                i++;
                setTimeout(typeText, 100);
            } else {
                typingHeader.classList.add('typing-complete');
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeText, 500);
    }
    
    // Project hover effects - removed as it's now handled in CSS
    
    // Dropdown menu handling for mobile
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            dropdown.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Don't prevent default for dropdown toggle on desktop
            if (targetId === '#' && window.innerWidth >= 768) {
                return;
            }
            
            // Prevent default for mobile dropdown toggle or actual page links
            e.preventDefault();
            
            // If it's a link to a section, scroll to it
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile dropdown if open
                    document.querySelectorAll('.dropdown-menu.show-mobile').forEach(menu => {
                        menu.classList.remove('show-mobile');
                    });
                }
            }
        });
    });
    
    // Typewriter effect for the tagline
    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        
        type();
    }
    
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        
        setTimeout(() => {
            typeWriter(tagline, originalText, 50);
        }, 500);
    }
    
    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation example
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            
            if (!email.value || !message.value) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Submit form logic would go here
            console.log('Form submitted:', {
                email: email.value,
                message: message.value
            });
            
            // Reset form
            this.reset();
            alert('Thanks for your message! I\'ll get back to you soon.');
        });
    }
    
    // Add animation to sections when they enter viewport
    function checkVisibility() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= viewportHeight * 0.8 && rect.bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
}); 