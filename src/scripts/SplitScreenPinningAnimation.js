import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const splitScreenAnimation = () => {
  const content = gsap.utils.toArray(
    ".desktopContentSection:not(:first-child)", // Get all content sections except the first one
  );
  const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)"); // Get all photos except the first one

  gsap.set(photos, { yPercent: 100 }); // set all photos to 100% of the screen (out of the viewport)

  let mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    console.log("desktop");

    ScrollTrigger.create({
      trigger: ".gallery",
      start: "top top",
      end: "bottom bottom",
      markers: true,
      pin: ".right",
      scrub: true,
    });

    content.forEach((item, index) => {
      let headLine = item.querySelector("h1");
      ScrollTrigger.create({
        trigger: headLine,
        start: "top 80%",
        end: "bottom 50%",
        animation: gsap.to(photos[index], { yPercent: 0 }),
        markers: true,
        scrub: true,
      });
    });

    return () => {
      console.log("mobile");
    };
  });
};