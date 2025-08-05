document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 60px'; // Changed to retain horizontal padding
            header.style.backgroundColor = '#eac4af';
            header.style.borderBottom = '1px solid rgba(166, 128, 118, 0.2)';
        } else {
            header.style.padding = '20px 60px'; // Changed to retain horizontal padding
            header.style.backgroundColor = '#eac4af';
            header.style.borderBottom = 'none';
        }
        
        // Update active navigation based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`nav a[href="#${sectionId}"]`).classList.remove('active');
            }
        });
        
        // Scroll reveal animation
        revealOnScroll();
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                alert('請填寫所有必填欄位');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For this static site, we'll just show a success message
            alert('感謝您的訊息！我們會盡快回覆您。');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Mobile menu toggle
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        header.querySelector('.container').appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a navigation link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    };
    
    // Initialize scroll reveal
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Add reveal class to sections and elements
    const addRevealClasses = () => {
        // Add reveal class to section titles and content
        document.querySelectorAll('section h2').forEach(title => {
            title.classList.add('reveal');
        });
        
        // About section
        const aboutContent = document.querySelector('.about .content');
        if (aboutContent) {
            aboutContent.classList.add('reveal');
        }
        
        // Features section
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.classList.add('reveal');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Team section
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach((member, index) => {
            member.classList.add('reveal');
            member.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Contact section
        const contactContent = document.querySelector('.contact-content');
        if (contactContent) {
            contactContent.classList.add('reveal');
        }
    };
    
    // Check if on mobile device and create mobile menu if needed
    const checkMobile = () => {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        }
    };
    
    // Add dynamic background parallax effect
    const handleParallax = () => {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            
            // Apply parallax to hero section
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
            }
            
            // Apply parallax to features background
            const featuresSection = document.querySelector('.features::before');
            if (featuresSection) {
                featuresSection.style.backgroundPositionY = `${-scrollPosition * 0.2}px`;
            }
            
            // Apply parallax to contact background
            const contactSection = document.querySelector('.contact::before');
            if (contactSection) {
                contactSection.style.backgroundPositionY = `${-scrollPosition * 0.2}px`;
            }
        });
    };
    
    // Initialize functions
    addRevealClasses();
    checkMobile();
    handleParallax();
    revealOnScroll();
}); 