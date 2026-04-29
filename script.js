
document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});


const { gsap, imagesLoaded } = window;

/* =========================
   ELEMENTI
========================= */
const buttons = {
  prev: document.querySelector(".btn--left"),
  next: document.querySelector(".btn--right"),
};

const cardsWrapper = document.querySelector(".cards__wrapper");
const bgWrapper = document.querySelector(".app__bg");
const infoWrapper = document.querySelector(".info__wrapper");

let isAnimating = false;
let autoplay;

/* =========================
   CARD REFERENCES
========================= */
function getCards() {
  return {
    current: cardsWrapper.querySelector(".current--card"),
    previous: cardsWrapper.querySelector(".previous--card"),
    next: cardsWrapper.querySelector(".next--card"),
  };
}

function getImages() {
  return {
    current: bgWrapper.querySelector(".current--image"),
    previous: bgWrapper.querySelector(".previous--image"),
    next: bgWrapper.querySelector(".next--image"),
  };
}

function getInfos() {
  return {
    current: infoWrapper.querySelector(".current--info"),
    previous: infoWrapper.querySelector(".previous--info"),
    next: infoWrapper.querySelector(".next--info"),
  };
}

/* =========================
   NAVIGAZIONE
========================= */
buttons.next.addEventListener("click", () => swapCards("right"));
buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
  if (isAnimating) return;

  isAnimating = true;

  const cards = getCards();
  const images = getImages();

  removeCardEvents(cards.current);

  changeInfo(direction);
  changeCards(direction, cards);
  changeImages(direction, images);

  setTimeout(() => {
    initCardEvents();
    isAnimating = false;
  }, 700);
}

/* =========================
   CLASSI CARD
========================= */
function changeCards(direction, cards) {
  cards.current.classList.remove("current--card");
  cards.previous.classList.remove("previous--card");
  cards.next.classList.remove("next--card");

  if (direction === "right") {
    cards.current.classList.add("previous--card");
    cards.previous.classList.add("next--card");
    cards.next.classList.add("current--card");
  } else {
    cards.current.classList.add("next--card");
    cards.previous.classList.add("current--card");
    cards.next.classList.add("previous--card");
  }
}

/* =========================
   CLASSI BG
========================= */
function changeImages(direction, images) {
  images.current.classList.remove("current--image");
  images.previous.classList.remove("previous--image");
  images.next.classList.remove("next--image");

  if (direction === "right") {
    images.current.classList.add("previous--image");
    images.previous.classList.add("next--image");
    images.next.classList.add("current--image");
  } else {
    images.current.classList.add("next--image");
    images.previous.classList.add("current--image");
    images.next.classList.add("previous--image");
  }
}

/* =========================
   INFO TEXT
========================= */
function changeInfo(direction) {
  const infos = getInfos();

  gsap.timeline()
    .to([buttons.prev, buttons.next], {
      opacity: 0.5,
      duration: 0.2,
      pointerEvents: "none"
    })

    .to(infos.current.querySelectorAll(".text"), {
      y: -40,
      opacity: 0,
      stagger: 0.08,
      duration: 0.3
    })

    .call(() => {
      infos.current.classList.remove("current--info");
      infos.previous.classList.remove("previous--info");
      infos.next.classList.remove("next--info");

      if (direction === "right") {
        infos.current.classList.add("previous--info");
        infos.next.classList.add("current--info");
        infos.previous.classList.add("next--info");
      } else {
        infos.current.classList.add("next--info");
        infos.previous.classList.add("current--info");
        infos.next.classList.add("previous--info");
      }
    })

    .fromTo(
      getInfos().current.querySelectorAll(".text"),
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.35
      }
    )

    .to([buttons.prev, buttons.next], {
      opacity: 1,
      duration: 0.2,
      pointerEvents: "all"
    });
}

/* =========================
   TILT CARD
========================= */
function updateCard(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const center = rect.width / 2;

  const rotate = ((x - center) / center) * 15;

  gsap.to(card, {
    "--current-card-rotation-offset": `${rotate}deg`,
    duration: 0.3
  });

  gsap.to(getInfos().current, {
    rotateY: rotate,
    duration: 0.3
  });
}

function resetCard() {
  gsap.to(getCards().current, {
    "--current-card-rotation-offset": "0deg",
    duration: 0.4
  });

  gsap.to(getInfos().current, {
    rotateY: 0,
    duration: 0.4
  });
}

function initCardEvents() {
  const current = getCards().current;

  current.addEventListener("pointermove", updateCard);
  current.addEventListener("pointerleave", resetCard);
}

function removeCardEvents(card) {
  card.removeEventListener("pointermove", updateCard);
  card.removeEventListener("pointerleave", resetCard);
}

/* =========================
   AUTOPLAY
========================= */
function startAutoplay() {
  autoplay = setInterval(() => {
    swapCards("right");
  }, 5000);
}

function stopAutoplay() {
  clearInterval(autoplay);
}

document.querySelector(".app").addEventListener("mouseenter", stopAutoplay);
document.querySelector(".app").addEventListener("mouseleave", startAutoplay);

/* =========================
   LOADER
========================= */
function preloadImages() {
  const images = [...document.querySelectorAll("img")];
  const loader = document.querySelector(".loader span");

  let loaded = 0;
  const total = images.length;

  images.forEach(img => {
    imagesLoaded(img, () => {
      loaded++;

      const progress = loaded / total;

      gsap.to(loader, {
        scaleX: progress,
        backgroundColor: `hsl(${progress * 120},100%,50%)`,
        duration: 0.4
      });

      if (loaded === total) {
        introAnimation();
      }
    });
  });
}

/* =========================
   INTRO
========================= */
function introAnimation() {
  gsap.timeline()

    .to(".loading__wrapper", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.7
    })

    .to(cardsWrapper.children, {
      "--card-translateY-offset": "0%",
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out"
    })

    .fromTo(
      getInfos().current.querySelectorAll(".text"),
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.4
      }
    )

    .to([buttons.prev, buttons.next], {
      opacity: 1,
      pointerEvents: "all",
      duration: 0.3
    });

  initCardEvents();
  startAutoplay();
}

/* =========================
   START
========================= */
preloadImages();
