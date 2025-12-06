document.addEventListener('DOMContentLoaded', function() {
    // 動態導航菜單 - 滑鼠懸停觸發，無需 JavaScript 控制展開收起

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
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', function() {
        // Update active nav state and reveal effects
        // Update active navigation based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const navLink = document.querySelector(`.hero-nav a[href="#${sectionId}"]`);
                if (navLink) {
                    // 移除所有active類
                    document.querySelectorAll('.hero-nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    // 添加active類到當前連結
                    navLink.classList.add('active');
                }
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
    
    // Mobile menu toggle (已移除，因為導航欄已移至底部)
    
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
    
    // Check if on mobile device (已移除移動端菜單功能)
    const checkMobile = () => {
        // 底部導航欄在移動端自動適應
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

    // 媽媽語錄動態聊天列表 - 隨機位置
    const initMomQuotes = () => {
        const chatDisplay = document.getElementById('chatDisplay');
        const chatNextBtn = document.getElementById('chatNextBtn');
        const chatEnding = document.getElementById('chatEnding');
        
        if (!chatDisplay || !chatNextBtn) return;
        
        // 媽媽語錄
        const quotes = [
            '媽媽今天有點忙，你先自己玩。',
            '我在忙工作，你先等等好嗎？',
            '媽媽在煮飯，你先在旁邊玩。',
            '等一下，媽媽先把這個做完。',
            '你再等我五分鐘…真的五分鐘。',
            '媽媽不是不想陪你，只是今天真的好累。',
            '媽媽希望一直陪著你，但有時候真的力不從心。'
        ];
        
        let currentIndex = 0;
        const usedPositions = [];
        
        // 根據螢幕寬度設定位置
        const isMobile = window.innerWidth <= 768;
        
        // 預設位置區域（7個位置，完全不重疊）
        const positions = isMobile ? [
            { top: '0%', left: '2%' },       // 左上
            { top: '0%', left: '50%' },      // 右上
            { top: '18%', left: '2%' },      // 左中上
            { top: '18%', left: '50%' },     // 右中上
            { top: '36%', left: '2%' },      // 左中
            { top: '36%', left: '50%' },     // 右中
            { top: '54%', left: '25%' }      // 中下
        ] : [
            { top: '0%', left: '5%' },       // 左上
            { top: '0%', left: '52%' },      // 右上
            { top: '22%', left: '8%' },      // 左中上
            { top: '24%', left: '55%' },     // 右中上
            { top: '44%', left: '5%' },      // 左中下
            { top: '46%', left: '52%' },     // 右中下
            { top: '68%', left: '28%' }      // 中下
        ];
        
        // 創建語錄氣泡
        const createBubble = (text, index) => {
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble-new';
            bubble.innerHTML = `<p class="message">「${text}」</p>`;
            
            // 設置隨機位置
            const pos = positions[index % positions.length];
            bubble.style.top = pos.top;
            bubble.style.left = pos.left;
            
            return bubble;
        };
        
        // 顯示下一句語錄
        const showNextQuote = () => {
            if (currentIndex < quotes.length) {
                const bubble = createBubble(quotes[currentIndex], currentIndex);
                chatDisplay.appendChild(bubble);
                
                currentIndex++;
                
                // 檢查是否結束
                if (currentIndex >= quotes.length) {
                    // 隱藏按鈕，顯示收尾文字
                    chatNextBtn.style.display = 'none';
                    if (chatEnding) {
                        chatEnding.classList.add('show');
                    }
                }
            }
        };
        
        // 綁定按鈕事件
        chatNextBtn.addEventListener('click', showNextQuote);
    };
    
    // 初始化媽媽語錄
    initMomQuotes();

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

    // 環狀幻燈片功能
    const initPhotoAlbum = () => {
        const album = document.querySelector('.photo-album');
        if (!album) return;
        
        const container = album.querySelector('.album-container');
        const pages = Array.from(album.querySelectorAll('.album-page'));
        
        let currentIndex = 0;
        const totalPages = pages.length;
        
        // 計算相對位置（環狀）
        const getRelativeIndex = (index, current, total) => {
            let diff = index - current;
            // 處理環狀邏輯
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;
            return diff;
        };
        
        // 更新幻燈片位置
        const updateCarousel = (index) => {
            pages.forEach((page, i) => {
                page.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');
                
                const relPos = getRelativeIndex(i, index, totalPages);
                
                if (relPos === 0) {
                    page.classList.add('active');
                } else if (relPos === -1 || (relPos === totalPages - 1)) {
                    page.classList.add('prev');
                } else if (relPos === 1 || (relPos === -(totalPages - 1))) {
                    page.classList.add('next');
                } else if (relPos < 0) {
                    page.classList.add('hidden-left');
                } else {
                    page.classList.add('hidden-right');
                }
            });
            
            currentIndex = index;
        };
        
        // 下一張（環狀）
        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % totalPages;
            updateCarousel(nextIndex);
        };
        
        // 上一張（環狀）
        const prevSlide = () => {
            const prevIndex = (currentIndex - 1 + totalPages) % totalPages;
            updateCarousel(prevIndex);
        };
        
        // 點擊左右側圖片切換
        pages.forEach((page) => {
            page.addEventListener('click', () => {
                if (page.classList.contains('prev')) {
                    prevSlide();
                } else if (page.classList.contains('next')) {
                    nextSlide();
                }
            });
        });
        
        // 鼠標拖拽控制
        let isDragging = false;
        let startX = 0;
        let hasMoved = false;
        
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            hasMoved = false;
            container.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const diffX = e.clientX - startX;
            if (Math.abs(diffX) > 10) {
                hasMoved = true;
            }
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            container.style.cursor = 'grab';
            
            const diffX = e.clientX - startX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX < 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        // 設置拖拽游標
        container.style.cursor = 'grab';
        
        // 鍵盤導航
        document.addEventListener('keydown', (e) => {
            const albumRect = album.getBoundingClientRect();
            if (albumRect.top < window.innerHeight && albumRect.bottom > 0) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            }
        });
        
        // 觸控滑動支持
        let touchStartX = 0;
        
        album.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        album.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diffX = touchStartX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        // 自動播放
        let autoPlayInterval = null;
        
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, 4000);
        };
        
        const stopAutoPlay = () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        };
        
        // 滑鼠進入停止自動播放，離開恢復
        album.addEventListener('mouseenter', stopAutoPlay);
        album.addEventListener('mouseleave', startAutoPlay);
        
        // 開始自動播放
        startAutoPlay();
        
        // 初始化
        updateCarousel(0);
    };
    
    // 初始化環狀幻燈片
    initPhotoAlbum();

    // 問卷圖片點擊放大功能
    const initSurveyImageModal = () => {
        const chartImages = document.querySelectorAll('.survey-section .chart-item img');
        
        chartImages.forEach(img => {
            img.addEventListener('click', () => {
                // 創建模態框
                const modal = document.createElement('div');
                modal.className = 'image-modal active';
                modal.innerHTML = `
                    <div class="image-modal-content">
                        <button class="image-modal-close">&times;</button>
                        <img src="${img.src}" alt="${img.alt}">
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // 關閉模態框
                const closeModal = () => {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        if (document.body.contains(modal)) {
                            document.body.removeChild(modal);
                        }
                    }, 300);
                };
                
                modal.querySelector('.image-modal-close').addEventListener('click', closeModal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
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
            });
        });
    };
    
    // 初始化問卷圖片放大
    initSurveyImageModal();

    // 初始化完成
});

