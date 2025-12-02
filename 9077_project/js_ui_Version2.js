// ui.js — 交互与动画，依赖 core.js (CHSHCore)
(function(){
  // DOM
  const strategySel = document.getElementById('strategy');
  const customPanel = document.getElementById('customPanel');
  const runBtn = document.getElementById('runBtn');
  const stepBtn = document.getElementById('stepBtn');
  const resetBtn = document.getElementById('resetBtn');
  const trialsInput = document.getElementById('trials');

  const totalEl = document.getElementById('total');
  const winsEl = document.getElementById('wins');
  const winrateEl = document.getElementById('winrate');
  const Sval = document.getElementById('Sval');

  const n00 = document.getElementById('n00'), n01 = document.getElementById('n01'), n10 = document.getElementById('n10'), n11 = document.getElementById('n11');
  const w00 = document.getElementById('w00'), w01 = document.getElementById('w01'), w10 = document.getElementById('w10'), w11 = document.getElementById('w11');
  const p00 = document.getElementById('p00'), p01 = document.getElementById('p01'), p10 = document.getElementById('p10'), p11 = document.getElementById('p11');

  const a0angleInput = document.getElementById('a0angle'), a1angleInput = document.getElementById('a1angle');
  const b0angleInput = document.getElementById('b0angle'), b1angleInput = document.getElementById('b1angle');

  const aliceAngleLabel = document.getElementById('aliceAngleLabel');
  const bobAngleLabel = document.getElementById('bobAngleLabel');

  // Canvas for animation
  const canvas = document.getElementById('animCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const midX = W/2;

  // stats
  let stats = resetStatsObj();

  function resetStatsObj(){ return {
    total:0, wins:0,
    n00:0,n01:0,n10:0,n11:0,
    w00:0,w01:0,w10:0,w11:0,
    sumE00:0,sumE01:0,sumE10:0,sumE11:0
  };}

  function refreshUI(){
    totalEl.textContent = stats.total;
    winsEl.textContent = stats.wins;
    winrateEl.textContent = stats.total ? ((stats.wins/stats.total*100).toFixed(3)+'%') : '—';

    n00.textContent = stats.n00; n01.textContent = stats.n01; n10.textContent = stats.n10; n11.textContent = stats.n11;
    w00.textContent = stats.w00; w01.textContent = stats.w01; w10.textContent = stats.w10; w11.textContent = stats.w11;
    p00.textContent = stats.n00? ((stats.w00/stats.n00*100).toFixed(2)+'%') : '—';
    p01.textContent = stats.n01? ((stats.w01/stats.n01*100).toFixed(2)+'%') : '—';
    p10.textContent = stats.n10? ((stats.w10/stats.n10*100).toFixed(2)+'%') : '—';
    p11.textContent = stats.n11? ((stats.w11/stats.n11*100).toFixed(2)+'%') : '—';

    const E00v = stats.n00? stats.sumE00/stats.n00 : 0;
    const E01v = stats.n01? stats.sumE01/stats.n01 : 0;
    const E10v = stats.n10? stats.sumE10/stats.n10 : 0;
    const E11v = stats.n11? stats.sumE11/stats.n11 : 0;
    const S = (E00v + E01v + E10v - E11v);
    Sval.textContent = stats.total ? S.toFixed(4) : '—';
  }

  strategySel.addEventListener('change', ()=>{
    customPanel.classList.toggle('hidden', strategySel.value !== 'custom');
  });

  // get custom deterministic choices
  function getCustomDeterministic(){
    const a0 = +document.querySelector('input[name="a0"]:checked').value;
    const a1 = +document.querySelector('input[name="a1"]:checked').value;
    const b0 = +document.querySelector('input[name="b0"]:checked').value;
    const b1 = +document.querySelector('input[name="b1"]:checked').value;
    return {a:[a0,a1], b:[b0,b1]};
  }

  // Animate a photon pair travelling outward and measured — simple visual
  function animatePair(sA, sB, cb){
    const startY = H/2;
    const leftTargetX = 80, rightTargetX = W - 80;
    const radius = 8;
    let t = 0, dur = 700; // ms
    const start = performance.now();
    function frame(now){
      t = now - start;
      const p = Math.min(1, t/dur);
      ctx.clearRect(0,0,W,H);
      // draw middle source
      ctx.fillStyle = '#222';
      ctx.beginPath(); ctx.arc(midX, startY, 6,0,Math.PI*2); ctx.fill();
      // left photon travels to leftTargetX
      const lx = midX + (leftTargetX - midX) * p;
      const rx = midX + (rightTargetX - midX) * p;
      // left color based on sA (+1 green, -1 orange)
      ctx.fillStyle = sA===1 ? '#1b9e77' : '#d95f02';
      ctx.beginPath(); ctx.arc(lx, startY - 30, radius,0,Math.PI*2); ctx.fill();
      // right
      ctx.fillStyle = sB===1 ? '#1b9e77' : '#d95f02';
      ctx.beginPath(); ctx.arc(rx, startY + 30, radius,0,Math.PI*2); ctx.fill();

      // draw station boxes
      ctx.fillStyle = '#f4f9ff';
      ctx.strokeStyle = '#dfefff';
      ctx.fillRect(20, startY-80, 120, 160);
      ctx.strokeRect(20, startY-80, 120, 160);
      ctx.fillRect(W-140, startY-80, 120, 160);
      ctx.strokeRect(W-140, startY-80, 120, 160);

      if (p < 1) requestAnimationFrame(frame);
      else {
        // show measured bit near station
        ctx.font = 'bold 20px sans-serif';
        ctx.fillStyle = '#111';
        ctx.fillText('Alice: ' + ((1 - sA)/2), 30, startY - 88);
        ctx.fillText('Bob: ' + ((1 - sB)/2), W-138, startY + 108);
        // small pause then callback
        setTimeout(()=>{ if (cb) cb(); }, 300);
      }
    }
    requestAnimationFrame(frame);
  }

  // run single round following currently selected strategy
  function runRound(strategy){
    const x = Math.random() < 0.5 ? 0 : 1;
    const y = Math.random() < 0.5 ? 0 : 1;

    let aBit, bBit, sA, sB;

    if (strategy === 'classical_best'){
      aBit = 0; bBit = 0; sA = 1 - 2*aBit; sB = 1 - 2*bBit;
    } else if (strategy === 'random'){
      aBit = Math.random() < 0.5 ? 0 : 1;
      bBit = Math.random() < 0.5 ? 0 : 1;
      sA = 1 - 2*aBit; sB = 1 - 2*bBit;
    } else if (strategy === 'custom'){
      const det = getCustomDeterministic();
      aBit = det.a[x]; bBit = det.b[y];
      sA = 1 - 2*aBit; sB = 1 - 2*bBit;
    } else if (strategy === 'quantum'){
      const anglesA = [deg2rad(+a0angleInput.value), deg2rad(+a1angleInput.value)];
      const anglesB = [deg2rad(+b0angleInput.value), deg2rad(+b1angleInput.value)];
      const joint = CHSHCore.singletJoint(anglesA[x], anglesB[y]);
      const sample = CHSHCore.sampleFromJoint(joint);
      sA = sample.sA; sB = sample.sB;
      aBit = (1 - sA) / 2; bBit = (1 - sB) / 2;
    } else {
      aBit = 0; bBit = 0; sA = 1; sB = 1;
    }

    const win = ((aBit ^ bBit) === (x & y)) ? 1 : 0;

    // update stats
    stats.total += 1;
    stats.wins += win;
    if (x===0 && y===0){ stats.n00++; stats.w00 += win; stats.sumE00 += sA*sB; }
    if (x===0 && y===1){ stats.n01++; stats.w01 += win; stats.sumE01 += sA*sB; }
    if (x===1 && y===0){ stats.n10++; stats.w10 += win; stats.sumE10 += sA*sB; }
    if (x===1 && y===1){ stats.n11++; stats.w11 += win; stats.sumE11 += sA*sB; }

    // animate then refresh UI
    animatePair(sA, sB, refreshUI);
  }

  // batch-run (non-blocking)
  async function runBatch(strategy, trials){
    const batch = 200;
    let done = 0;
    runBtn.disabled = true;
    while (done < trials){
      const toRun = Math.min(batch, trials - done);
      for (let i=0;i<toRun;i++){
        // for speed, for non-quantum strategies we can skip animation; but to keep visual, animate every N-th
        if (strategy === 'quantum' || (stats.total % 40 === 0)) {
          await new Promise(resolve => {
            runRound(strategy);
            // rely on animatePair callback to call refreshUI; add small delay to keep UI smooth
            setTimeout(resolve, 40);
          });
        } else {
          // fast update without animation
          simulateSilentRound(strategy);
        }
      }
      done += toRun;
      refreshUI();
      await new Promise(r=>setTimeout(r, 10));
    }
    runBtn.disabled = false;
  }

  // silent round (no animation) for speed
  function simulateSilentRound(strategy){
    const x = Math.random() < 0.5 ? 0 : 1;
    const y = Math.random() < 0.5 ? 0 : 1;
    let aBit,bBit,sA,sB;
    if (strategy === 'classical_best'){ aBit=0;bBit=0;sA=1;sB=1; }
    else if (strategy === 'random'){ aBit = Math.random()<0.5?0:1; bBit = Math.random()<0.5?0:1; sA=1-2*aBit; sB=1-2*bBit; }
    else if (strategy === 'custom'){ const det = getCustomDeterministic(); aBit=det.a[x]; bBit=det.b[y]; sA=1-2*aBit; sB=1-2*bBit; }
    else if (strategy === 'quantum'){ const anglesA=[deg2rad(+a0angleInput.value),deg2rad(+a1angleInput.value)]; const anglesB=[deg2rad(+b0angleInput.value),deg2rad(+b1angleInput.value)]; const joint = CHSHCore.singletJoint(anglesA[x], anglesB[y]); const sample = CHSHCore.sampleFromJoint(joint); sA=sample.sA; sB=sample.sB; aBit=(1-sA)/2; bBit=(1-sB)/2; }
    else { aBit=0;bBit=0;sA=1;sB=1; }
    const win = ((aBit ^ bBit) === (x & y)) ? 1 : 0;
    stats.total += 1; stats.wins += win;
    if (x===0 && y===0){ stats.n00++; stats.w00 += win; stats.sumE00 += sA*sB; }
    if (x===0 && y===1){ stats.n01++; stats.w01 += win; stats.sumE01 += sA*sB; }
    if (x===1 && y===0){ stats.n10++; stats.w10 += win; stats.sumE10 += sA*sB; }
    if (x===1 && y===1){ stats.n11++; stats.w11 += win; stats.sumE11 += sA*sB; }
  }

  // events
  runBtn.addEventListener('click', ()=>{
    const trials = Math.max(1, Math.floor(+trialsInput.value || 1000));
    runBatch(strategySel.value, trials);
  });

  stepBtn.addEventListener('click', ()=>{ runRound(strategySel.value); });

  resetBtn.addEventListener('click', ()=>{
    stats = resetStatsObj();
    ctx.clearRect(0,0,W,H);
    refreshUI();
  });

  // show angles labels update
  function updateAngleLabels(){
    aliceAngleLabel.textContent = `A: ${a0angleInput.value}°, ${a1angleInput.value}°`;
    bobAngleLabel.textContent = `B: ${b0angleInput.value}°, ${b1angleInput.value}°`;
  }
  [a0angleInput,a1angleInput,b0angleInput,b1angleInput].forEach(inp=>{
    inp.addEventListener('input', updateAngleLabels);
  });
  updateAngleLabels();

  // initialize with theoretical note appended
  (function init(){
    // compute theoretical quantum values with defaults
    const anglesA = [deg2rad(+a0angleInput.value), deg2rad(+a1angleInput.value)];
    const anglesB = [deg2rad(+b0angleInput.value), deg2rad(+b1angleInput.value)];
    const tw = CHSHCore.theoreticalWinProb(anglesA, anglesB);
    const ts = CHSHCore.theoreticalS(anglesA, anglesB);
    const note = document.createElement('div');
    note.className = 'muted';
    note.style.marginTop = '8px';
    note.textContent = `参考（量子最优角度）：理论胜率=${(tw*100).toFixed(4)}%，S=${ts.S.toFixed(6)}。`;
    document.querySelector('.controls .card')?.appendChild(note);
    refreshUI();
  })();

})();