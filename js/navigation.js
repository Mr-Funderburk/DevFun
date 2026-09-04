/**
 * Navigation Module
 * Handles mobile hamburger toggling and responsive course accordion menus.
 */
function initNavigation() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const coursesBtn = document.getElementById('courses-btn');
    const coursesDropdown = document.getElementById('courses-dropdown');

    if (!mobileToggle || !navMenu || !coursesBtn || !coursesDropdown) return;

    // Toggle Mobile Drawer
    mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('mobile-open');
        mobileToggle.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Toggle Accordion on Mobile Click
    coursesBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 820) {
            e.preventDefault();
            const isAccordionOpen = coursesDropdown.classList.toggle('accordion-open');
            coursesBtn.classList.toggle('accordion-active');
            coursesBtn.setAttribute('aria-expanded', isAccordionOpen);
        }
    });

    // Reset Mobile Classes on Screen Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 820) {
            navMenu.classList.remove('mobile-open');
            mobileToggle.classList.remove('active');
            coursesDropdown.classList.remove('accordion-open');
            coursesBtn.classList.remove('accordion-active');
            document.body.style.overflow = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', initNavigation);