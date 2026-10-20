(() => {
  const KEY='bwn-cookie-preferences', DENY='bwn-analytics-denied', MARK='|bwn-analytics-denied|', ID='G-HXM22WWPKP';
  function denied(){try{if(sessionStorage.getItem(DENY)==='1')return true;}catch{}try{return window.name.includes(MARK);}catch{return false;}}
  function markDeny(value){try{value?sessionStorage.setItem(DENY,'1'):sessionStorage.removeItem(DENY);}catch{}try{window.name=window.name.split(MARK).join('')+(value?MARK:'');}catch{}}
  function read(){
    if(denied())return null;
    try{
      const saved=JSON.parse(localStorage.getItem(KEY)||'null');
      // A stale stored grant must not revive while writes are blocked.
      localStorage.setItem(KEY+'-write-check','1');localStorage.removeItem(KEY+'-write-check');
      return saved && typeof saved.analytics==='boolean'?saved:null;
    }catch{return null;}
  }
  function apply(grant){
    window['ga-disable-'+ID]=!grant;
    if(!grant){window.gtag?.('consent','update',{analytics_storage:'denied'});return;}
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent','update',{analytics_storage:'granted'});
    if(document.getElementById('bwn-ga4'))return;
    const script=document.createElement('script');script.id='bwn-ga4';script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(script);
    window.gtag('js',new Date());window.gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false});
  }
  function save(analytics){
    analytics=analytics===true;markDeny(!analytics);apply(analytics);
    try{localStorage.setItem(KEY,JSON.stringify({analytics}));return true;}catch{return false;}
  }
  window.bwnConsent={read,save};
  const saved=read();apply(saved?.analytics===true);
  const checkbox=document.getElementById('analytics'),status=document.getElementById('cookie-status');
  if(checkbox)checkbox.checked=saved?.analytics===true;
  function choose(value){const stored=save(value);if(checkbox)checkbox.checked=value;if(status)status.textContent=stored?(value?'Pilihan analitik disimpan.':'Analitik ditolak dan pilihan disimpan.'):(value?'Analitik dibenarkan pada halaman ini sahaja; pilihan tidak dapat disimpan untuk lawatan lain.':'Analitik ditolak sekarang; pilihan tidak dapat disimpan untuk tab atau pelayar baharu.');}
  document.getElementById('save-cookie')?.addEventListener('click',()=>choose(checkbox?.checked===true));
  document.getElementById('reject-cookie')?.addEventListener('click',()=>choose(false));
})();
