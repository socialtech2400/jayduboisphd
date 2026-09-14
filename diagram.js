/* Source: Jay's account of control, numbing, withdrawal and ARC, Chapters 1–3,
   6, 9, 11 and the epilogue. The schedule example is illustrative brand copy.
   Design follows the reviewed visual-explainer / Excalidraw principle that
   geometry must explain a relationship. Native SVG keeps this small and
   directly editable; no third-party code or image generation is involved. */
(() => {
  'use strict';
  const svg = document.getElementById('pattern');
  const panel = document.getElementById('diagram-panel');
  const reactionButton = document.getElementById('reaction-button');
  const arcButton = document.getElementById('arc-button');
  const caption = document.getElementById('diagram-caption');
  const themeButton = document.getElementById('theme-button');
  let mode = 'reaction';
  let lastNarrow;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
  const text = (x,y,value,cls='diagram-detail',anchor='middle') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${escape(value)}</text>`;
  const box = (x,y,w,h,cls) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${cls}"/>`;
  const path = (d,cls='wire',arrow=true) => `<path d="${d}" class="${cls}"${arrow?' marker-end="url(#'+(cls.includes('active')?'active-arrow':'arrow')+')"':''}/>`;
  const defs = '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 L8 5 L1 9" fill="none" stroke="var(--wire)" stroke-width="1.5"/></marker><marker id="active-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 L8 5 L1 9" fill="none" stroke="var(--accent)" stroke-width="1.5"/></marker></defs>';

  function reactionDesktop() {
    return box(145,22,370,77,'source-box')+
      text(330,47,'WHAT HAPPENS','diagram-label')+text(330,77,'The parenting schedule changes.','diagram-action')+
      path('M330 100 V156')+text(349,131,'you read it as','diagram-small','start')+
      box(210,166,240,82,'interpret-box')+text(330,194,'WHAT IT MEANS TO YOU','diagram-label')+text(330,227,'“I don’t count.”','diagram-main diagram-accent')+
      path('M330 249 V275', 'wire', false)+
      path('M330 275 H105 V321')+path('M330 275 V321')+path('M330 275 H555 V321')+
      text(105,352,'CONTROL','diagram-action')+text(105,380,'Force an answer.')+
      text(330,352,'NUMBING','diagram-action')+text(330,380,'Avoid the feeling.')+
      text(555,352,'WITHDRAWAL','diagram-action')+text(555,380,'End the conversation.')+
      path('M105 397 V431 H330','wire',false)+path('M555 397 V431 H330','wire',false)+path('M330 397 V470')+
      text(330,501,'The practical issue stays unresolved.','diagram-detail')+
      path('M148 494 H31 V205 H198','wire wire-dashed')+
      text(31,554,'More tension for the next conversation.','diagram-small','start');
  }

  function reactionMobile() {
    return box(21,18,318,76,'source-box')+
      text(180,43,'WHAT HAPPENS','diagram-label')+text(180,71,'The parenting schedule changes.','diagram-action')+
      path('M180 95 V146')+text(195,125,'you read it as','diagram-small','start')+
      box(67,156,226,80,'interpret-box')+text(180,184,'WHAT IT MEANS TO YOU','diagram-label')+text(180,215,'“I don’t count.”','diagram-main diagram-accent')+
      path('M180 237 V255 H46 V478','wire',false)+
      path('M46 299 H83')+path('M46 387 H83')+path('M46 475 H83')+
      text(102,292,'CONTROL','diagram-action','start')+text(102,317,'Force an answer.','diagram-detail','start')+
      text(102,380,'NUMBING','diagram-action','start')+text(102,405,'Avoid the feeling.','diagram-detail','start')+
      text(102,468,'WITHDRAWAL','diagram-action','start')+text(102,493,'End the conversation.','diagram-detail','start')+
      path('M309 296 H325 V538 H180 V562')+path('M306 384 H325','wire',false)+path('M309 472 H325','wire',false)+
      text(180,589,'The practical issue','diagram-detail')+text(180,613,'stays unresolved.','diagram-detail')+
      path('M66 587 H8 V195 H55','wire wire-dashed')+
      text(180,658,'More tension next time.','diagram-small');
  }

  function arcDesktop() {
    return box(145,22,370,77,'source-box')+text(330,47,'THE SAME SITUATION','diagram-label')+text(330,77,'The parenting schedule changes.','diagram-action')+
      path('M330 100 V144','wire-active')+
      text(111,184,'A','stage-letter')+text(154,171,'AWARE','diagram-label','start')+
      text(154,203,'Notice the interpretation.','diagram-action','start')+text(154,230,'“A changed plan isn’t a verdict on my worth.”','diagram-detail','start')+
      path('M330 247 V279','wire-active')+
      text(111,314,'R','stage-letter')+text(154,301,'RELEASE','diagram-label','start')+
      text(154,333,'Pause before replying.','diagram-action','start')+text(154,360,'Breathe. Give the reaction time to settle.','diagram-detail','start')+
      path('M330 377 V409','wire-active')+
      text(111,444,'C','stage-letter')+text(154,431,'CHOOSE & COMMIT','diagram-label','start')+
      text(154,463,'Clarify the plan. State your boundary.','diagram-action','start')+text(154,490,'Then follow through on what you agreed.','diagram-detail','start')+
      path('M562 467 H617 V184 H553','wire wire-dashed')+text(330,545,'Return to the practice when pressure returns.','diagram-small');
  }

  function arcMobile() {
    return box(21,18,318,76,'source-box')+text(180,43,'THE SAME SITUATION','diagram-label')+text(180,71,'The parenting schedule changes.','diagram-action')+
      path('M180 95 V140','wire-active')+
      text(38,174,'A','stage-letter')+text(72,163,'AWARE','diagram-label','start')+
      text(72,193,'Notice the interpretation.','diagram-action','start')+text(72,220,'“A changed plan isn’t a verdict','diagram-detail','start')+text(72,244,'on my worth.”','diagram-detail','start')+
      path('M180 263 V297','wire-active')+
      text(38,333,'R','stage-letter')+text(72,322,'RELEASE','diagram-label','start')+
      text(72,352,'Pause before replying.','diagram-action','start')+text(72,379,'Breathe. Give the reaction','diagram-detail','start')+text(72,403,'time to settle.','diagram-detail','start')+
      path('M180 422 V456','wire-active')+
      text(38,491,'C','stage-letter')+text(72,480,'CHOOSE & COMMIT','diagram-label','start')+
      text(72,510,'Clarify the plan.','diagram-action','start')+text(72,537,'State your boundary.','diagram-action','start')+text(72,565,'Then follow through on','diagram-detail','start')+text(72,589,'what you agreed.','diagram-detail','start')+
      path('M309 541 H347 V173 H317','wire wire-dashed')+text(180,652,'Practice again when pressure returns.','diagram-small');
  }

  function render() {
    const narrow = panel.clientWidth < 510;
    lastNarrow=narrow;
    svg.setAttribute('viewBox',narrow?'0 0 360 690':'0 0 660 570');
    const title=mode==='reaction'?'How a schedule change can become a reaction about worth':'ARC creates room to choose a response to the same schedule change';
    const desc=mode==='reaction'?'The parenting schedule changes. You interpret it as I do not count. Three possible reactions branch from that interpretation: control, forcing an answer; numbing, avoiding the feeling; withdrawal, ending the conversation. These can leave the practical issue unresolved, feeding more tension into the next conversation.':'The same parenting-schedule change. Aware: notice the interpretation that the change is a verdict on your worth. Release: pause, breathe, give the reaction time to settle. Choose and Commit: clarify the plan, state your boundary, and follow through. Return to this practice when pressure returns.';
    svg.innerHTML=`<title id="pattern-title">${escape(title)}</title><desc id="pattern-desc">${escape(desc)}</desc>`+defs+(mode==='reaction'?(narrow?reactionMobile():reactionDesktop()):(narrow?arcMobile():arcDesktop()));
  }
  function setMode(next) {
    mode=next;
    reactionButton.classList.toggle('active',mode==='reaction');
    arcButton.classList.toggle('active',mode==='arc');
    reactionButton.setAttribute('aria-pressed',String(mode==='reaction'));
    arcButton.setAttribute('aria-pressed',String(mode==='arc'));
    caption.textContent=mode==='reaction'?'The schedule still needs sorting out.':'Address the plan without arguing for your worth.';
    render();
  }
  reactionButton.addEventListener('click',()=>setMode('reaction'));
  arcButton.addEventListener('click',()=>setMode('arc'));
  new ResizeObserver(()=>{if((panel.clientWidth<510)!==lastNarrow)render();}).observe(panel);
  function syncTheme(dark) {
    document.documentElement.classList.toggle('dark',dark);
    themeButton.setAttribute('aria-pressed',String(dark));
    themeButton.textContent=dark?'Light appearance':'Dark appearance';
  }
  let saved;
  try{saved=localStorage.getItem('jay-v2-theme');}catch{}
  syncTheme(saved?saved==='dark':matchMedia('(prefers-color-scheme: dark)').matches);
  themeButton.addEventListener('click',()=>{
    const dark=!document.documentElement.classList.contains('dark');syncTheme(dark);
    try{localStorage.setItem('jay-v2-theme',dark?'dark':'light');}catch{}
  });
  render();
})();
