/**
 * DevFun AP CSP Countdown Timers
 * Finds all elements with the '.countdown-timer' class and updates 
 * their inner .days, .hours, .minutes, and .seconds elements every second.
 */
document.addEventListener('DOMContentLoaded', () => {
    const timerElements = document.querySelectorAll('.countdown-timer');

    if (timerElements.length === 0) return;

    function padZero(num) {
        return String(num).padStart(2, '0');
    }

    function updateAllTimers() {
        const now = new Date().getTime();

        timerElements.forEach(timer => {
            const targetString = timer.getAttribute('data-target');
            if (!targetString) return;

            const targetTime = new Date(targetString).getTime();
            const timeRemaining = targetTime - now;

            // Handle passed deadline
            if (timeRemaining <= 0) {
                timer.innerHTML = '<span class="timer-complete">Deadline Passed</span>';
                return;
            }

            // Calculate time units
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            // Target child elements safely
            const daysEl = timer.querySelector('.days');
            const hoursEl = timer.querySelector('.hours');
            const minutesEl = timer.querySelector('.minutes');
            const secondsEl = timer.querySelector('.seconds');

            if (daysEl) daysEl.textContent = padZero(days);
            if (hoursEl) hoursEl.textContent = padZero(hours);
            if (minutesEl) minutesEl.textContent = padZero(minutes);
            if (secondsEl) secondsEl.textContent = padZero(seconds);
        });
    }

    // Run immediately on page load, then loop every second
    updateAllTimers();
    setInterval(updateAllTimers, 1000);
});