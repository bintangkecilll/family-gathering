// ===== AOS INIT =====
AOS.init({
    duration: 800,
    once: true,
    offset: 50
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('mainNavbar');
if (navbar) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    // Check on load
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== CLOSE NAVBAR ON LINK CLICK (MOBILE) =====
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navCollapse = document.getElementById('navbarNav');
navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        if (navCollapse && navCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
            if (bsCollapse) bsCollapse.hide();
        }
    });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - navHeight - 10;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== TOC TOGGLE =====
const tocHeader = document.querySelector('.toc-header');
if (tocHeader) {
    tocHeader.addEventListener('click', function() {
        this.classList.toggle('collapsed');
        const tocList = this.nextElementSibling;
        if (tocList) {
            tocList.style.display = tocList.style.display === 'none' ? 'block' : 'none';
        }
    });
}

// ===== AUTO GENERATE TOC =====
function generateTOC() {
    const tocList = document.getElementById('tocList');
    const articleContent = document.querySelector('.article-content');
    if (!tocList || !articleContent) return;

    const headings = articleContent.querySelectorAll('h2, h3');
    headings.forEach(function(heading, index) {
        const id = 'section-' + index;
        heading.id = id;

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = heading.textContent;
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 0;
            window.scrollTo({
                top: heading.offsetTop - navHeight - 15,
                behavior: 'smooth'
            });
        });

        if (heading.tagName === 'H3') {
            li.classList.add('toc-h3');
        }

        li.appendChild(a);
        tocList.appendChild(li);
    });
}
generateTOC();

// ===== FAQ TOGGLE =====
document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
        this.classList.toggle('active');
        const answer = this.nextElementSibling;
        if (answer) {
            answer.classList.toggle('open');
        }
    });
});

// ===== SHARE BUTTONS =====
function shareArticle(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    let shareUrl = '';

    switch(platform) {
        case 'facebook':
            shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
            break;
        case 'twitter':
            shareUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
            break;
        case 'whatsapp':
            shareUrl = 'https://wa.me/?text=' + title + '%20' + url;
            break;
        case 'linkedin':
            shareUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title;
            break;
        case 'copy':
            navigator.clipboard.writeText(window.location.href).then(function() {
                alert('Link berhasil disalin!');
            });
            return;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Attach share events
document.querySelectorAll('.share-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.dataset.platform;
        if (platform) shareArticle(platform);
    });
});

// ===== TESTIMONIAL AUTO SCROLL =====
const testimonialTrack = document.querySelector('.testimonial-track');
if (testimonialTrack) {
    let testimonialScrollInterval;
    let testimonialDirection = 1;
    
    function autoScrollTestimonials() {
        testimonialScrollInterval = setInterval(function() {
            testimonialTrack.scrollLeft += testimonialDirection * 2;
            if (testimonialTrack.scrollLeft >= testimonialTrack.scrollWidth - testimonialTrack.clientWidth) {
                testimonialDirection = -1;
            } else if (testimonialTrack.scrollLeft <= 0) {
                testimonialDirection = 1;
            }
        }, 30);
    }

    autoScrollTestimonials();

    testimonialTrack.addEventListener('mouseenter', function() {
        clearInterval(testimonialScrollInterval);
    });

    testimonialTrack.addEventListener('mouseleave', function() {
        autoScrollTestimonials();
    });
}
