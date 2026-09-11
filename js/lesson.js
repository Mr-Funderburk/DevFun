/**
 * Lesson Navigation & Sidebar Drawer
 * DevFun - Handles toggleable course lesson sidebar and drawer interactions
 */
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('lessonSidebar');
    const backdrop = document.getElementById('lessonSidebarBackdrop');
    const toggleBtns = document.querySelectorAll('#lessonSidebarToggle, #floatingLessonToggle');
    const closeBtn = document.getElementById('lessonSidebarClose');

    if (!sidebar) return;

    function openSidebar() {
        sidebar.classList.add('is-open');
        sidebar.setAttribute('aria-hidden', 'false');
        if (backdrop) backdrop.classList.add('is-open');
        toggleBtns.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
        if (closeBtn) closeBtn.focus();
    }

    function closeSidebar() {
        sidebar.classList.remove('is-open');
        sidebar.setAttribute('aria-hidden', 'true');
        if (backdrop) backdrop.classList.remove('is-open');
        toggleBtns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    }

    function toggleSidebar() {
        if (sidebar.classList.contains('is-open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeSidebar);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
            closeSidebar();
        }
    });
});
