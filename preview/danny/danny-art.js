/* Danny | Living Sketch Level 1 | canonical artwork puppet
 * Source image is the founder-locked original PNG, never a replacement.
 * Body pieces are cut from the original central hero pose at runtime.
 * Visuals only. All player motion, collision, timing and combat remain owned by index.html.
 */
(function (root) {
  "use strict";
  const CROP = { x: 385, y: 160, w: 590, h: 890 };
  const REF = "../../docs/character/reference/DANNY_CANONICAL_CHARACTER_SHEET.png";
  const SHAPES = Object.freeze({
    cape: { pivot: [274, 302], pts: [[18,348],[35,311],[93,257],[175,237],[237,250],[285,272],[362,284],[347,315],[263,375],[130,388],[62,373]] },
    rearLeg: { pivot: [278, 551], pts: [[221,521],[340,511],[350,570],[329,625],[319,678],[302,711],[295,775],[283,836],[257,866],[88,878],[95,829],[155,789],[182,717],[171,659],[182,614]] },
    frontLeg: { pivot: [386, 551], pts: [[321,509],[430,513],[492,611],[478,675],[494,734],[529,786],[588,817],[590,888],[431,882],[396,859],[378,796],[356,718],[336,644]] },
    rearArm: { pivot: [265, 337], pts: [[234,310],[304,331],[302,385],[276,436],[240,489],[216,526],[201,568],[167,598],[119,591],[126,545],[156,476],[191,394]] },
    torso: { pivot: [344, 379], pts: [[277,255],[343,262],[411,275],[448,320],[446,383],[439,439],[483,506],[450,550],[404,574],[345,560],[304,554],[226,569],[210,503],[220,433],[220,356]] },
    pouch: { pivot: [444, 472], pts: [[411,432],[451,438],[474,473],[497,500],[494,567],[438,595],[404,577],[389,526]] },
    frontArm: { pivot: [429, 339], pts: [[391,287],[456,305],[494,349],[529,392],[522,448],[487,490],[455,517],[400,529],[379,505],[403,471],[432,422],[406,380]] },
    sword: { pivot: [166, 564], pts: [[139,527],[191,517],[217,562],[194,610],[172,644],[132,707],[86,784],[40,808],[60,730],[104,638],[125,581]] },
    head: { pivot: [344, 250], pts: [[208,45],[262,19],[359,10],[427,33],[462,60],[488,120],[490,176],[459,231],[431,269],[385,300],[304,295],[244,278],[198,245],[177,172],[182,98]] }
  });
  const clone = (a) => JSON.parse(JSON.stringify(a));
  const exposed = Object.freeze({
    source: REF, crop: CROP, parts: Object.keys(SHAPES),
    states: ["idle", "run", "jump", "fall", "attack", "block", "hit"],
    pivots: Object.fromEntries(Object.entries(SHAPES).map(([k, v]) => [k, clone(v.pivot)]))
  });
  function getPose(state, t, attackTimer) {
    const a = Math.sin(t * 0.39), b = Math.cos(t * 0.39);
    const moving = state === "run";
    const air = state === "jump" || state === "fall";
    const striking = state === "attack";
    const blocking = state === "block";
    const hurt = state === "hit";
    const swing = striking ? Math.max(0, Math.min(1, (8 - attackTimer) / 7)) : 0;
    return {
      body: moving ? Math.abs(a) * 5 : Math.sin(t * 0.09) * 2,
      tilt: moving ? -0.032 : air ? -0.06 : hurt ? 0.16 : 0,
      angles: {
        cape: moving ? 0.11 + Math.sin(t * 0.45) * 0.17 : air ? 0.22 : hurt ? 0.29 : Math.sin(t * 0.11) * 0.035,
        rearLeg: moving ? a * 0.64 : air ? -0.52 : blocking ? 0.17 : hurt ? -0.18 : Math.sin(t * 0.13) * 0.024,
        frontLeg: moving ? -a * 0.64 : air ? 0.50 : blocking ? -0.22 : hurt ? 0.18 : -Math.sin(t * 0.13) * 0.024,
        rearArm: moving ? -a * 0.42 : air ? -0.48 : striking ? -0.08 - Math.sin(swing * Math.PI) * 0.75 : blocking ? -0.45 : hurt ? 0.42 : 0,
        frontArm: moving ? a * 0.37 : air ? 0.30 : striking ? 0.18 + Math.sin(swing * Math.PI) * 0.35 : blocking ? -0.72 : hurt ? -0.37 : 0,
        torso: 0,
        pouch: moving ? Math.sin(t * 0.39) * 0.08 : 0,
        sword: striking ? -2.1 * swing : blocking ? -1.22 : air ? -0.38 : moving ? Math.sin(t * 0.39) * 0.10 : 0,
        head: moving ? 0.035 * b : hurt ? -0.20 : air ? 0.07 : Math.sin(t * 0.09) * 0.012
      }
    };
  }
  function createLayer(img, name) {
    const data = SHAPES[name];
    const bounds = data.pts.reduce((b, p) => [
      Math.min(b[0], p[0]), Math.min(b[1], p[1]),
      Math.max(b[2], p[0]), Math.max(b[3], p[1])
    ], [Infinity, Infinity, -Infinity, -Infinity]);
    const left = Math.floor(Math.max(0, bounds[0] - 5));
    const top = Math.floor(Math.max(0, bounds[1] - 5));
    const w = Math.min(CROP.w - left, Math.ceil(bounds[2] - left + 5));
    const h = Math.min(CROP.h - top, Math.ceil(bounds[3] - top + 5));
    const cv = document.createElement("canvas");
    cv.width = w; cv.height = h;
    const c = cv.getContext("2d");
    c.beginPath();
    data.pts.forEach(([x, y], i) => i ? c.lineTo(x - left, y - top) : c.moveTo(x - left, y - top));
    c.closePath(); c.clip();
    c.drawImage(img, -CROP.x - left, -CROP.y - top);
    return { canvas: cv, x: left, y: top, pivot: data.pivot };
  }
  function make(THREE, playerGroup, stickParts, opts = {}) {
    const output = document.createElement("canvas");
    output.width = 512;
    output.height = 768;
    const ctx = output.getContext("2d", { alpha: true });
    const texture = new THREE.CanvasTexture(output);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    const mat = new THREE.MeshBasicMaterial({
      map: texture, transparent: true, depthWrite: false,
      side: THREE.DoubleSide, alphaTest: 0.025
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.64, 2.25), mat);
    mesh.name = "DannyOriginalSketchRig";
    mesh.position.set(0, 1.115, 0.105);
    mesh.renderOrder = 50;
    playerGroup.add(mesh);
    let parts = null, loaded = false, failed = false, tick = 0;
    const original = new Image();
    original.decoding = "async";
    original.onload = () => {
      if (original.naturalWidth !== 1448 || original.naturalHeight !== 1086) {
        failed = true; console.error("[Danny puppet] unexpected canonical PNG dimensions"); return;
      }
      parts = Object.fromEntries(Object.keys(SHAPES).map((name) => [name, createLayer(original, name)]));
      loaded = true;
      stickParts.visible = false;
    };
    original.onerror = () => { failed = true; console.error("[Danny puppet] canonical PNG unavailable"); };
    original.src = opts.artURL || REF;
    function drawPart(name, angle, bodyOffset) {
      const p = parts[name];
      ctx.save();
      ctx.translate(p.pivot[0], p.pivot[1] + bodyOffset);
      ctx.rotate(angle);
      ctx.drawImage(p.canvas, p.x - p.pivot[0], p.y - p.pivot[1]);
      ctx.restore();
    }
    // Kinematic sword attachment: the blade grip follows the actual wrist when
    // the sword arm rotates, instead of orbiting around a fixed world point.
    function drawLinkedSword(armAngle, weaponAngle, bodyOffset) {
      const p = parts.sword;
      const sh = SHAPES.rearArm.pivot, wr = SHAPES.sword.pivot;
      const dx = wr[0] - sh[0], dy = wr[1] - sh[1];
      const cx = Math.cos(armAngle), sx = Math.sin(armAngle);
      const wristX = sh[0] + dx * cx - dy * sx;
      const wristY = sh[1] + dx * sx + dy * cx;
      ctx.save();
      ctx.translate(wristX, wristY + bodyOffset);
      ctx.rotate(armAngle + weaponAngle);
      ctx.drawImage(p.canvas, p.x - wr[0], p.y - wr[1]);
      ctx.restore();
    }
    function update(info = {}) {
      if (!loaded || failed) return;
      tick++;
      if (tick % 2) return;
      const state = info.demoState || info.state || "idle";
      const pose = getPose(state, info.frame || tick, info.attackTimer || 0);
      const fac = info.facing === -1 ? -1 : 1;
      ctx.clearRect(0, 0, output.width, output.height);
      ctx.save();
      ctx.scale(output.width / CROP.w, output.height / CROP.h);
      ctx.translate(CROP.w / 2, CROP.h / 2);
      ctx.scale(fac, 1);
      ctx.translate(-CROP.w / 2, -CROP.h / 2);
      ctx.translate(320, 440);
      ctx.rotate(pose.tilt);
      ctx.translate(-320, -440);
      drawPart("rearLeg", pose.angles.rearLeg, 0);
      drawPart("frontLeg", pose.angles.frontLeg, 0);
      drawPart("cape", pose.angles.cape, pose.body);
      drawPart("rearArm", pose.angles.rearArm, pose.body);
      drawPart("torso", 0, pose.body);
      drawPart("pouch", pose.angles.pouch, pose.body);
      drawPart("frontArm", pose.angles.frontArm, pose.body);
      drawLinkedSword(pose.angles.rearArm, pose.angles.sword, pose.body);
      drawPart("head", pose.angles.head, pose.body);
      ctx.restore();
      texture.needsUpdate = true;
    }
    return {
      update, mesh, model: exposed,
      get loaded() { return loaded; },
      get failed() { return failed; },
      dispose() { playerGroup.remove(mesh); mat.dispose(); texture.dispose(); mesh.geometry.dispose(); }
    };
  }
  root.DannyCharacter = Object.freeze({ make, model: exposed, poseFor: getPose });
})(window);
