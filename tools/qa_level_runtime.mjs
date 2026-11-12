// Instrumentation is injected *only in a temporary headless test response*.
// No game source code in the repository or the published Pages site is altered.
// Controlled exit teleport proves transition handling, NOT that a human can traverse platforms.
import { chromium } from 'playwright';
const url = 'https://joenasriani.github.io/danny-game/';
const errors = [];
const browser = await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
let result={url,kind:'16_LEVEL_RUNTIME_TRANSITION_TEST_NOT_PLAYTHROUGH',status:'FAIL',levelChecks:[],controls:{},errors};
try{
 const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/danny-game/',async route=>{
   const response=await route.fetch();
   const html=await response.text();
   const marker='      function initializeGame() {';
   if(!html.includes(marker))throw Error('Instrumentation insertion marker not found');
   const bridge=`
      window.__DANNY_QA_BRIDGE = {
        status:()=>({
          index:currentLevelIndex, level:LEVELS[currentLevelIndex]?.name,
          total:LEVELS.length, enemyCount:enemies.length, platformCount:platforms.length,
          stairCount:stairs.length, potionCount:potions.length,
          exits:doors.filter(d=>d.isExit).length,
          playerX:playerGroup.position.x, playerY:playerGroup.position.y,
          yaw:orbit.yaw,pitch:orbit.pitch,gameOver, introActive,levelBannerActive,
          audioUnlocked:audio.unlocked,attackTimer, onGround
        }),
        warp:(index)=>{currentLevelIndex=index;loadCurrentLevel(false);return currentLevelIndex},
        triggerExit:()=>{const exit=LEVELS[currentLevelIndex].exit;playerGroup.position.set(exit.x,exit.y,0);checkDoors();},
        restart:()=>restartGame()
      };
   `;
   await route.fulfill({response,body:html.replace(marker,bridge+marker),headers:{...response.headers(),'cache-control':'no-store'}});
 });
 await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
 await page.waitForFunction(()=>Boolean(window.__DANNY_QA_BRIDGE),null,{timeout:20000});
 await page.locator('#startButton').click();
 await page.waitForTimeout(1200);
 let s=await page.evaluate(()=>window.__DANNY_QA_BRIDGE.status());
 if(s.total!==16||s.index!==0)throw Error('Unexpected level count or initial level: '+JSON.stringify(s));
 const startX=s.playerX;
 await page.keyboard.down('ArrowRight');
 await page.waitForTimeout(280);
 await page.keyboard.up('ArrowRight');
 s=await page.evaluate(()=>window.__DANNY_QA_BRIDGE.status());
 result.controls.moveRight=s.playerX>startX+0.05;
 await page.evaluate(()=>window.__DANNY_QA_BRIDGE.restart());
 await page.waitForTimeout(1020);
 await page.keyboard.down('ArrowUp');
 await page.waitForTimeout(120);
 await page.keyboard.up('ArrowUp');
 s=await page.evaluate(()=>window.__DANNY_QA_BRIDGE.status());
 result.controls.jump=s.playerY>0.05;
 await page.keyboard.press('Space');
 await page.waitForTimeout(80);
 result.controls.combatNoException=errors.length===0;
 await page.evaluate(()=>window.__DANNY_QA_BRIDGE.restart());
 await page.waitForTimeout(1020);
 // Pointer drag verifies orbit sign independently from visual movement.
 const canvas=page.locator('canvas').first();
 const bounds=await canvas.boundingBox();
 const x=Math.round(bounds.x+bounds.width/2), y=Math.round(bounds.y+bounds.height/2);
 await page.mouse.move(x,y);await page.mouse.down();
 await page.mouse.move(x-90,y+40,{steps:5});
 await page.mouse.up();
 s=await page.evaluate(()=>window.__DANNY_QA_BRIDGE.status());
 result.controls.directManipulationCameraSigns=s.yaw>0.1&&s.pitch>0.1;
 for(let i=0;i<16;i++){
   await page.evaluate(i=>window.__DANNY_QA_BRIDGE.warp(i),i);
   const state=await page.evaluate(()=>window.__DANNY_QA_BRIDGE.status());
   const checks={
      correctLevel:state.index===i&&state.total===16,
      correctLevelName:state.level===('Level '+(i+1)),
      exitExists:state.exits===1,
      hasPlatforms:state.platformCount>0,
      enemiesMatchLevel:state.enemyCount===i+1,
      noGameOver:!state.gameOver
   };
   const passed=Object.values(checks).every(Boolean);
   result.levelChecks.push({level:i+1,passed,checks,objects:{enemies:state.enemyCount,platforms:state.platformCount,stairs:state.stairCount,potions:state.potionCount}});
 }
 // Controlled exit teleports test transitions 3→4→5 and final-victory event, not reachability.
 await page.evaluate(()=>window.__DANNY_QA_BRIDGE.warp(2));
 await page.evaluate(()=>window.__DANNY_QA_BRIDGE.triggerExit());
 result.controls.transition3to4=(await page.evaluate(()=>window.__DANNY_QA_BRIDGE.status())).index===3;
 await page.evaluate(()=>window.__DANNY_QA_BRIDGE.triggerExit());
 result.controls.transition4to5=(await page.evaluate(()=>window.__DANNY_QA_BRIDGE.status())).index===4;
 await page.evaluate(()=>window.__DANNY_QA_BRIDGE.warp(15));
 await page.evaluate(()=>window.__DANNY_QA_BRIDGE.triggerExit());
 const last=await page.evaluate(()=>window.__DANNY_QA_BRIDGE.status());
 result.controls.finalVictory=last.gameOver&&await page.locator('#msgText').textContent()==='VICTORY!';
 const ok=result.levelChecks.every(x=>x.passed)&&Object.values(result.controls).every(Boolean)&&errors.length===0;
 result.status=ok?'PASS':'FAIL';
 await context.close();
}catch(e){result.exception=String(e).slice(0,1200);}
finally{await browser.close();}
console.log(JSON.stringify(result,null,2));
if(result.status!=='PASS')process.exitCode=1;
