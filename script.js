
document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

window.addEventListener("scroll", () => {
    const trigger = 150;
    const bg = document.querySelector(".bg");
    if (window.scrollY > trigger) {
        bg.style.opacity = "0.4";
    } else {
        bg.style.opacity = "0";
    }
});

let ticking = false;
let offset = 0;
window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {

            const scroll = window.scrollY * 0.8;
            

            // 🌄 background lento + zoom dinamico
            const bg = document.querySelector(".bg");
            const y = (scroll - offset) * 0.2;
            const s = 0.8 + (scroll - offset) * 0.0005;

            bg.style.transform = `translateY(${y}px) scale(${s})`;
            if (scroll > 1200) {
                offset = 1200;
                bg.style.backgroundImage = "url('bg2.jpg')";
/*             } else if (scroll > 2500) {
                offset = 2500;
                bg.style.backgroundImage = "url('bg3.jpg')"; */
            }else {
                offset = 0;
                bg.style.backgroundImage = "url('bg1.jpg')";
            }


            // ✨ fade out testo hero
            const hero = document.querySelector(".hero-content");
            hero.style.opacity = 1 - scroll / 900;

            hero.style.transform =
                `translateY(${scroll * 0.8}px)`;

            ticking = false;
        });

        ticking = true;
    }
});