import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const baseURL = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const output = new URL("../.qa/", import.meta.url);
const artifact = (name) => fileURLToPath(new URL(name, output));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const issues = [];
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
  reducedMotion: "reduce",
});
await context.grantPermissions(["clipboard-read", "clipboard-write"], {
  origin: new URL(baseURL).origin,
});
const page = await context.newPage();
page.on("pageerror", (error) => issues.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") issues.push(message.text());
});

const checkpoint = (name) => console.log(`PASS ${name}`);
async function assertFits(width) {
  await page.setViewportSize({ width, height: 960 });
  await page.waitForTimeout(120);
  const sizes = await page.evaluate(() => ({
    viewport: window.innerWidth,
    body: document.documentElement.scrollWidth,
    culprits: [...document.querySelectorAll("body *")]
      .filter((element) => element.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 5)
      .map((element) => `${element.tagName.toLowerCase()}.${element.className}`),
  }));
  assert.ok(
    sizes.body <= sizes.viewport + 1,
    `Horizontal overflow at ${width}px: ${sizes.body} (${sizes.culprits.join(", ")})`,
  );
}
async function captureSection(id, fileName) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await page.screenshot({ path: artifact(fileName) });
}

try {
  const response = await page.goto(baseURL, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("h1").count(), 1);
  assert.match(await page.locator("h1").innerText(), /Soykat Hasan\s+Sizan\./);
  assert.match(await page.title(), /Soykat Hasan Sizan/);
  for (const id of [
    "about",
    "services",
    "experience",
    "exprovia",
    "process",
    "education",
    "contact",
  ]) {
    assert.equal(await page.locator(`#${id}`).count(), 1);
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  }
  const badAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((anchors) =>
      anchors
        .map((anchor) => anchor.getAttribute("href"))
        .filter(
          (href) =>
            !href || href === "#" || !document.getElementById(href.slice(1)),
        ),
    );
  assert.deepEqual(badAnchors, []);
  checkpoint("page, sections, metadata, and navigation targets");

  const portrait = page.locator(".portrait .tilted-card-img");
  assert.equal(await portrait.count(), 1);
  assert.ok(
    await portrait.evaluate((image) => image.complete && image.naturalWidth > 0),
    "Hero portrait did not load",
  );
  assert.deepEqual(
    await page.evaluate(() =>
      [
        [".portrait-glow", null],
        [".scroll-cue-line span", null],
        [".pulse-dot", "::after"],
      ].map(
        ([selector, pseudo]) =>
          getComputedStyle(document.querySelector(selector), pseudo).animationName,
      ),
    ),
    ["none", "none", "none"],
  );
  assert.equal(
    await page
      .locator(".hero-lead")
      .evaluate((element) => getComputedStyle(element.parentElement).visibility),
    "visible",
  );
  checkpoint("portrait loads and reduced motion shows content without looping animation");

  const roleCount = await page.evaluate(
    () => document.querySelectorAll(".career-row .role-detail").length,
  );
  assert.equal(await page.locator(".career-bar").count(), roleCount);
  assert.match(
    await page.locator(".career-row").filter({ hasText: "Kiki Charity" }).locator("summary").innerText(),
    /Feb 2021 – Dec 2022 · 1 yr 11 mo/,
  );
  assert.equal(await page.locator("#exprovia .threads-canvas").count(), 1);
  assert.equal(await page.locator(".process-waves canvas").count(), 1);
  assert.equal(await page.locator(".noise.noise--fixed").count(), 1);
  assert.equal(await page.locator(".hero-actions .star-border .star-border__light").count(), 1);
  assert.equal(
    await page.locator(".portrait-badge").getAttribute("href"),
    "#contact",
  );
  assert.equal(await page.locator(".service-grid .magic-bento-card").count(), 6);
  checkpoint("career chart, durations, Threads, Waves, grain, StarBorder, badge, and service bento");

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  await page.screenshot({ path: artifact("desktop-hero.png") });
  await captureSection("about", "desktop-about.png");
  await captureSection("services", "desktop-services.png");
  await captureSection("process", "desktop-process.png");
  await captureSection("contact", "desktop-contact.png");
  await page.screenshot({ path: artifact("desktop-full.png"), fullPage: true });

  await page
    .getByRole("button", { name: "Discuss Web Applications", exact: true })
    .click();
  assert.equal(
    await page.locator('select[name="service"]').inputValue(),
    "Web Applications",
  );
  assert.equal(new URL(page.url()).hash, "#contact");
  await page.getByRole("button", { name: "Prepare my project brief" }).click();
  assert.equal(
    await page.locator("dialog").evaluate((element) => element.open),
    false,
  );
  await page.getByLabel("Your name").fill("Portfolio QA");
  await page.getByLabel("Work email").fill("qa@example.test");
  await page.getByLabel("Business or website").fill("QA review");
  await page.getByLabel("Your timeline").selectOption("Within a month");
  await page
    .getByLabel("Your project", { exact: false })
    .first()
    .fill("We would like to discuss a custom business web application.");
  await page.getByRole("button", { name: "Prepare my project brief" }).click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  const brief = await page.getByLabel("Prepared project brief").inputValue();
  assert.match(brief, /Name: Portfolio QA/);
  assert.match(brief, /Interested in: Web Applications/);
  assert.match(brief, /Timeline: Within a month/);
  assert.match(brief, /custom business web application/);
  await page
    .getByRole("button", { name: "Copy project brief", exact: true })
    .click();
  assert.equal(
    (await page.evaluate(() => navigator.clipboard.readText())).replace(
      /\r\n/g,
      "\n",
    ),
    brief,
  );
  assert.match(await page.getByRole("status").innerText(), /Copied/);
  assert.equal(
    await page
      .getByRole("link", { name: /Open Sizan's LinkedIn/ })
      .getAttribute("href"),
    "https://www.linkedin.com/in/sizan16447/",
  );
  const whatsappBrief = await page
    .getByRole("link", { name: /Send on WhatsApp/ })
    .getAttribute("href");
  assert.ok(
    whatsappBrief.startsWith("https://wa.me/8801320574316?text="),
    whatsappBrief,
  );
  assert.equal(
    decodeURIComponent(whatsappBrief.split("?text=")[1]).replace(/\r\n/g, "\n"),
    brief,
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page.locator("dialog").evaluate((element) => element.open),
    false,
  );
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent?.trim()),
    "Prepare my project brief",
  );
  checkpoint(
    "service selection, required fields, brief preview, clipboard, WhatsApp and LinkedIn links, and dialog focus",
  );

  const pastRole = page.locator("details").filter({ hasText: "Parentliiink" });
  await pastRole.locator("summary").click();
  assert.equal(await pastRole.evaluate((element) => element.open), true);
  await pastRole.locator("summary").click();
  assert.equal(await pastRole.evaluate((element) => element.open), false);
  const stepper = page.locator(".process-stepper");
  const activePane = stepper.locator(".stepper__pane:not(.stepper__pane--leaving)");
  await stepper.scrollIntoViewIfNeeded();
  assert.match(await activePane.innerText(), /goals, timeline, and budget/);
  await stepper.getByRole("button", { name: "Next step" }).click();
  assert.match(await activePane.innerText(), /written scope and estimate/);
  assert.equal(
    await stepper
      .getByRole("button", { name: "Step 2: Clear proposal" })
      .getAttribute("aria-current"),
    "step",
  );
  await stepper.getByRole("button", { name: "Step 4: Ongoing contact" }).click();
  assert.match(await activePane.innerText(), /point of contact/);
  await stepper.getByRole("button", { name: "Start a conversation" }).click();
  assert.equal(new URL(page.url()).hash, "#contact");
  assert.equal(
    await page
      .locator(".channel")
      .filter({ hasText: "WhatsApp" })
      .getAttribute("href"),
    "https://wa.me/8801320574316",
  );
  checkpoint("career disclosure, process stepper, and contact channels");

  for (const width of [1440, 1280, 1024, 800, 768, 600, 390, 360, 320])
    await assertFits(width);
  checkpoint("responsive layout without horizontal scrolling at 9 widths");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Close navigation" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Services/ })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .getAttribute("aria-expanded"),
    "false",
  );
  assert.equal(new URL(page.url()).hash, "#services");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: artifact("mobile-hero.png") });
  await captureSection("contact", "mobile-contact.png");
  checkpoint("mobile navigation and Escape dismissal");

  const brokenImages = await page
    .locator("img")
    .evaluateAll((images) =>
      images
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.src),
    );
  assert.deepEqual(brokenImages, []);
  assert.deepEqual(issues, [], "Browser console or runtime errors");
  checkpoint("no broken images or browser errors");

  const animatedContext = await browser.newContext({
    viewport: { width: 1440, height: 960 },
  });
  const animatedPage = await animatedContext.newPage();
  animatedPage.on("pageerror", (error) => issues.push(error.message));
  await animatedPage.goto(baseURL, { waitUntil: "networkidle" });
  await animatedPage.waitForTimeout(1600);
  const cueTransform = () =>
    animatedPage
      .locator(".scroll-cue-line span")
      .evaluate((element) => getComputedStyle(element).transform);
  const initial = await cueTransform();
  await animatedPage.waitForTimeout(300);
  assert.notEqual(await cueTransform(), initial);
  assert.equal(await animatedPage.locator(".hero-rays canvas").count(), 1);
  const headerOffset = () =>
    animatedPage
      .locator(".site-header")
      .evaluate((element) => element.getBoundingClientRect().top);
  const heroTop = () =>
    animatedPage
      .locator(".hero")
      .evaluate((element) => Math.round(element.getBoundingClientRect().top));
  const pinnedAt = await heroTop();
  await animatedPage.mouse.wheel(0, 500);
  await animatedPage.waitForTimeout(800);
  assert.equal(await heroTop(), pinnedAt, "Hero should stay pinned while About slides over it");
  assert.ok((await headerOffset()) < -20, "Header should hide while scrolling down");
  await animatedPage.mouse.wheel(0, -200);
  await animatedPage.waitForTimeout(800);
  assert.equal(await headerOffset(), 0, "Header should return while scrolling up");
  await animatedPage.evaluate(() => window.scrollTo(0, 0));
  await animatedPage.waitForTimeout(400);
  assert.equal(
    await animatedPage
      .locator(".hero-lead")
      .evaluate((element) => getComputedStyle(element.parentElement).opacity),
    "1",
    "Hero entrance did not finish",
  );
  await animatedPage.screenshot({ path: artifact("desktop-animated.png") });
  assert.deepEqual(issues, []);
  checkpoint("normal-motion animation renders and advances");
  console.log("Screenshots saved to .qa/");
} finally {
  await browser.close();
}
