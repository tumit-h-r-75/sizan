# Portfolio prompt: one-shot rebuild for a new person

Ei file-e Sizan-er portfolio jei process-e banano hoyeche, sheta ekta prompt hishebe lekha ache. Onno karo jonno same jinish banate:

1. Ekta khali folder khulen, oi manusher photo-ta folder-e rakhen.
2. Niche "Prompt" section-er puro code block copy korun.
3. Shuru-te `PERSON DETAILS` block-ta oi manusher tottho diye puron korun. Ja jana nai, sheta `TODO` likhe rakhen, bananor dorkar nai.
4. Claude Code (ba Codex) chalu kore puro block-ta ekbare paste korun.

Prompt-ta English-e, karon AI coding agent English-e shobcheye nikhut kaj kore. Reference hishebe ei repo-ta (`github.com/tumit-h-r-75/sizan`) dekhe nite paren.

---

## Prompt

````text
Build a single-page personal portfolio website for the person below, in this folder.
Work end to end without stopping: build, verify in a real browser, fix what you find, then report.

=== PERSON DETAILS (fill in; write TODO for anything unknown) ===
Full name:            <e.g. Md. Soykat Hasan Sizan>
Short / brand name:   <e.g. Sizan>
Role:                 <e.g. Business Development Executive>
Company:              <e.g. Exprovia>
Company summary:      <1–2 sentences about the company and the person's part in it>
Company figures:      <e.g. 350+ projects delivered; 20+ countries served; 4.9 rating on Fiverr and Upwork>
Company figures source link: <URL or TODO>
Teammate link (optional): <label + URL, e.g. "Meet our Technical Project Manager" https://...>
Location + timezone:  <e.g. Rajshahi, Bangladesh, Asia/Dhaka (UTC+6)>
Photo file:           <path to the portrait in this folder>
WhatsApp:             <e.g. +880 1320-574316>
LinkedIn:             <URL>
Facebook:             <URL or none>
Instagram:            <URL or none>
Hero line:            <e.g. "Your business goals. The right technical team. I bring them together, one conversation at a time.">
About statement:      <1–2 short sentences, e.g. "Business is personal. So is my approach. ...">
About paragraph:      <what they do and the common thread of their career>
Skills:               <comma separated>
Services:             <for each: title | one-line description | 3 tags | icon idea>
Experience:           <for each company: name, type (Full-time/Part-time), workplace, location,
                       roles with title, start, end, optional one-line description; newest first>
Education:            <institution | degree | years>
Community / leadership: <organisation | role | association>
Process steps:        <4 steps: name | one sentence, e.g. Discovery call, Clear proposal, Kickoff, Ongoing contact>
GitHub repo to push to (optional): <URL, git user.name, git user.email>
=== END PERSON DETAILS ===

CONTENT RULES
- Use only the facts above. Never invent clients, numbers, testimonials, degrees or claims.
  Leave unknown fields as TODO in the data file and hide them on the page.
- Company figures are shown as the company's figures, separate from personal achievements.
- Every fact appears exactly once on the page. No section repeats another section.
  Where each fact lives:
  * Name: hero heading (header shows only the short brand name + avatar).
  * Role + company: the hero pill.
  * Skills: About only (not repeated as chips in Experience).
  * Education + community: inside About.
  * Services: Services only (no marquee or summary strip elsewhere).
  * Career details and dates: Experience timeline only (no "since 2021" stats elsewhere).
  * Company figures: the company panel only.
  * Process: one Process section (no separate "Approach" section saying the same thing).
  * WhatsApp, LinkedIn, location and local time: Contact only.
  * Facebook and Instagram: footer only.
- All content lives in one typed file, data/profile.ts. Components read from it; no copy duplicated in components.

STACK
- React 19 + TypeScript + Vite. Dependencies: motion, gsap, ogl, lucide-react. Nothing else (no Tailwind,
  no Next.js shims, no unused packages). Path alias "@" → project root.
