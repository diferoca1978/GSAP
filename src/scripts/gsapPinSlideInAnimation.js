import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const pinSlideInAnimation = () => {
  // Split text in every panel upfront
  const panels = gsap.utils.toArray(".panel");
  const splits = panels.map((panel) =>
    SplitText.create(panel.querySelectorAll(".panel-title, .panel-label, .panel-sub"), {
      type: "words, chars",
      mask: "chars",
    })
  );

  const tl = gsap.timeline({
    defaults: { ease: "none", duration: 2 },
    scrollTrigger: {
      trigger: "#panel-container",
      start: "top 88px",
      end: "+=4000",
      markers: true,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  // Animate the green panel text on entry (no slide — it's the base panel)
  tl.from(splits[0].chars, {
    opacity: 0,
    yPercent: 100,
    stagger: 0.02,
    duration: 0.5,
    ease: "power2.out",
  });

  // Orange panel: slide in, then reveal its text
  tl.from(".orange", { yPercent: 100, duration: 2 })
    .from(
      splits[1].chars,
      { opacity: 0, yPercent: 100, stagger: 0.02, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );

  // Purple panel: slide in, then reveal its text
  tl.from(".purple", { yPercent: 100, duration: 2 })
    .from(
      splits[2].chars,
      { opacity: 0, yPercent: 100, stagger: 0.02, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );

  // Blue panel: slide in, then reveal its text
  tl.from(".blue", { yPercent: 100, duration: 2 })
    .from(
      splits[3].chars,
      { opacity: 0, yPercent: 100, stagger: 0.02, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );

  return () => {
    splits.forEach((s) => s.revert());
    tl.scrollTrigger?.kill();
  };
};
