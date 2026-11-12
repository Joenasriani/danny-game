import { chromium } from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('qa-output/danny-live',{recursive:true});
const URL='https://joenasriani.github.io/danny-game/preview/danny/';
const profiles=[
 {name:'desktop',viewport:{width:1440,height:900},touch:false},
 {name:'mobile-portrait',viewport:{width:390,height:844},touch:true},
 {name:'mobile-landscape',viewport:{width:844,height:390},touch:true}
];
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const results=[];
try {
 for(const p of profiles){
  const ctx=await browser.newContext({viewport:p.viewport,hasTouch:p.touch,isMobile:p.touch});
  const page=await ctx.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/preview/danny/**',async route=>{
   if(!route.request().url().includes('/index.html'))return route.continue();
   const r=await route.fetch(),html=await r.text(),marker='      function initializeGame() {';
   if(!html.includes(marker))return route.fulfill({response:r,body:html});
   const bridge=String.raw`
window.__DANNY_LIVE_CHECK = ()=>({
 loaded:dannyPuppet.loaded,failed:dannyPuppet.failed,origVisible:stickParts.visible,
 levelCount:LEVELS.length,state:playerState,hitpoints:hp,px:playerGroup.position.x,
 textureWidth:dannyPuppet.mesh.material.map.image.width,distance:orbit.distance
});
`;
   await route.fulfill({response:r,body:html.replace(marker,bridge+marker),headers:{...r.headers(),'cache-control':'no-store'}});
  });
  const row={view:p.name,checks:{},errors};
  try {
   const response=await page.goto(URL+'index.html?review=latest',{waitUntil:'domcontentloaded',timeout:45000});
   row.checks.status200=response?.status()===200;
   row.checks.newPreviewTitle=(await page.title()).includes('Living Sketch');
   await page.waitForFunction(()=>window.__DANNY_LIVE_CHECK?.().loaded===true,null,{timeout:24000});
   let a=await page.evaluate(()=>window.__DANNY_LIVE_CHECK());
   row.checks.originalArtworkVisible=a.loaded&&!a.origVisible&&!a.failed&&a.textureWidth===512;
   row.checks.levelOneOnly=a.levelCount===1;
   await page.locator('#startButton').click();
   await page.waitForTimeout(1400);
   row.checks.startButtonWorks=await page.locator('#intro').isHidden();
   row.checks.canvas=await page.locator('canvas').first().isVisible();
   const x=(await page.evaluate(()=>window.__DANNY_LIVE_CHECK())).px;
   if(p.touch){
    const right=page.locator('.touchBtn[data-key="ArrowRight"]');
    row.checks.touchControls=await right.isVisible();
    await right.dispatchEvent('pointerdown',{pointerId:7,pointerType:'touch'});
    await page.waitForTimeout(240);
    await right.dispatchEvent('pointerup',{pointerId:7,pointerType:'touch'});
   } else {
    await page.keyboard.down('ArrowRight');await page.waitForTimeout(260);await page.keyboard.up('ArrowRight');
   }
   row.checks.inputWorks=(await page.evaluate(()=>window.__DANNY_LIVE_CHECK())).px>x+0.01;
   // Assert closer-than-original default framing and working wide/close toggle.
   const near=(await page.evaluate(()=>window.__DANNY_LIVE_CHECK())).distance;
   row.checks.closeupDefault=near<=18.2;
   await page.locator('#dannyPrototypeLabel summary').click();
   const focusButton=page.locator('#dannyFocusToggle');
   row.checks.focusToggleExists=await focusButton.isVisible();
   await focusButton.click();
   const wide=(await page.evaluate(()=>window.__DANNY_LIVE_CHECK())).distance;
   row.checks.wideCameraWorks=wide>near+1.5;
   await focusButton.click();
   const restored=(await page.evaluate(()=>window.__DANNY_LIVE_CHECK())).distance;
   row.checks.restoreCloseup=Math.abs(restored-near)<1.2;
   await page.locator('#dannyPrototypeLabel summary').click();
   row.checks.noPageError=errors.length===0;
   await page.screenshot({path:'qa-output/danny-live/'+p.name+'.png'});
  } catch(e){row.exception=String(e).slice(0,550);}
  row.failed=Object.entries(row.checks).filter(([name,pass])=>!pass).map(([name])=>name);
  results.push(row);await ctx.close();
 }
} finally {await browser.close();}
console.log(JSON.stringify({kind:'LIVE_SEPARATE_DANNY_LEVEL1_PREVIEW_VALIDATION',URL,results},null,2));
if(results.some(r=>r.failed.length||r.exception))process.exitCode=1;