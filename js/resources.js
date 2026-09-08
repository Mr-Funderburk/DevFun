/**
 * Resources Search & Course Filter
 * DevFun - Handles dynamic keyword searching and course filtering on resources.html
 */
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('resourceSearch');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const filterChips = document.querySelectorAll('.filter-chip');
    const resourceCards = document.querySelectorAll('.course-card[data-courses]');
    const resourceSections = document.querySelectorAll('.resource-section');
    const resourceCount = document.getElementById('resourceCount');
    const emptyState = document.getElementById('resourcesEmptyState');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');

    if (!resourceCards.length) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function applyFilters() {
        let visibleCount = 0;
        const query = searchQuery.trim().toLowerCase();

        resourceCards.forEach(card => {
            // Check course category filter
            const cardCourses = (card.getAttribute('data-courses') || '').split(/\s+/);
            const matchesFilter = (activeFilter === 'all') || cardCourses.includes(activeFilter);

            // Check text search query
            let matchesSearch = true;
            if (query) {
                const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('.card-content p')?.textContent.toLowerCase() || '';
                const tags = card.querySelector('.course-footer')?.textContent.toLowerCase() || '';
                matchesSearch = title.includes(query) || desc.includes(query) || tags.includes(query);
            }

            const isVisible = matchesFilter && matchesSearch;

            if (isVisible) {
                card.classList.remove('is-hidden');
                card.removeAttribute('aria-hidden');
                visibleCount++;
            } else {
                card.classList.add('is-hidden');
                card.setAttribute('aria-hidden', 'true');
            }
        });

        // Hide or show parent sections if all cards inside are hidden
        resourceSections.forEach(section => {
            const hasVisibleCards = section.querySelectorAll('.course-card:not(.is-hidden)').length > 0;
            section.classList.toggle('is-hidden', !hasVisibleCards);
        });

        // Update results counter
        if (resourceCount) {
            const total = resourceCards.length;
            if (visibleCount === total) {
                resourceCount.textContent = `Showing all ${total} resources`;
            } else if (visibleCount === 1) {
                resourceCount.textContent = `Showing 1 resource`;
            } else {
                resourceCount.textContent = `Showing ${visibleCount} of ${total} resources`;
            }
        }

        // Toggle empty state
        if (emptyState) {
            emptyState.hidden = (visibleCount > 0);
        }

        // Toggle clear search button visibility
        if (clearSearchBtn) {
            clearSearchBtn.hidden = (query.length === 0);
        }
    }

    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            applyFilters();
        });

        // Clear when user hits Escape inside input
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchInput.value) {
                searchInput.value = '';
                searchQuery = '';
                applyFilters();
            }
        });
    }

    // Clear search button handler
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
            }
            searchQuery = '';
            applyFilters();
        });
    }

    // Course filter chips handler
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeFilter = chip.getAttribute('data-filter') || 'all';
            applyFilters();
        });
    });

    // Reset all filters handler
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            searchQuery = '';
            activeFilter = 'all';

            filterChips.forEach(c => {
                c.classList.toggle('active', c.getAttribute('data-filter') === 'all');
            });

            applyFilters();
            if (searchInput) searchInput.focus();
        });
    }

    // Initial run
    applyFilters();
});

