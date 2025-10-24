import { gsap } from 'gsap';
import { GSDevTools } from 'gsap/GSDevTools';
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin, GSDevTools);

export const gsapVariableAnimation = () => {
  // 
  gsap.set("#highlight-path", {drawSVG:"0% 10%"})

  const tl = gsap.timeline()
  
  .from("#full-path, #highlight-path", {attr:{
    d:"M 100.417 500.23 C 100.417 500.23 200 500 300 500 C 396.328 500 549.863 500 800 500 C 900 500 902.725 497.786 900 500"
  }})

  .to ("#highlight-path", {drawSVG:"85% 100%", duration:1.5}, "+=0.5")
  .to ("#highlight-path", {drawSVG:"10% 30%", duration:1.5}, "+=0.5")

  GSDevTools.create();
}




/**<
<path style="fill: none; stroke-width: 25px; stroke-linecap: round; stroke-linejoin: round; stroke: oklch(0.31 0 0);" d="M 100.417 500.23 C 100.417 500.23 200 500 300 500 C 396.328 500 549.863 500 800 500 C 900 500 902.725 497.786 900 500"></path>

 */


