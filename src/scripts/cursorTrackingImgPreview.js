import { gsap } from 'gsap';

export const cursorTrackingImgPreview = () => {
  const section = document.querySelector('[data-cursor-section]');
  if (!section) return;

  const previewPanel = section.querySelector('[data-preview-panel]');
  const previewImages = gsap.utils.toArray('[data-preview-img]', section);
  const idleEl = section.querySelector('[data-preview-idle]');
  const counterEl = section.querySelector('[data-preview-counter]');
  const projectItems = gsap.utils.toArray('[data-project-item]', section);

  if (!previewPanel || !previewImages.length || !projectItems.length) return;

  // Hide all project images initially; show the idle placeholder
  gsap.set(previewImages, { autoAlpha: 0, scale: 1.08 });
  gsap.set(idleEl, { autoAlpha: 1 });

  // quickTo for smooth Y parallax on the image panel (cursor tracking feel)
  const yTo = gsap.quickTo(previewPanel, 'y', { duration: 0.7, ease: 'power3.out' });

  // Map cursor Y position (relative to section) to a subtle vertical offset (±20px)
  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const relY = (e.clientY - rect.top) / rect.height; // 0 → 1
    const offset = (relY - 0.5) * 40; // -20px to +20px
    yTo(offset);
  });

  section.addEventListener('mouseleave', () => {
    yTo(0);
  });

  let activeIndex = -1;
  const total = projectItems.length;

  projectItems.forEach((item, i) => {
    const numberEl = item.querySelector('[data-project-number]');
    const titleEl = item.querySelector('[data-project-title]');
    const arrowEl = item.querySelector('[data-project-arrow]');

    item.addEventListener('mouseenter', () => {
      // Hide idle placeholder on first hover
      if (activeIndex === -1) {
        gsap.to(idleEl, { autoAlpha: 0, duration: 0.25 });
      }

      // Crossfade: fade out previous, reveal current
      if (activeIndex !== -1 && activeIndex !== i) {
        gsap.to(previewImages[activeIndex], {
          autoAlpha: 0,
          scale: 1.06,
          duration: 0.4,
          ease: 'power2.in',
        });
      }

      gsap.to(previewImages[i], {
        autoAlpha: 1,
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
      });

      // Update counter
      if (counterEl) {
        counterEl.textContent = `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
      }

      // Row micro-animations
      gsap.to(numberEl, { color: '#a3a3a3', duration: 0.25 });
      gsap.to(titleEl, { x: 12, duration: 0.35, ease: 'power2.out' });
      gsap.to(arrowEl, { x: 5, color: '#ffffff', duration: 0.3, ease: 'power2.out' });

      activeIndex = i;
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(numberEl, { color: '#404040', duration: 0.3 });
      gsap.to(titleEl, { x: 0, duration: 0.35, ease: 'power2.out' });
      gsap.to(arrowEl, { x: 0, color: '#525252', duration: 0.3 });
    });
  });

  // When leaving the section entirely, fade out active image and restore idle
  section.addEventListener('mouseleave', () => {
    if (activeIndex !== -1) {
      gsap.to(previewImages[activeIndex], { autoAlpha: 0, scale: 1.06, duration: 0.4 });
    }
    gsap.to(idleEl, { autoAlpha: 1, duration: 0.35, delay: 0.1 });
    if (counterEl) counterEl.textContent = `— / ${String(total).padStart(2, '0')}`;
    activeIndex = -1;
  });
};
