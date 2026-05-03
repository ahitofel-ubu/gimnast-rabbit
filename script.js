
document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});


/* const tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);
tl.from("header img", {
  y: -50,
  opacity: 0,
  duration: 1
})
  .from(".title", {
    y: 50,
    opacity: 0,
    duration: 1
  }, "-=0.5")
  .from(".hero-content h1", {
    y: 50,
    opacity: 0,
    duration: 1
  }, "-=0.5")
  .from(".hero-content h3, .hero-content p", {
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8
  });
 */

gsap.to("#navbar", {
  scrollTrigger: {
    trigger: "body",
    start: "top -100",
    toggleActions: "play none none reverse"
  },
  scale: 0.95,
  duration: 0.3
});

gsap.to(".bg", {
  scrollTrigger: {
    trigger: "body",
    start: "top -100",
    toggleActions: "play none none reverse"
  },
  opacity: 0.1,
  duration: 1
});

gsap.to(".bg", {
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 3
  },
  y: -500,
  scale: 1.5,
  duration: 1
});
gsap.to(".title", {
  color: "#bb1e10",
  duration: 2.5,
  repeat: -1,
  yoyo: true,
  ease: "power3.in",
});
gsap.to(".title", {
  height: "200px",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "400px top",
    scrub: 1
  },
  y: 100,

  duration: 0.5
});
