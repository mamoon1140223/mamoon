document.addEventListener('DOMContentLoaded', function() {
    // Logo click to scroll to top
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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
        // Keep header size static; only update active nav state and reveal effects
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
    
    // Add dynamic background parallax effect (optimized with rAF and disabled on mobile/reduced motion)
    const handleParallax = () => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth <= 768;
        if (prefersReduced || isMobile) return; // skip on mobile/low-motion

        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        let latestY = 0;
        let ticking = false;

        const update = () => {
            heroSection.style.backgroundPosition = `center ${latestY * 0.4}px`;
            ticking = false;
        };

        const onScroll = () => {
            latestY = window.pageYOffset || document.documentElement.scrollTop;
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    };
    
    // Initialize functions
    addRevealClasses();
    checkMobile();
    handleParallax();
    revealOnScroll();

    // 動態標題效果
    const dynamicTitle = document.querySelector('.dynamic-title');
    if (dynamicTitle) {
        const titleLines = dynamicTitle.querySelectorAll('.title-line');
        
        // 滾動到標題時觸發動畫
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    titleLines.forEach((line, index) => {
                        setTimeout(() => {
                            line.style.animationPlayState = 'running';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(dynamicTitle);
    }

    // 團隊成員卡片動畫
    const teamMemberCards = document.querySelectorAll('.team-member-card');
    if (teamMemberCards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.3 });

        teamMemberCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease';
            cardObserver.observe(card);
        });
    }

    // 時間軸動畫
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
            item.style.transition = 'all 0.6s ease';
            timelineObserver.observe(item);
        });
    }

    // 照片網格動畫
    const photoItems = document.querySelectorAll('.photo-item');
    if (photoItems.length > 0) {
        const photoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });

        photoItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            item.style.transition = 'all 0.5s ease';
            photoObserver.observe(item);
        });
    }

    // 為團隊日常卡片添加特殊互動效果
    const teamMemberCards2 = document.querySelectorAll('.team-member');
    teamMemberCards2.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // 添加波紋效果
            card.style.transform = 'scale(1.05)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // 簡單圖片展示功能
    const initSimpleGallery = () => {
        const gallery = document.querySelector('.simple-gallery');
        const image = document.getElementById('galleryImage');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (!gallery || !image) return;
        
        // 圖片陣列
        const images = [
            'images/IMG_1230.JPG',
            'images/IMG_8136.jpg',
            'images/IMG_1233.JPG',
            'images/IMG_9489.JPG',
            'images/IMG_8747.jpg',
            'images/IMG_9466.jpg'
        ];
        
        let currentIndex = 0;
        
        // 更新圖片
        const updateImage = (index) => {
            image.src = images[index];
            currentIndex = index;
        };
        
        // 下一張圖片
        const nextImage = () => {
            const nextIndex = (currentIndex + 1) % images.length;
            updateImage(nextIndex);
        };
        
        // 上一張圖片
        const prevImage = () => {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage(prevIndex);
        };
        
        // 綁定按鈕事件
        if (nextBtn) {
            nextBtn.addEventListener('click', nextImage);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevImage);
        }
        
        // 鍵盤導航
        document.addEventListener('keydown', (e) => {
            if (gallery.getBoundingClientRect().top < window.innerHeight && 
                gallery.getBoundingClientRect().bottom > 0) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevImage();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextImage();
                }
            }
        });
        
        // 觸控滑動支持
        let startX = 0;
        let endX = 0;
        
        gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        gallery.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextImage();
                } else {
                    prevImage();
                }
            }
        });
        
        // 點擊圖片放大
        image.addEventListener('click', () => {
            showImageModal(image.src, '團隊日常');
        });
    };
    
    // 圖片模態框功能
    const showImageModal = (src, alt) => {
        // 創建模態框
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img src="${src}" alt="${alt}">
                    <div class="modal-caption">${alt}</div>
                </div>
            </div>
        `;
        
        // 添加模態框樣式
        const style = document.createElement('style');
        style.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            
            .modal-content img {
                width: 100%;
                height: auto;
                display: block;
            }
            
            .modal-close {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 30px;
                color: white;
                cursor: pointer;
                z-index: 10001;
                background: rgba(0, 0, 0, 0.5);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(0, 0, 0, 0.8);
            }
            
            .modal-caption {
                padding: 15px;
                background: white;
                color: #333;
                text-align: center;
                font-weight: 500;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // 關閉模態框功能
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                closeModal();
            }
        });
        
        // ESC鍵關閉
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
        
        // 添加淡出動畫
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
    };
    
    // 初始化簡單圖片展示
    initSimpleGallery();

    // 初始化完成
});

