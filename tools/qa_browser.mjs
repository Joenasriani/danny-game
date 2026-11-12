// Live-browser smoke and responsive QA; does not claim full 16-level playthrough or physical device testing.
import { chromium } from 'playwright';

const origin = 'https://joenasriani.github.io/danny-game/';
const configurations = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, touch: false },
  { name: 'mobile-portrait-emulated', viewport: { width: 390, height: 844 }, touch: true },
  { name: 'mobile-landscape-emulated', viewport: { width: 844, height: 390 }, touch: true },
  { name: 'tablet-emulated', viewport: { width: 768, height: 1024 }, touch: true }
];
const findings = [];
let failures = 0;
const browser = await chromium.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage']
});
try {
  for (const config of configurations) {
    const context = await browser.newContext({
      viewport: config.viewport, hasTouch: config.touch, isMobile: config.touch,
      deviceScaleFactor: 1, ignoreHTTPSErrors: false
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const result = { configuration: config.name, checks: {}, errors };
    try {
      const response = await page.goto(origin, { waitUntil: 'domcontentloaded', timeout: 45000 });
      result.checks.http200 = response?.status() === 200;
      result.checks.branding = (await page.title()).includes('Danny') &&
        (await page.locator('#introSubtitle').textContent()).includes('The man who Sword the world!');
      await page.waitForTimeout(1500);
      result.checks.canvas = await page.locator('canvas').count() > 0;
      result.checks.canvasSized = await page.locator('canvas').first().evaluate(el => el.width > 0 && el.height > 0);
      result.checks.initError = !((await page.locator('#msgText').textContent() || '').includes('INIT ERROR'));
      result.checks.startVisible = await page.locator('#startButton').isVisible();
      await page.locator('#startButton').click({ timeout: 15000 });
      await page.waitForTimeout(2400);
      result.checks.introDismissed = await page.locator('#intro').isHidden();
      result.checks.levelOne = (await page.locator('body').innerText()).includes('LEVEL 1');
      result.checks.hud = (await page.locator('#hpDisplay').innerText()).startsWith('HP:');
      if (config.touch) {
        const btns = page.locator('.touchBtn[data-key]');
        result.checks.touchButtonsVisible = await btns.count() >= 5 && await btns.first().isVisible();
        await btns.first().tap({ timeout: 5000 });
      } else {
        await page.keyboard.down('ArrowRight');
        await page.waitForTimeout(350);
        await page.keyboard.up('ArrowRight');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Space');
        await page.keyboard.press('ArrowDown');
        result.checks.keyboardNoException = errors.length === 0;
      }
      result.checks.noPageExceptions = errors.length === 0;
    } catch (e) {
      result.exception = String(e).slice(0, 750);
    }
    const failed = Object.entries(result.checks).filter(([,value]) => !value).map(([key]) => key);
    if (failed.length || result.exception) failures++;
    findings.push({ ...result, failed });
    await context.close();
  }
} finally { await browser.close(); }
console.log(JSON.stringify({ kind: 'REAL_BROWSER_SMOKE_ONLY', url: origin, chromium: true, findings, failures, limitations: [
  'Not a manual or physical-device test', 'Not a full 16-level progression test', 'Does not verify audio audibility or every gesture'
]}, null, 2));
if (failures) process.exitCode = 1;
