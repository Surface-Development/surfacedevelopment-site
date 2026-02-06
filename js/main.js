/* Surface Development — main.js */

(function () {
    'use strict';

    /* ── Scroll reveal (IntersectionObserver) ────────────────── */
    const fadeEls = document.querySelectorAll('.fade-in');

    if (fadeEls.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
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

        fadeEls.forEach(function (el) {
            observer.observe(el);
        });
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

    /* ── Active nav link ─────────────────────────────────────── */
    var currentPath = window.location.pathname;

    document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPath || (href === '/' && currentPath === '/index.html')) {
            link.classList.add('active');
        }
    });
})();
