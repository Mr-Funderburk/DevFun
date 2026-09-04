document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById("copyrightYear");
    if (year) { year.textContent = new Date().getFullYear(); }

    console.log('DevFun site initialized successfully.');
});