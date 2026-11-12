// Visual QA from the actual deployed Danny Pages game. Screenshots are evidence,
// not approval of level reachability, gameplay fairness or physical mobile behavior.
import fs from 'node:fs';
import { chromium } from 'playwright';
const URL='https://joenasriani.github.io/danny-game/';
const OUT='docs/visual-evidence';
fs.mkdirSync(OUT,{recursive:true});
const views=[
  {id:'desktop',width:1440,height:900,touch:false},
  {id:'mobile-portrait',width:390,height:844,touch:true},
  {id:'mobile-landscape',width:844,height:390,touch:true},
  {id:'tablet',width:768,height:1024,touch:true}
];
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const results=[];
try{
 for(const view of views){
  const ctx=await browser.newContext({viewport:{width:view.width,height:view.height},deviceScaleFactor:1,hasTouch:view.touch,isMobile:view.touch});
  const page=await ctx.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/danny-game/',async route=>{
   const response=await route.fetch();
   const html=await response.text();
   const marker='      function initializeGame() {';
   const bridge=`window.__DANNY_VISUAL_QA = (n) => { currentLevelIndex=n; loadCurrentLevel(false); };`;
   if(!html.includes(marker))throw Error('QA instrumentation marker absent');
   await route.fulfill({response,body:html.replace(marker,bridge+marker),headers:{...response.headers(),'cache-control':'no-store'}});
  });
  const response=await page.goto(URL,{waitUntil:'domcontentloaded',timeout:45000});
  if(response?.status()!==200)throw Error('URL status '+response?.status());
  await page.waitForTimeout(1300);
  if(view.id==='desktop')await page.screenshot({path:OUT+'/desktop-intro.png'});
  await page.locator('#startButton').click();
  await page.waitForTimeout(2000);
  if(!await page.locator('canvas').isVisible())throw Error('Canvas missing for '+view.id);
  await page.screenshot({path:OUT+'/'+view.id+'-level-01.png'});
  if(view.id==='desktop'){
    await page.evaluate(()=>window.__DANNY_VISUAL_QA(3));
    await page.waitForTimeout(1300);
    await page.screenshot({path:OUT+'/desktop-level-04.png'});
    await page.evaluate(()=>window.__DANNY_VISUAL_QA(15));
    await page.waitForTimeout(1300);
    await page.screenshot({path:OUT+'/desktop-level-16.png'});
  }
  results.push({viewport:view.id,width:view.width,height:view.height,consoleErrors:errors,screenshots:true});
  await ctx.close();
 }
}finally{await browser.close();}
if(results.some(x=>x.consoleErrors.length))throw Error('Uncaught runtime errors: '+JSON.stringify(results));
const md=`# Danny – Visual QA evidence (actual GitHub Pages game)

**Source URL:** https://joenasriani.github.io/danny-game/

**Capture method:** Headless Chromium/Playwright, GitHub Actions on Ubuntu 24.04, fresh load of the deployed game. Screenshots represent the **existing original game** before the Living Sketch redesign; they are not mockups or final Danny character designs. Portrait/landscape/tablet images are **emulated viewports**, not photographs of physical devices. The Level 4 and 16 views used test-only level selection in the isolated browser. These images do not prove normal platform traversal, audio, FPS, visual quality approval or completion of 16 levels.

## Desktop – 1440 × 900
![Danny desktop opening](desktop-intro.png)

![Danny desktop Level 1](desktop-level-01.png)

![Danny desktop Level 4](desktop-level-04.png)

![Danny desktop Level 16](desktop-level-16.png)

## Mobile portrait – emulated 390 × 844
![Danny emulated portrait Level 1](mobile-portrait-level-01.png)

## Mobile landscape – emulated 844 × 390
![Danny emulated landscape Level 1](mobile-landscape-level-01.png)

## Tablet – emulated 768 × 1024
![Danny emulated tablet Level 1](tablet-level-01.png)

## Current acceptance boundary
Phase 01 Task 2 remains **PARTIAL / OPEN**: full natural level-by-level gameplay, real Android/iOS and tablet hardware, actual gesture quality, sound and platform reachability are not yet verified. Refer to [the QA register](../QA_PHASE01.md) for exact evidence and outstanding items.
`;
fs.writeFileSync(OUT+'/README.md',md);
console.log(JSON.stringify(results,null,2));
