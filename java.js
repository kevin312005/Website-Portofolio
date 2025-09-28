// Portfolio Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initSmoothScrolling();
    initTypingEffect();
    initParallax();
    initThemeToggle();
    
    // CV Button Animation (optional JS for click effect)
    var cvBtn = document.querySelector('.cv-btn-animated');
    if (cvBtn) {
        cvBtn.addEventListener('mousedown', function() {
            cvBtn.style.transform = 'scale(0.96)';
        });
        cvBtn.addEventListener('mouseup', function() {
            cvBtn.style.transform = 'scale(1.08)';
        });
        cvBtn.addEventListener('mouseleave', function() {
            cvBtn.style.transform = '';
        });
    }
});

// Navigation Functions
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat, .profile-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Skill Bars Animation
function initSkillBars() {
    console.log('🚀 Starting universal skill bars...');
    
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) {
        console.log('❌ No .skill-progress found');
        return;
    }
    
    console.log(`✅ Found ${skillBars.length} skill bars`);
    
    // Array persentase - sesuaikan dengan jumlah skill Anda
    const percentages = [
        '92%', '88%', '85%', '80%', // Kategori 1 (4 skills)
        '90%', '85%', '88%', '82%', // Kategori 2 (4 skills)  
        '95%', '87%', '90%', '83%', // Kategori 3 (4 skills)
        '75%', '70%', '85%', '90%'  // Tambahan jika ada lebih
    ];
    
    skillBars.forEach((progressBar, index) => {
        const percentage = progressBar.getAttribute('data-width') || percentages[index] || '75%';
        const skillBar = progressBar.parentElement;
        const percentSpan = skillBar.querySelector('.skill-percent');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1.5s ease';
                        progressBar.style.width = percentage;
                        progressBar.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';

                        // Animasi angka persentase
                        let current = 0;
                        const target = parseInt(percentage);
                        percentSpan.textContent = '0%';
                        const interval = setInterval(() => {
                            if (current < target) {
                                current += 1;
                                percentSpan.textContent = current + '%';
                            } else {
                                percentSpan.textContent = percentage;
                                clearInterval(interval);
                            }
                        }, 15);
                    }, index * 150);
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(skillBar);
    });
}
// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Sending message...', 'info');
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 1500);
    });
    
    // Contact form Gmail & WhatsApp integration
    if (document.getElementById('send-gmail')) {
      document.getElementById('send-gmail').onclick = function() {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;
        var mailto = `mailto:benedictus.rhodando@binus.ac.id?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nMessage: ' + message)}`;
        window.open(mailto, '_blank');
      };
    }
    if (document.getElementById('send-whatsapp')) {
      document.getElementById('send-whatsapp').onclick = function() {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;
        var text = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
        var whatsapp = `https://wa.me/6285711598953?text=${text}`;
        window.open(whatsapp, '_blank');
      };
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.hero-title');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect when hero section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 1000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Hover effect
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
    });
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 20);
    });
}

// Initialize counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Cursor Trail Effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transform: scale(${1 - i / trailLength});
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            dot.style.left = trailX - 2 + 'px';
            dot.style.top = trailY - 2 + 'px';
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Initialize cursor trail on desktop only
if (window.innerWidth > 768) {
    initCursorTrail();
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Add CSS for dark theme
const darkThemeStyles = `
    .dark-theme {
        --text-primary: #f8fafc;
        --text-secondary: #cbd5e1;
        --bg-primary: #0f172a;
        --bg-secondary: #1e293b;
        --bg-card: #334155;
        --border-color: #475569;
    }
    
    .dark-theme .navbar {
        background: rgba(15, 23, 42, 0.95);
    }
    
    .dark-theme .navbar.scrolled {
        background: rgba(15, 23, 42, 0.98);
    }
    
    .dark-theme .hero {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    }
`;

// Inject dark theme styles
const styleSheet = document.createElement('style');
styleSheet.textContent = darkThemeStyles;
document.head.appendChild(styleSheet);