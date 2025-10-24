import { gsap } from 'gsap';

export const gsapGlitch = () => {
    const button = document.querySelector('.button');
    const buttonBg = document.querySelector('.button-bg');

    button.addEventListener("mouseenter", () => {
        gsap.from(buttonBg, { scale: 0, duration: 1, ease: "circ" })
    })
}
