import { gsap } from 'gsap';


export const gsapCardAnimation = () => {
  gsap.set(".stage p", {opacity:1})

  const stages = gsap.utils.toArray(".stage");

  stages.forEach( (stage, i) => {
    const tl = gsap.timeline({defaults:{ease:"power2.inOut"}, paused:true})

// animate headings of the cards
  .to(stage.querySelector(".headings"), {yPercent:-50})
  .from(stage.querySelector("p"), {y:10, opacity: 0}, 0)

  
    stage.addEventListener("mouseenter", () => {
      tl.play();
    })

    stage.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  })

  

  
};