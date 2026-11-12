// Honest input-driven Level 1 traversal probe using the deployed Danny game.
// No changes to gameplay code; browser response instrumentation is read-only.
// This is a computer-controlled attempt, not human playtesting and not all 16 levels.
import { chromium } from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('qa-output',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--disable-dev-shm-usage']});
const attempts=[];
async function trial(firstJump,secondJump){
 const context=await browser.newContext({viewport:{width:1280,height:720},recordVideo:{dir:'qa-output',size:{width:1280,height:720}}});
 const page=await context.newPage();
 const jsErrors=[];
 page.on('pageerror',e=>jsErrors.push(e.message));
 await page.route('**/danny-game/',async route=>{
  const response=await route.fetch(), html=await response.text();
  const marker='      function initializeGame() {';
  if(!html.includes(marker))throw Error('Instrumentation marker missing');
  const bridge=`window.__DANNY_TRAVERSAL_PROBE=()=>({x:playerGroup.position.x,y:playerGroup.position.y,level:currentLevelIndex+1,ground:onGround,hp,gameOver,modal:levelBannerActive});`;
  await route.fulfill({response,body:html.replace(marker,bridge+marker),headers:{...response.headers(),'cache-control':'no-store'}});
 });
 let outcome={firstJump,secondJump,stage:'load',levelReached:1,checkpoints:[],errors:jsErrors};
 try{
  await page.goto('https://joenasriani.github.io/danny-game/',{waitUntil:'domcontentloaded',timeout:45000});
  await page.locator('#startButton').click();
  await page.waitForTimeout(1150);
  const state=async()=>page.evaluate(()=>window.__DANNY_TRAVERSAL_PROBE());
  const go=async(x,timeout=8500)=>{
   await page.waitForFunction(target=>{
    const s=window.__DANNY_TRAVERSAL_PROBE();
    return s.x>=target || s.level>1 || s.gameOver;
   },x,{timeout});
   const s=await state();
   outcome.checkpoints.push({target:x,...s});
   if(s.gameOver)throw Error('Game over before reaching x='+x);
  };
  const jump=async()=>{
   await page.keyboard.down('ArrowUp');
   await page.waitForTimeout(135);
   await page.keyboard.up('ArrowUp');
  };
  outcome.stage='first approach';
  await page.keyboard.down('ArrowRight');
  await go(firstJump);
  outcome.stage='first jump';
  await jump();
  await go(secondJump);
  outcome.stage='second jump';
  await jump();
  await go(10.9,16000);
  outcome.stage='exit';
  await go(11.5,8500);
  outcome.levelReached=(await state()).level;
  outcome.passed=outcome.levelReached>=2&&!jsErrors.length;
 }catch(err){outcome.error=String(err).slice(0,650);try{outcome.finalState=await page.evaluate(()=>window.__DANNY_TRAVERSAL_PROBE?.());}catch{}}
 finally{
  await page.keyboard.up('ArrowRight').catch(()=>{});
  await page.screenshot({path:`qa-output/level01-probe-${firstJump}-${secondJump}.png`}).catch(()=>{});
  await context.close();
 }
 return outcome;
}
try{
 for(const [a,b] of [[-3.1,3.3],[-3.8,3.0],[-3.4,3.7]]){
  const result=await trial(a,b);attempts.push(result);
  if(result.passed)break;
 }
}finally{await browser.close();}
const result={method:'Playwright game-input probe using keyboard, no teleport; NOT manual/physical QA',tests:attempts,passed:attempts.some(a=>a.passed)};
fs.writeFileSync('qa-output/results.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
if(!result.passed)process.exitCode=1;
