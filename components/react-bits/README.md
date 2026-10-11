# React Bits components

These components come from [React Bits](https://reactbits.dev/) by David Haz, downloaded from the official registry (`https://reactbits.dev/r/<Name>-TS-CSS.json`). The license is in `LICENSE.md`.

| Component | Used for | Adapted |
| --- | --- | --- |
| LightRays | Hero background | DPR capped at 1.5; one still frame for reduced motion |
| TiltedCard | Hero portrait | No tilt for reduced motion |
| BlurText | Hero name and section headings | Span wrapper for headings, readable text alternative, reduced motion, `initialDelay` |
| ShinyText | Hero role pill | None |
| DecryptedText | Section labels | Screen readers get the real text; no scramble for reduced motion |
| ScrollReveal | About statement | Span inside the heading, cleanup scoped to the instance, static for reduced motion |
| AnimatedContent | Scroll entrances (via `Reveal` in `Chrome.tsx`) | Shown without movement for reduced motion |
| SpotlightCard | Service cards | None |
| CountUp | Exprovia figures | Final value straight away for reduced motion |
| Stepper | Process steps | lucide-react icons instead of Hugeicons |
| GlareHover | WhatsApp and LinkedIn cards | None |
| Particles | Contact background | Pauses off screen; one still frame for reduced motion |
| Magnet | Primary buttons | None (disabled for touch and reduced motion by `Magnetic`) |

LightRays and Particles need `ogl`. ScrollReveal and AnimatedContent need `gsap`. The others use `motion` or plain CSS.
