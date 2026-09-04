'use client';

import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, useState } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  { number: '01', title: 'Pulse / Brand Film', type: 'Motion Design', year: '2026', className: 'project-pulse' },
  { number: '02', title: 'Afterlight / Title Sequence', type: 'Art Direction', year: '2025', className: 'project-afterlight' },
  { number: '03', title: 'Drift / Product Story', type: 'Edit + Color', year: '2025', className: 'project-drift' },
];

export default function Home() {
  const [showReel, setShowReel] = useState(false);
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
        intro
          .from('.nav', { y: -24, opacity: 0, duration: 0.8 })
          .from('.intro-fade', { y: 22, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.45')
          .from('.intro-reveal', { yPercent: 112, rotate: 2, duration: 1.15, stagger: 0.12 }, '-=0.5')
          .from('.reel-button', { scale: 0.7, opacity: 0, duration: 0.65, ease: 'back.out(1.8)' }, '-=0.55');

        gsap.to('.hero-title', {
          yPercent: 16,
          scale: 0.86,
          opacity: 0.32,
          transformOrigin: '50% 100%',
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        });

        gsap.to('.motion-track', { xPercent: -50, duration: 18, ease: 'none', repeat: -1 });
        gsap.to('.scroll-progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.25 },
        });

        gsap.utils.toArray<HTMLElement>('.project').forEach((card, index) => {
          gsap.from(card, {
            y: 100,
            opacity: 0,
            rotate: index % 2 ? 1.5 : -1.5,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 86%', toggleActions: 'play none none reverse' },
          });
          gsap.to(card.querySelector('.project-art'), {
            yPercent: index % 2 ? -4 : 4,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
          });
        });

        gsap.from('.about-grid > *', {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-grid', start: 'top 78%' },
        });

        const button = document.querySelector<HTMLElement>('.reel-button');
        if (button) {
          const moveX = gsap.quickTo(button, 'x', { duration: 0.45, ease: 'power3' });
          const moveY = gsap.quickTo(button, 'y', { duration: 0.45, ease: 'power3' });
          const move = (event: PointerEvent) => {
            const rect = button.getBoundingClientRect();
            moveX((event.clientX - rect.left - rect.width / 2) * 0.2);
            moveY((event.clientY - rect.top - rect.height / 2) * 0.2);
          };
          const reset = () => { moveX(0); moveY(0); };
          button.addEventListener('pointermove', move);
          button.addEventListener('pointerleave', reset);
          return () => {
            button.removeEventListener('pointermove', move);
            button.removeEventListener('pointerleave', reset);
          };
        }
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <main ref={root}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Alex Morgan, home">AM<span>®</span></a>
        <div className="nav-links"><a href="#work">Work</a><a href="#about">About</a><a href="mailto:hello@example.com">Contact</a></div>
        <span className="availability"><i /> Available for projects</span>
      </nav>
      <section className="hero shell" id="top">
        <div className="hero-kicker intro-fade"><span>Independent creative</span><span>Dubai / Worldwide</span></div>
        <h1 className="hero-title"><span className="line-mask"><span className="intro-reveal">I make ideas</span></span><span className="line-mask"><span className="intro-reveal">move<span className="accent">.</span></span></span></h1>
        <div className="hero-bottom">
          <p className="intro-fade">Motion designer &amp; video editor crafting kinetic identities, title sequences and films with rhythm.</p>
          <button className="reel-button" onClick={() => setShowReel(true)} aria-label="Play showreel"><span><Play size={18} fill="currentColor" /></span> Play showreel <small>01:12</small></button>
        </div>
        <a className="scroll intro-fade" href="#work"><ArrowDown size={16} /> Selected work</a>
      </section>
      <div className="motion-band" aria-hidden="true"><div className="motion-track"><span>IDEA → FRAME → FEELING → MOTION → </span><span>IDEA → FRAME → FEELING → MOTION → </span></div></div>
      <section className="work shell" id="work">
        <div className="section-heading"><span>Selected work</span><span>2024—2026</span></div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project ${project.className}`} key={project.title}>
              <a href="mailto:hello@example.com?subject=Project enquiry" aria-label={`Enquire about ${project.title}`}>
                <div className="project-art"><span className="project-number">{project.number}</span><ArrowUpRight className="project-arrow" /></div>
                <div className="project-meta"><h2>{project.title}</h2><p>{project.type} <span>{project.year}</span></p></div>
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="about shell" id="about">
        <p className="eyebrow">What I do</p>
        <div className="about-grid">
          <h2>Images that<br /><em>feel</em> alive.</h2>
          <div><p>I partner with studios, brands and directors to turn good ideas into memorable moving images—from first frame to final export.</p><ul><li>Motion direction</li><li>2D / 3D animation</li><li>Video editing</li><li>Title design</li></ul></div>
        </div>
      </section>
      <footer className="footer shell">
        <p>Have a project in mind?</p><a href="mailto:hello@example.com">Let’s make it move <ArrowUpRight /></a>
        <div><span>© 2026 Alex Morgan</span><span>Instagram · Vimeo · LinkedIn</span></div>
      </footer>
      {showReel && <div className="reel-modal" role="dialog" aria-modal="true" aria-label="Showreel placeholder"><button onClick={() => setShowReel(false)} aria-label="Close showreel">Close</button><div className="reel-frame"><span>SHOWREEL</span><p>Your reel embeds here</p></div></div>}
    </main>
  );
}
