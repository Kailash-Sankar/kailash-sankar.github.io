const primaryColor = "#109dc8";

const particleConfig = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    color: {
      value: primaryColor,
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#fff",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5681863019752363,
      random: false,
      anim: {
        enable: false,
        speed: 0,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 1.9,
      random: false,
      anim: {
        enable: false,
        speed: 7.192807192807193,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 110.48066982851817,
      color: primaryColor,
      opacity: 0.40246529723245905,
      width: 1.1048066982851816,
    },
    move: {
      enable: true,
      speed: 5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 159.84015984015983,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};

export default particleConfig;
