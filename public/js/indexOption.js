document.addEventListener("DOMContentLoaded", () => {

    const filters = document.getElementById("filters");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (filters && nextBtn && prevBtn) {

        nextBtn.addEventListener("click", () => {
            filters.scrollBy({
                left: 60,
                behavior: "smooth"
            });
        });

        prevBtn.addEventListener("click", () => {
            filters.scrollBy({
                left: -60,
                behavior: "smooth"
            });
        });

    }

});