- Every animated or interactive component comes from React Bits (https://reactbits.dev). Do not hand-write
  animation components. Fetch each from the official registry:
  https://reactbits.dev/r/<Name>-TS-CSS.json  (JSON with "files[].content" and "dependencies").
  Save them in components/react-bits/ with React Bits' license (LICENSE.md) and a README listing
  what each component is used for and what you adapted. Read every file before using it.
- Components and where they go:
  * LightRays (ogl): hero background. raysOrigin "top-center", raysColor = accent, raysSpeed 0.7,
    lightSpread 0.9, rayLength 1.5, fadeDistance 1.1, followMouse, mouseInfluence 0.08,
    noiseAmount 0.06, distortion 0.04. Wrapper absolutely positioned behind the hero, opacity 0.75.
  * TiltedCard (motion): hero portrait. 100% width/height inside a square wrapper (max 470px),
    scaleOnHover 1.04, rotateAmplitude 9, showMobileWarning false, showTooltip false, 28px radius.
  * CircularText (motion): a round spinning "LET'S TALK • START A PROJECT •" badge on the portrait's
    bottom-left corner, linking to #contact (aria-label "Let's talk"), with an accent arrow in the middle.
    Keep it clear of any logo on the photo.
  * BlurText (motion): hero name (two lines) and every section heading (white line + muted line).
  * ShinyText: the role pill in the hero.
  * DecryptedText (motion): small mono section labels ("01 — About"), animateOn "view", sequential,
    uppercase character set.
  * ScrollReveal (gsap): the big About statement.
  * AnimatedContent (gsap): the standard scroll entrance. Wrap it once as a small Reveal helper
    (distance 36, duration 0.9, ease "power3.out", threshold 0.12) and reuse it.
  * MagicBento (gsap): the services grid – hover particles, a spotlight that follows the cursor,
    border glow, click ripple, magnetism. Adapt it to take the cards as a prop (the original has demo
    data hard-coded), remove its global :root variables and color-scheme, read colours from CSS
    variables, and switch effects off for reduced motion. glowColor = accent as "r, g, b".
  * Threads (WebGL2): slowly moving light threads behind the company card (colour = accent,
    lineCount 60, speed 0.25, opacity 0.3, fade 0.5 – keep it faint so the figures stay readable).
  * Waves: faint wavy lines behind the Process section that bend with the mouse
    (lineColor accent at ~12% alpha, masked to fade at the edges). Fix its bugs first – see pitfalls.
  * StarBorder: a small light travelling around the main "Let's discuss your project" button
    (as="a", white light, radius 999, background = accent).
  * Noise: a very light moving film grain over the whole page (fixed, opacity ~0.035, 16 fps).
    Start low; it looks too grainy above ~0.05.
  * CountUp (motion): the company figures (suffix like "+" rendered next to it; a star after the rating).
  * Stepper: the process steps. Controlled step state; nextButtonText "Next step";
    completeButtonText "Start a conversation"; on final step scroll to #contact; theme it with the page
    palette through its CSS variables; accentColor = accent.
  * GlareHover: the WhatsApp and LinkedIn contact cards (variant "sheen", glare in the accent colour).
  * Particles (ogl): subtle contact-section background (count 260, spread 10, speed 0.08,
    base size 110, alphaParticles, colours: accent, white, muted grey; wrapper opacity 0.6).
  * Magnet: primary CTA buttons, disabled for touch pointers and reduced motion.

REQUIRED ADAPTATIONS TO THE REACT BITS SOURCE (keep a one-line "Adapted:" comment at the top of each)
- Reduced motion everywhere: LightRays and Particles draw one still frame; TiltedCard skips tilt;
  CountUp shows the final value; DecryptedText skips the scramble; ScrollReveal stays static;
  AnimatedContent shows content immediately (it starts with visibility:hidden otherwise).
- Stepper: replace @hugeicons imports with lucide-react (Check, ArrowLeft, ArrowRight).
- ScrollReveal: it renders <p> inside <h2> (invalid) – use a <span>. Its cleanup kills every
  ScrollTrigger on the page – scope it with gsap.context(...).revert().
- DecryptedText: its screen-reader text is visibility:hidden and shows scrambled text – make the
  sr-only span contain the real text and be readable.
- BlurText: render a span (so it can live inside a heading), add a visually hidden text copy,
  add an initialDelay prop so the second heading line starts after the first, and with
  reduced motion render plain text.
- LightRays: cap devicePixelRatio at 1.5 and remove its z-index from its CSS.
- Particles: pause rendering while off screen (IntersectionObserver).

DESIGN
- Minimal, professional, dark. Generous spacing, thin 1px lines, few colours, no clutter.
- Build the palette from the photo: sample the photo's background colours with a canvas and use them
  as the page base and accent so the portrait blends in. Reference palette (from a navy-to-green photo):
  bg #0a0d12, raised #0d1117, surface #11161e, surface-2 #171d27, line rgba(255,255,255,.08),
  strong line rgba(255,255,255,.15), text #eef1f5, soft text #c5ccd5, muted #8d97a3, faint #66717d,
  accent #3ee27a (hover #63ee97, ink on accent #04140a). Keep body text at least 4.5:1 contrast.
- Fonts: Geist and Geist Mono from Google Fonts. Large headings with tight negative letter-spacing;
  mono, uppercase, letter-spaced small labels.
- Avoid anything that looks AI-generated or decorative for its own sake: no scroll-progress line under
  the header, no marquee/ticker strips, no orbit rings or floating info chips on the photo,
  no stat rows that repeat other sections, no giant footer slogans.

PAGE STRUCTURE (section ids in brackets)
1. Header: fixed; transparent at the top, blurred background + thin border after 24px of scroll;
   hides while scrolling down and returns while scrolling up (stays visible near the top, while the
   menu is open, while it has keyboard focus, and after a jump of more than one screen from an
   anchor link).
   Left: round avatar + brand name with an accent dot. Centre: pill nav (About, Services, Experience,
   Process, Contact) with a sliding active pill (motion layoutId) driven by IntersectionObserver.
   Right: "Let's talk" button and a mobile menu toggle (menu below 900px, closes on Escape, on link click
   and when the window grows past 900px).
2. Hero [top]: LightRays background; role pill (ShinyText + pulsing dot); name in two BlurText lines;
   hero line; buttons "Let's discuss your project" (StarBorder, to #contact) and "My journey"
   (to #experience); portrait on the right with a soft breathing glow behind it, revealed on load from
   the bottom up while it settles from a slight zoom (clip-path + scale with motion); small
   "Scroll to explore" cue. On desktop the hero is position: sticky inside a wrapper with About, so
   the About section slides over it like a rounded card (rounded top corners, top border, upward
   shadow); driven by motion's useScroll on the About section: hero copy fades and lifts, the portrait
   drifts up slightly and shrinks a little, a dark shade fades in over the hero, and LightRays
   unmounts once covered. On phones there is no pinning; the About card just overlaps the hero's
   bottom with a negative margin. No pinning for reduced motion.
3. About [about] (label 01): ScrollReveal statement; about paragraph next to a Skills chip list;
   then a two-column block [education]: Education list and Community & leadership list.
4. Services [services] (label 02): heading + one sentence; MagicBento grid on 4 columns:
   row 1 = first service (span 2) + two services, row 2 = two services + a "Not sure where to start?"
   card (span 2, accent border, sparkle icon, "Start with a conversation" button that scrolls to
   #contact without preselecting). 2 columns at ≤1024px, 1 column at ≤640px. Each service card: icon,
   number, title, description, mono tags, and a "Let's talk" button whose ::after covers the whole
   card. Its aria-label is "Discuss <service>"; clicking it preselects that service in the contact
   form and scrolls to #contact.
5. Experience [experience] (label 03): heading row like the other sections, then a career timeline
   chart that is also the list. A header row has a legend (current role, earlier roles, today) and a
   year axis from the first start year to the current year. Each company is a native <details>
   (first one open) whose summary shows company, current badge, latest role, date range, computed
   duration ("1 yr 11 mo", counted inclusively like LinkedIn) and type, next to a track with one
   10px rounded bar per role positioned on the year axis (2px gap between roles, hairline year
   gridlines, a thin accent "today" line, bars grow from the left on scroll, hover tooltip with role
   and duration). Current role bar: a green step that passes the dark-mode lightness band
   (e.g. #27ad5d); earlier roles: neutral grey. Expanded content shows each role with dates,
   duration and description plus location. Animate opening with ::details-content + interpolate-size.
   On mobile the bar track moves under the text.
6. Company panel [exprovia or company slug]: rounded floating card (deep soft shadow) with a soft
   gradient from the photo's colours and Threads behind its content; company wordmark, heading, summary, optional teammate
   link; figures list with CountUp and the source link.
7. Process [process] (label 04): Waves in the background; heading + one sentence; the Stepper with
   the 4 steps (content: icon, "Step N of 4", the sentence).
8. Contact [contact] (label 05): a rounded card (inset from the page edges) with Particles behind; heading "Big things start / with a simple /
   hello." (last line in accent); one sentence; two GlareHover cards (WhatsApp with the number linking
   to https://wa.me/<digits>, LinkedIn); local time in the person's timezone, updated every 30s.
   Right: a project-brief form (name*, work email, business/website, service select, timeline select,
   project* with min 10 characters). Submitting opens a <dialog> with the composed brief and three
   actions: "Send on WhatsApp" (wa.me link with ?text=<encoded brief>), "Copy project brief"
   (clipboard, with a status message in role="status"), "Open <name>'s LinkedIn". Escape and backdrop
   click close it and return focus to the submit button. Nothing is sent or stored by the site itself.
9. Footer: one row – brand, © year + short name, Facebook and Instagram, "Back to top".

PHOTO
- Convert the photo to WebP with a headless browser canvas: 800px (hero) and 160px (avatar), quality
  about 0.86. Put them in public/images/, preload the large one in index.html, keep the original file.

BEHAVIOUR AND ACCESSIBILITY
- Wrap the app in MotionConfig reducedMotion="user". Respect prefers-reduced-motion in CSS too
  (stop looping keyframe animations, near-zero transitions).
- After first render, if the URL has a #hash, scroll to that element (the page renders on the client).
- Skip link, visible focus rings in the accent colour, external links open in a new tab with
  rel="noopener noreferrer" and a visually hidden "(opens in a new tab)".
- Add JSON-LD Person schema (name, jobTitle, worksFor, address, image, sameAs).
- index.html: title, description, Open Graph and Twitter tags, theme-color = page background,
  an SVG favicon in the palette.

KNOWN PITFALLS (these all happened; check for them)
- TiltedCard uses <figure>; reset its default 40px margin or the photo shifts right, badly on mobile.
- GlareHover is display:inline-grid with place-items:center; for full-width cards set
  display:grid and place-items:stretch, or the content sits in the middle.
- A background component with z-index:-1 disappears behind the body background unless its section
  creates a stacking context (isolation: isolate).
- Particles with small sizes/counts are invisible; start from the values above.
- Year labels and a "Today" label on the chart axis collide on phones; put "Today" in the legend.
- React Bits Waves has three bugs: it measures its position once, so after scrolling the lines react
  in the wrong place (measure on every pointer event); its CSS draws a stray dot from invalid
  var(-0.5rem) rules (delete that rule); its window touchmove listener is non-passive (make it passive).
- A sticky rule placed before the base .hero rule loses to it; give it higher specificity.
- MagicBento's GSAP magnetism sets transform and resets `translate` inline, so lift the cards on hover
  with `top` (they are position: relative).
- Hover touches: service cards lift; company names in Experience turn terracotta (#e07a5f).
- Chart tooltips on bars in the right half must anchor to the bar's right edge or they run off screen.
- Stepper's footer buttons overflow at 320px on the last step; let the footer wrap and the next
  button grow below 600px.
- Form labels that wrap their input: use display:block (not grid) so "Your name *" stays on one line.
- Keep the page free of horizontal scroll from 320px up (use overflow-x: clip on body, not hidden,
  so sticky positioning still works).

VERIFY (do not skip)
- npx tsc --noEmit and npm run build must pass.
- Write scripts/verify-portfolio.mjs with Playwright (use the installed Microsoft Edge channel,
  reducedMotion "reduce" for the main context) and run it against the dev server. It must check:
  one h1 with the name and the page title; every section id exists and every #anchor has a target;
  the portrait image loads; looping animations are off and content visible under reduced motion;
  the chart has one bar per role and the right computed durations; the Threads, Waves, Noise and
  StarBorder canvases and the portrait badge exist; the services grid has all cards; with normal
  motion the hero stays pinned while scrolling, the header hides on scroll down and returns on
  scroll up;
  the service button preselects the form and moves to #contact; empty submit does not open the dialog;
  a filled submit opens it with the right brief; copy works (grant clipboard permissions); the
  WhatsApp link contains the encoded brief; the LinkedIn link is right; Escape closes the dialog and
  focus returns to the submit button; a <details> entry opens and closes; the Stepper moves with
  "Next step", by clicking "Step 4: …", and "Start a conversation" goes to #contact; the WhatsApp
  contact card links to wa.me; no horizontal overflow at 1440, 1280, 1024, 800, 768, 600, 390, 360
  and 320px (print the overflowing elements on failure); the mobile menu opens, navigates and closes
  on Escape; no broken images and no console errors; with normal motion the hero canvas exists and a
  CSS animation advances. Save screenshots to .qa/ (git-ignored).
- Then look at screenshots yourself at 1440, 768, 425/390 and 320px, plus a hover state and a
  mid-animation frame, and fix spacing, overlap and alignment problems before finishing.

CLEANUP AND DELIVERY
- Delete anything unused: starter files, unused components, unused data fields, unused packages.
- README.md: how to run (npm install, npm run dev, npm run build, node scripts/verify-portfolio.mjs),
  where content lives, and the content rules above.
- .gitignore: node_modules, dist, .env*, .qa/, playwright-report/, test-results/.
- If a GitHub repo was given: set the git user.name and user.email given above, git init, commit,
  branch main, add the remote and push. Show me the commit and the repo URL.
- Finally tell me what you built, what you verified, and every TODO left in data/profile.ts.
````

---

## Mone rakhar moto kotha

- **Photo:** square ar parishkar background-wala photo shobcheye bhalo kaj kore. Page-er rong photo-r background theke neya hoy, tai photo bodlale rong-o bodlabe.
- **Tottho:** prompt-e ja deben, shudhu tai page-e jabe. Kono number ba claim nishchit na hole `TODO` likhun.
- **Shomoy:** puro kaj-e onek tool call lage (component download, build, browser check). Majhkhane thamiye dile shudhu "ses koro" likhlei hobe, agent je jaygay chhilo sheikhan theke cholbe.
- **Pore bodlate chaile:** shob lekha `data/profile.ts`-e, ar rong ar spacing `src/portfolio.css`-er upore `:root`-e.
