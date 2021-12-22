const DEV_MODE = document.domain === "localhost";
const TYPE = window.type;

window.config = {
  carousel: {
    autoPlay: DEV_MODE ? true : true,
    loop: DEV_MODE ? false : false,
    startSlide: DEV_MODE ? 0 : 0,
    maxSlides: 4,
    slideTimeout: DEV_MODE ? 5000 : 5000,
  },
};

window.main = () => {
  const main = document.querySelector("#main");
  const legal = document.querySelector("#legal");
  const ref = document.querySelector("#ref");
  const close = document.querySelector("#close-button");

  const links = {
    main: "https://zogenix.wavecast.io/fintepla-2022/registration?utm_source=Digital&utm_medium=BannerAds&utm_campaign=Register_interest",
    legal:
      "https://www.zogenixresources.eu/Fintepla-fenfluramine-Prescribing-Information.pdf",
  };

  function openLink(link) {
    window.open(link, "_blank");
  }

  main.addEventListener("click", () => {
    openLink(links.main);
  });

  legal.addEventListener("click", () => {
    openLink(links.legal);
  });

  if(ref && close) {
    ref.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      state.holding.slide = state.carousel.slide;
      window.config.carousel.autoPlay = false;
      window.config.carousel.maxSlides = 5;
      state.carousel.slide = 4;
      updateDom();
    });

    close.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.config.carousel.maxSlides = 4;
      state.carousel.slide = Math.min(state.holding.slide, 3);
      window.config.carousel.autoPlay = true;
      if (state.carousel.slide === 3) {
        updateDom();
      } else {
        state.carousel.slide = state.carousel.slide - 1
        updateSlide();
      }
    });
  }

  const carousel = document.querySelector(".carousel");
  const state = {
    carousel: {
      slide: window.config.carousel.startSlide,
    },
    holding: {
      slide: 0,
    },
  };

  function updateDom() {
    carousel.style.setProperty("--slide", state.carousel.slide);
    carousel.setAttribute("data-slide", state.carousel.slide);
    main.setAttribute("data-slide", state.carousel.slide);
  }

  updateDom();

  window.updateSlide = function () {
    console.log("?")
    state.carousel.slide = state.carousel.slide + 1;
    if (state.carousel.slide > window.config.carousel.maxSlides - 1) {
      if (!window.config.carousel.loop) return;
      state.carousel.slide = window.config.carousel.startSlide;
    }
    updateDom();
    if (state.carousel.slide === window.config.carousel.maxSlides) {
      return;
    }
    setTimeout(updateSlide, window.config.carousel.slideTimeout);
  };

  if (window.config.carousel.autoPlay) {
    setTimeout(updateSlide, window.config.carousel.slideTimeout);
  }
};

window.addEventListener("load", main);
