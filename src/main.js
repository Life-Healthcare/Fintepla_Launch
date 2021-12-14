window.config = {
  carousel: {
    // autoPlay: true,
    autoPlay: false,
    loop: false,
    // startSlide: 0,
    startSlide: 2,
    maxSlides: 4,
    slideTimeout: 5000,
  },
};

window.main = () => {
  const main = document.querySelector("#main");
  const legal = document.querySelector("#legal");

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

  const carousel = document.querySelector(".carousel");
  const state = {
    carousel: {
      slide: window.config.carousel.startSlide,
    },
  };

  function updateDom() {
    carousel.style.setProperty("--slide", state.carousel.slide);
    carousel.setAttribute("data-slide", state.carousel.slide);
    main.setAttribute("data-slide", state.carousel.slide);
  }

  updateDom();

  window.updateSlide = function () {
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
