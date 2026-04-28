
document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});
window.addEventListener("scroll", function () {

    let scroll = window.scrollY;
    let intensity = Math.min(scroll / 300, 1);
    let opacity = 1 - (scroll / 200);

    document.querySelector("#svg1").style.filter =
        `drop-shadow(0 0 ${10 * intensity}px rgba(255,255,255,${intensity}))`;

    if(opacity < 0) opacity = 0;

    document.querySelector("#svg1").style.opacity = opacity;

});


