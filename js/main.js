/* Surface Development — main.js */

(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Scroll reveal (IntersectionObserver) ────────────────── */
    var revealSelectors = '.fade-in, .reveal-left, .reveal-right, .reveal-scale';
    var revealEls = document.querySelectorAll(revealSelectors);

    if (revealEls.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        revealEls.forEach(function (el) {
            observer.observe(el);
        });
    } else if (prefersReducedMotion) {
        revealEls.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* ── Stagger child cards when grid container becomes visible ─ */
    var staggerGrids = document.querySelectorAll('.capabilities-grid, .values-grid, .features-grid, .products-grid');

    if (staggerGrids.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
        var gridObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var cards = entry.target.querySelectorAll('.card, .product-card');
                        cards.forEach(function (card, index) {
                            card.style.transitionDelay = (index * 100) + 'ms';
                        });
                        gridObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
        );

        staggerGrids.forEach(function (grid) {
            gridObserver.observe(grid);
        });
    }

    /* ── Scroll progress bar ─────────────────────────────────── */
    var progressBar = document.querySelector('.scroll-progress');

    if (progressBar && !prefersReducedMotion) {
        function updateProgress() {
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    /* ── Sticky nav scroll state ─────────────────────────────── */
    var nav = document.querySelector('.nav');

    if (nav) {
        var scrollThreshold = 20;

        function onScroll() {
            if (window.scrollY > scrollThreshold) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ── Mobile menu toggle ──────────────────────────────────── */
    var toggle = document.querySelector('.nav-toggle');
    var overlay = document.querySelector('.nav-overlay');

    if (toggle && overlay) {
        toggle.addEventListener('click', function () {
            var isOpen = toggle.classList.toggle('open');
            overlay.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        overlay.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                toggle.classList.remove('open');
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ── Copyright year ─────────────────────────────────────── */
    document.querySelectorAll('.copyright-year').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    /* ── Active nav link ─────────────────────────────────────── */
    var currentPath = window.location.pathname;

    document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPath || (href === '/' && currentPath === '/index.html')) {
            link.classList.add('active');
        }
    });
})();
