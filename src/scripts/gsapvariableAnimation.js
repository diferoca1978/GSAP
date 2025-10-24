import { gsap } from 'gsap';
import { GSDevTools } from 'gsap/GSDevTools';
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin, GSDevTools);

export const gsapVariableAnimation = () => {
 
  // To set the start position of the highlight path
  gsap.set("#highlight-path", {drawSVG:"0% 25%"})

  const tl = gsap.timeline()

  // To set the initial behavior of the full path and highlight path as a horizontal line
  .from("#full-path, #highlight-path", {attr:{
    d:"M 100.417 500.23 C 100.417 500.23 200 500 300 500 C 396.328 500 549.863 500 800 500 C 900 500 902.725 497.786 900 500"
  }})

  // To animate both paths to its final shape
  .to ("#highlight-path", {drawSVG:"75% 100%", duration:1.5}, "+=0.5")
  .to ("#highlight-path", {drawSVG:"32% 50%", duration:1.5}, "+=0.5")
  
  // To generate the movement of the highlight path along the full path based on the mouse hover of the buttons
  const positions = ["0% 30%", "32% 50%", "52% 72%", "74% 100%"];
  const buttons = gsap.utils.toArray("#buttons rect");

  buttons.forEach((btn, i) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to("#highlight-path", {drawSVG:positions[i], duration:1, ease:"power2.out"});
    });
  });

  gsap.set(".stage p", {opacity:1})

  const stages = gsap.utils.toArray(".stage");

  stages.forEach( (stage, i) => {
    const tl = gsap.timeline({defaults:{ease:"power2.inOut"}, paused:true})

// animate headings of the cards
  .to(stage.querySelector(".headings"), {yPercent:-50})
  .from(stage.querySelector("p"), {y:10, opacity: 0}, 0)

  
    stage.addEventListener("mouseenter", () => {
      tl.play()
      gsap.to("#highlight-path", {drawSVG:positions[i], duration:1, ease:"power2.out"});
    })

    stage.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  })

  // GSDevTools.create();
};



/**<
<path style="fill: none; stroke-width: 25px; stroke-linecap: round; stroke-linejoin: round; stroke: oklch(0.31 0 0);" d="M 100.417 500.23 C 100.417 500.23 200 500 300 500 C 396.328 500 549.863 500 800 500 C 900 500 902.725 497.786 900 500"></path>

 */


