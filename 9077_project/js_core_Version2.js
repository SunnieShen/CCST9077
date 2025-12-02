// core.js — CHSH 量子模型与统计核心
// 说明：提供 singlet 联合分布、采样、理论 E/S 计算等函数

// util random
function rand() { return Math.random(); }

// convert degrees to radians
function deg2rad(d){ return d * Math.PI / 180.0; }

// Singlet joint probability P(sA,sB) for measurement angles thetaA, thetaB (radians)
// sA, sB ∈ {+1, -1}
function singletJoint(thetaA, thetaB) {
  const delta = thetaA - thetaB;
  const c = Math.cos(delta);
  const joint = {};
  [1, -1].forEach(sA => {
    joint[sA] = {};
    [1, -1].forEach(sB => {
      joint[sA][sB] = 0.25 * (1 - sA * sB * c);
    });
  });
  return joint;
}

// sample pair (sA, sB) from joint distribution
function sampleFromJoint(joint) {
  const entries = [];
  let cum = 0;
  [1, -1].forEach(sA=>{
    [1, -1].forEach(sB=>{
      const p = joint[sA][sB] || 0;
      cum += p;
      entries.push({sA, sB, cum, p});
    });
  });
  const u = rand() * cum;
  for (let e of entries) if (u <= e.cum) return {sA: e.sA, sB: e.sB};
  const last = entries[entries.length-1];
  return {sA: last.sA, sB: last.sB};
}

// theoretical win probability for given angle maps (array length 2 each)
function theoreticalWinProb(anglesA, anglesB) {
  let pWin = 0;
  for (let x=0;x<=1;x++){
    for (let y=0;y<=1;y++){
      const joint = singletJoint(anglesA[x], anglesB[y]);
      let p=0;
      [1,-1].forEach(sA=>{
        [1,-1].forEach(sB=>{
          const a = (1 - sA)/2;
          const b = (1 - sB)/2;
          const win = ((a ^ b) === (x & y)) ? 1 : 0;
          p += joint[sA][sB] * win;
        });
      });
      pWin += 0.25 * p;
    }
  }
  return pWin;
}

// compute theoretical E_xy and S
function theoreticalS(anglesA, anglesB) {
  const E = {};
  for (let x=0;x<=1;x++){
    for (let y=0;y<=1;y++){
      const joint = singletJoint(anglesA[x], anglesB[y]);
      let val = 0;
      [1,-1].forEach(sA=>{
        [1,-1].forEach(sB=>{
          val += sA * sB * joint[sA][sB];
        });
      });
      E[`${x}${y}`] = val;
    }
  }
  const S = E['00'] + E['01'] + E['10'] - E['11'];
  return {E, S};
}

// Expose functions
window.CHSHCore = {
  singletJoint, sampleFromJoint, theoreticalWinProb, theoreticalS, deg2rad
};