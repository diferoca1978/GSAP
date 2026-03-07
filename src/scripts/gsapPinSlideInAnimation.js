import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const pinSlideInAnimation = () => {
  gsap.defaults({ ease: "none", duration: 2 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#panel-container",
        start: "top 88px",
        end: "+=4000",
        markers: true,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    })

    .from(".orange", { yPercent: 100 })
    .from(".purple", { yPercent: 100 })
    .from(".blue", { yPercent: 100 });
};