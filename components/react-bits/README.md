# React Bits components

These components come from [React Bits](https://reactbits.dev/) by David Haz, downloaded from the official registry (`https://reactbits.dev/r/<Name>-TS-CSS.json`). The license is in `LICENSE.md`.

| Component | Used for | Adapted |
| --- | --- | --- |
| LightRays | Hero background | DPR capped at 1.5; one still frame for reduced motion |
| StarBorder | Light travelling around the "Let's discuss your project" and "Prepare my project brief" buttons | None |
| Noise | Very light moving film grain over the whole page | None |
| TiltedCard | Hero portrait | No tilt for reduced motion |
| Orb | Glowing ring behind the hero portrait | Page greens as base colours; listens on the window; turns slowly on its own; DPR 1.5; pauses off screen; still for reduced motion |
| BorderGlow | "Ask me something else" card in the FAQ | None |
| CircularText | Spinning "Let's talk" badge on the portrait | No spin for reduced motion; letters hidden from screen readers (the link has a label) |
| BlurText | Hero name and section headings | Span wrapper for headings, readable text alternative, reduced motion, `initialDelay` |
| ShinyText | Hero role pill | None |
| DecryptedText | Section labels | Screen readers get the real text; no scramble for reduced motion |
| ScrollReveal | About statement | Span inside the heading, cleanup scoped to the instance, static for reduced motion |
| AnimatedContent | Scroll entrances (via `Reveal` in `Chrome.tsx`) | Shown without movement for reduced motion |
| MagicBento | Services bento grid (hover particles, spotlight, border glow, click ripple, magnetism) | Cards passed in through `cards`; effects off for reduced motion and small screens; no global `:root` overrides; colours from CSS variables |
| Threads | Slowly moving light threads behind the Exprovia card | None |
| Waves | Faint wavy lines behind Process that bend with the mouse | Three bugs fixed (stale position after scrolling, a stray dot from invalid CSS, a non-passive touch listener); pauses off screen; sharp on high-DPI; still for reduced motion |
| CountUp | Exprovia figures and the Experience "at a glance" figures | Final value straight away for reduced motion |
| Counter | Rolling clock in the Contact time-zone card | Digits jump for reduced motion; decimal point split out so hooks run in a fixed order |
| GradientText | Animated "hello." in the Contact heading | None |
| Stepper | Process steps | lucide-react icons instead of Hugeicons |
| GlareHover | WhatsApp and LinkedIn cards | None |
| Particles | Contact background | Pauses off screen; one still frame for reduced motion |
| Magnet | Primary buttons | None (disabled for touch and reduced motion by `Magnetic`) |

LightRays and Particles need `ogl`. ScrollReveal, AnimatedContent and MagicBento need `gsap`. Threads uses WebGL2 directly. The others use `motion`, canvas or plain CSS.

The pinned hero with the About card sliding over it, the portrait reveal, and the header that hides on scroll are built with `motion` (already a dependency), because React Bits has no component for them.
