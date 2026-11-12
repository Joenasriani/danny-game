import { chromium } from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('qa-output/playable',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const findings=[];let failed=0;
const views=[
 {name:'desktop',viewport:{width:1366,height:768},mobile:false},
 {name:'portrait',viewport:{width:390,height:844},mobile:true},
 {name:'landscape',viewport:{width:844,height:390},mobile:true}
];
try{
for(const profile of views){
 const ctx=await browser.newContext({viewport:profile.viewport,hasTouch:profile.mobile,isMobile:profile.mobile,deviceScaleFactor:1});
 const page=await ctx.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/preview/danny/index.html',async route=>{
  const r=await route.fetch(),html=await r.text(),needle='      function initializeGame() {';
  if(!html.includes(needle))throw Error('Missing test injection anchor');
  const bridge=String.raw`
window.__DANNY_TEST = {
 status:()=>({loaded:dannyPuppet.loaded,failed:dannyPuppet.failed,oldVisible:stickParts.visible,
  rigVisible:dannyPuppet.mesh.visible, levelCount:LEVELS.length,level:currentLevelIndex+1,
  state:playerState,x:playerGroup.position.x,y:playerGroup.position.y,hp,gameOver,
  attackTimer,visualState:window.dannyVisualDemoState,
  textureWidth:dannyPuppet.mesh.material.map.image.width,
  heroHeight:dannyPuppet.mesh.geometry.parameters.height}),
 hit:()=>applyDamage(1,'TEST DAMAGE')
};
`;
  await route.fulfill({response:r,body:html.replace(needle,bridge+needle),headers:{...r.headers(),'cache-control':'no-store'}});
 });
 const result={profile:profile.name,checks:{},errors};
 try{
  const r=await page.goto('http://127.0.0.1:8765/preview/danny/index.html',{waitUntil:'domcontentloaded',timeout:45000});
  result.checks.html200=r?.status()===200;
  await page.waitForFunction(()=>window.__DANNY_TEST?.status().loaded===true,null,{timeout:25000});
  const before=await page.evaluate(()=>window.__DANNY_TEST.status());
  result.checks.originalSketchLoaded=before.loaded&&!before.failed&&before.rigVisible&&!before.oldVisible;
  result.checks.oneLevelOnly=before.levelCount===1;
  result.checks.texture=before.textureWidth===512&&before.heroHeight>1.5;
  await page.locator('#startButton').click();
  await page.waitForTimeout(1250);
  result.checks.introHidden=await page.locator('#intro').isHidden();
  const x=(await page.evaluate(()=>window.__DANNY_TEST.status())).x;
  if(profile.mobile){
   const right=page.locator('.touchBtn[data-key="ArrowRight"]');
   result.checks.touchControlsVisible=await right.isVisible();
   await right.dispatchEvent('pointerdown',{pointerId:6,pointerType:'touch'});
   await page.waitForTimeout(360);
   await right.dispatchEvent('pointerup',{pointerId:6,pointerType:'touch'});
  }else{
   await page.keyboard.down('ArrowRight');await page.waitForTimeout(380);await page.keyboard.up('ArrowRight');
  }
  result.checks.moves=(await page.evaluate(()=>window.__DANNY_TEST.status())).x>x+0.05;
  await page.locator('summary').filter({hasText:'MOTION LAB'}).click();
  for(const v of ['idle','run','jump','attack','block','hit']){
   await page.locator('[data-dannymotion="'+v+'"]').click();
   result.checks['visual_'+v]=(await page.evaluate(()=>window.__DANNY_TEST.status())).visualState===v;
  }
  await page.locator('[data-dannymotion=""]').click();
  result.checks.visualAuto=(await page.evaluate(()=>window.__DANNY_TEST.status())).visualState===null;
  await page.locator('summary').filter({hasText:'MOTION LAB'}).click();
  if(!profile.mobile){
   await page.keyboard.down('ArrowUp');await page.waitForTimeout(120);await page.keyboard.up('ArrowUp');
   result.checks.jump=(await page.evaluate(()=>window.__DANNY_TEST.status())).y>0.05;
   await page.keyboard.press('Space');await page.waitForTimeout(70);
   result.checks.attackNoException=errors.length===0;
   await page.evaluate(()=>window.__DANNY_TEST.hit());
   await page.waitForTimeout(65);
   result.checks.damage=(await page.evaluate(()=>window.__DANNY_TEST.status())).hp===4;
  }
  result.checks.noRuntimeErrors=errors.length===0;
  await page.screenshot({path:'qa-output/playable/'+profile.name+'-new-Danny.png'});
 }catch(e){result.exception=String(e).slice(0,650)}
 result.failed=Object.entries(result.checks).filter(([k,v])=>!v).map(([k])=>k);
 if(result.failed.length||result.exception)failed++;
 findings.push(result);
 await ctx.close();
}
}finally{await browser.close();}
console.log(JSON.stringify({kind:'ACTUAL_LEVEL1_DANNY_VISUAL_GAMEPLAY_TEST',findings,failed},null,2));
if(failed)process.exitCode=1;