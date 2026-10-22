(() => {
  const KEY='bwn-cookie-preferences', DENY='bwn-analytics-denied', MARK='|bwn-analytics-denied|', ID='G-HXM22WWPKP';
  function denied(){
    if(window.__bwnDenied)return true;
    try{if(sessionStorage.getItem(DENY)==='1')return true;}catch{return true;}
    try{return window.name.includes(MARK);}catch{return true;}
  }
  function markDeny(){
    window.__bwnDenied=true;window['ga-disable-'+ID]=true;let retained=false;
    try{sessionStorage.setItem(DENY,'1');retained=sessionStorage.getItem(DENY)==='1';}catch{}
    try{window.name=window.name.split(MARK).join('')+MARK;retained=window.name.includes(MARK)||retained;}catch{}
    return retained;
  }
  function clearDeny(){
    // Verify this tab's refusal is clear before publishing a shared grant.
    sessionStorage.removeItem(DENY);
    if(sessionStorage.getItem(DENY)==='1')throw Error('Session refusal remains');
    window.name=window.name.split(MARK).join('');
    if(window.name.includes(MARK))throw Error('Tab refusal remains');
  }
  function read(){
    if(denied())return null;
    try{
      const saved=JSON.parse(localStorage.getItem(KEY)||'null');
      localStorage.setItem(KEY+'-write-check','1');localStorage.removeItem(KEY+'-write-check');
      return saved && typeof saved.analytics==='boolean'?saved:null;
    }catch{return null;}
  }
  function apply(grant){
    window['ga-disable-'+ID]=!grant;
    if(!grant){window.gtag?.('consent','update',{analytics_storage:'denied'});return;}
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    if(document.getElementById('bwn-ga4')){window.gtag('consent','update',{analytics_storage:'granted'});return;}
    window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent','update',{analytics_storage:'granted'});
    const script=document.createElement('script');script.id='bwn-ga4';script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(script);
    window.gtag('js',new Date());window.gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false});
  }
  const checkbox=document.getElementById('analytics'),status=document.getElementById('cookie-status');
  let retainedDenial=false,effective=false;
  function refresh(){effective=read()?.analytics===true;apply(effective);if(checkbox)checkbox.checked=effective;}
  function save(analytics){
    analytics=analytics===true;
    if(!analytics){retainedDenial=markDeny();apply(false);}
    try{
      if(analytics){clearDeny();localStorage.getItem(KEY);localStorage.setItem(KEY+'-write-check','1');localStorage.removeItem(KEY+'-write-check');}
      localStorage.setItem(KEY,JSON.stringify({analytics}));
      if(analytics)window.__bwnDenied=false;
      refresh();return true;
    }catch{retainedDenial=markDeny();refresh();return false;}
  }
  window.bwnConsent={read,save};
  refresh();
  function choose(value){
    const stored=save(value);
    if(status)status.textContent=stored
      ?effective?'Google Analytics dibenarkan dalam pelayar ini.':value?'Pilihan disimpan, tetapi storan tidak dapat disahkan. Google Analytics kekal tidak aktif dalam tab ini.':'Google Analytics ditolak dalam pelayar ini.'
      :retainedDenial?'Google Analytics dimatikan dalam tab ini dan penolakan dikekalkan semasa navigasi laman serta muat semula. Pilihan kekal tidak dapat disimpan; tab lain mungkin masih menyimpan kebenaran lama. Padam data laman melalui tetapan pelayar.'
      :'Google Analytics dimatikan pada halaman ini. Penolakan tidak dapat dikekalkan semasa navigasi atau muat semula. Padam data laman melalui tetapan pelayar untuk membuang kebenaran lama.';
  }
  document.getElementById('save-cookie')?.addEventListener('click',()=>choose(checkbox?.checked===true));
  document.getElementById('reject-cookie')?.addEventListener('click',()=>choose(false));
  window.addEventListener('storage',event=>{
    if(event.key!==KEY&&event.key!==null)return;
    let grant=false;try{grant=JSON.parse(event.newValue||'null')?.analytics===true;}catch{}
    if(!grant)markDeny();
    refresh();
    if(status)status.textContent=effective?'Google Analytics aktif dalam tab ini.':grant?'Google Analytics kekal tidak aktif dalam tab ini. Simpan pilihan pada halaman ini untuk membenarkannya.':'Google Analytics dimatikan dalam tab ini selepas perubahan pilihan pada tab lain.';
  });
})();
