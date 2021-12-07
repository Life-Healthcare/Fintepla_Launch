window.config = {
  carousel: {
    autoPlay: false,
    loop: false,
    startSlide: 0,
    maxSlides: 3,
    slideTimeout: 5000,
  },
};

window.main = () => {
  const carousel = document.querySelector(".carousel");
  const state = {
    carousel: {
      slide: window.config.carousel.startSlide,
    },
  };

  window.updateSlide = function () {
    state.carousel.slide = state.carousel.slide + 1;
    if (state.carousel.slide > window.config.carousel.maxSlides - 1) {
      if (!window.config.carousel.loop) return;
      state.carousel.slide = window.config.carousel.startSlide;
    }
    carousel.style.setProperty("--slide", state.carousel.slide);
    carousel.setAttribute("data-slide", state.carousel.slide);
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
