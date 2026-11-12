import { chromium } from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('qa-output/danny-states',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const tests=[];
try{
 const page=await browser.newPage({viewport:{width:1150,height:850},deviceScaleFactor:1});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/preview/danny/character-lab.html',{waitUntil:'domcontentloaded',timeout:35000});
 await page.waitForFunction(()=>window.DannyLab?.puppet?.loaded===true,null,{timeout:20000});
 for(const state of ['idle','run','jump','attack','block','hit']){
  await page.locator('[data-state="'+state+'"]').click();
  await page.waitForTimeout(400);
  const info=await page.evaluate(()=>({state:window.DannyLab.state,tick:window.DannyLab.tick,loaded:window.DannyLab.puppet.loaded,texture:window.DannyLab.puppet.mesh.material.map.image.width,visible:window.DannyLab.puppet.mesh.visible}));
  const passed=info.state===state&&info.loaded&&info.tick>2&&info.texture===512&&info.visible;
  tests.push({state,passed,info});
  await page.screenshot({path:'qa-output/danny-states/'+state+'.png'});
 }
 await page.close();
 if(errors.length)tests.push({errors,passed:false});
}finally{await browser.close();}
console.log(JSON.stringify({test:'real Chromium character rig and six visual states',tests},null,2));
if(tests.some(t=>!t.passed))process.exitCode=1;