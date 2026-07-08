(function(){
  if(window.pdfjsLib){
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }
})();
(function(){
"use strict";

/* ===== UTILITIES ===== */
const FA=['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
const toFa=n=>String(n==null?'':n).replace(/[0-9]/g,d=>FA[d]);
const num=(n,d=1)=>{const v=Number(n||0);if(!isFinite(v))return '۰';return toFa(v.toFixed(d));};
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const ESC={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>ESC[c]);
function debounce(fn,ms=120){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);};}
function haptic(ms=8){if(navigator.vibrate)try{navigator.vibrate(ms);}catch{}}

$$('.card-toggle').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const body=btn.nextElementSibling;
    if(!body||!body.classList.contains('card-body'))return;
    const open=body.classList.contains('open');
    body.classList.toggle('open',!open);
    btn.setAttribute('aria-expanded',String(!open));
  });
});

let darkMode=false;
try{darkMode=localStorage.getItem('solarDark')==='1';}catch{}
function applyDark(on){
  darkMode=!!on;
  document.documentElement.classList.toggle('dark',on);
  try{localStorage.setItem('solarDark',on?'1':'0');}catch{}
  const icon=$('#darkIcon'),label=$('#darkLabel');
  if(icon)icon.textContent=on?'☀':'🌙';
  if(label)label.textContent=on?'حالت روشن':'حالت تاریک';
}
applyDark(darkMode);

/* ===== TRANSLATIONS ===== */
const T={
fa:{text:{
  sec1Title:'اطلاعات مشتری',sec2Title:'نوع سیستم',sec3Title:'مصرف برق',sec4Title:'آفتاب و سایه',
  sec5Title:'باتری',sec6Title:'پنل خورشیدی',sec7Title:'قیمت‌گذاری',sec8Title:'کابل‌کشی',sec9Title:'بریکر و فیوز',
  previewPaneTitleText:'پیش‌فاکتور',settingsModalTitle:'تنظیمات',historyModalTitle:'تاریخچه',backupTitle:'بک‌آپ / بازیابی',
  btnDef:'پیش‌فرض',btnSave:'ذخیره',mHistory:'تاریخچه پیش‌فاکتورها',mSettings:'تنظیمات',mBackup:'بک‌آپ / بازیابی',
  mMenu:'منو',lblCurrency:'واحد پول',lblLang:'زبان',
  lblCustName:'نام مشتری',lblCustPhone:'شماره تماس',lblCustAddr:'آدرس',
  lblDailyKwh:'مصرف روزانه',lblMonthlyKwh:'مصرف ماهانه',
  btnAddApp:'افزودن وسیله',noteBill:'تقسیم بر ۳۰ = مصرف روزانه',
  lblCity:'شهر',lblSunH:'ساعت آفتاب',lblShade:'وضعیت سایه',shNone:'بدون سایه',shPart:'جزئی',shSig:'زیاد',
  lblAutonomy:'روزهای استقلال',lblSysV:'ولتاژ سیستم',lblBattType:'نوع باتری',lblPackV:'ولتاژ باتری',
  lblBattAh:'ظرفیت (Ah)',lblBattCnt:'تعداد باتری',btnAutoRec:'↺ پیشنهاد خودکار',lblPeak:'حداکثر توان لحظه‌ای',
  lblPanelW:'توان پنل',lblPanelT:'تکنولوژی',lblCurP:'واحد پول',lblInvP:'قیمت اینورتر',lblInvPres:'مدل رایج',
  lblInvMod:'مدل اینورتر',btnUpload:'📄 آپلود یوزر منوال (PDF)',lblBatP:'قیمت باتری',lblCtrlP:'قیمت شارژ کنترلر',
  lblWarranty:'گارانتی (سال)',lblPayTerms:'شرایط پرداخت',
  payFull:'نقدی (۱۰۰٪ پیش‌پرداخت)',pay50:'۵۰٪ پیش، ۵۰٪ هنگام تحویل',
  pay30:'۳۰٪ پیش، ۷۰٪ اقساط ۳ ماهه',pay6:'اقساط ۶ ماهه',pay12:'اقساط ۱۲ ماهه',
  payCustom:'سفارشی',lblPayCustom:'شرح پرداخت سفارشی',
  lblElecRate:'نرخ برق شهری (برای ROI)',lblInstall:'یادداشت نصب',
  lblLenP:'کابل پنل',lblLenB:'کابل باتری',lblLogo:'لوگوی کسب‌وکار',lblCurS:'واحد پول',
  lblPanelPriceS:'قیمت هر وات پنل',lblBizName:'نام کسب‌وکار',
  navClear:'پاک',navWa:'واتساپ',navSave:'ذخیره',navPdf:'PDF',
  roiTitle:'💰 بازگشت سرمایه (ROI)',roiSave:'صرفه‌جویی ماهانه',roiYear:'صرفه‌جویی سالانه',
  roiPayback:'دوره بازگشت',roiCo2:'کاهش CO₂ سالانه',
  roiNote:'💡 تخمینی بر اساس تولید سالانه و نرخ برق وارد شده. با افزایش نرخ برق دوره بازگشت کوتاه‌تر می‌شود.',
  termsTitleWarranty:'🛡 گارانتی',termsWarrantyYears:'سال گارانتی کامل تجهیزات',termsWarrantyPerf:'سال گارانتی عملکرد (بالای ۸۰٪)',
  termsTitlePay:'💳 شرایط پرداخت',termsTitleInstall:'📋 یادداشت نصب',
  pdfView:'نمایش',pdfShare:'اشتراک',pdfReady:'✅ PDF آماده شد',pdfHint:'فایل دانلود شد — برای مشاهده داخل اپ روی نمایش بزنید',
  pdfLoading:'در حال بارگذاری PDF…',pdfFailed:'❌ خطا در نمایش PDF',
  pdfvTitle:'پیش‌نمایش PDF',pdfvDownload:'⬇ دانلود',pdfvClose:'بستن',pdfvShare:'اشتراک',
  histPh:'🔍 جستجو (نام، تلفن، مبلغ)…',histAll:'همه',histOngrid:'آن‌گرید',histOffgrid:'آف‌گرید',histHybrid:'هیبریدی',
  histExport:'📤 خروجی',histClear:'🗑 حذف همه',histClearConfirm:'آیا از حذف تمام تاریخچه مطمئن هستید؟',
  histEmpty:'هنوز پیش‌فاکتوری ذخیره نشده.',
  bakDlDesc:'تمام تنظیمات، تاریخچه و پیش‌نویس فعلی در قالب JSON ذخیره می‌شود.',
  bakUpDesc:'فایل JSON بک‌آپ را انتخاب کنید. هشدار: داده‌های فعلی بازنویسی می‌شوند.',
  bakImported:'✅ بک‌آپ با موفقیت بازیابی شد',bakFailed:'❌ فایل بک‌آپ نامعتبر یا خراب است',
  bakVer:'نسخه',bakRec:'پیش‌فاکتور',
  noPhone:'شماره تماس وارد نشده',saved:'✅ ذخیره شد',loaded:'بارگذاری شد',cleared:'پاک شد',
  deleted:'حذف شد',delAll:'تاریخچه پاک شد',autoOn:'پیشنهاد خودکار فعال شد',pdfWait:'در حال ساخت PDF…',
  pdfErr:'خطا در ساخت PDF',libFail:'کتابخانه PDF لود نشد',noQuote:'پیش‌فاکتور آماده نیست',
}},
ps:{text:{navClear:'پاکول',navWa:'واټساپ',navSave:'خوندي',navPdf:'PDF'}},
en:{text:{
  sec1Title:'Customer Info',sec2Title:'System Type',sec3Title:'Consumption',sec4Title:'Sun & Shade',
  sec5Title:'Battery',sec6Title:'Solar Panel',sec7Title:'Pricing',sec8Title:'Wiring',sec9Title:'Breakers & Fuses',
  previewPaneTitleText:'Quote',settingsModalTitle:'Settings',historyModalTitle:'History',backupTitle:'Backup / Restore',
  btnDef:'Default',btnSave:'Save',mHistory:'Quote History',mSettings:'Settings',mBackup:'Backup / Restore',
  mMenu:'Menu',lblCurrency:'Currency',lblLang:'Language',
  lblCustName:'Customer name',lblCustPhone:'Phone',lblCustAddr:'Address',
  lblDailyKwh:'Daily usage',lblMonthlyKwh:'Monthly usage',
  btnAddApp:'Add appliance',noteBill:'÷30 = daily',
  lblCity:'City',lblSunH:'Sun hours',lblShade:'Shading',shNone:'None',shPart:'Partial',shSig:'Significant',
  lblAutonomy:'Autonomy days',lblSysV:'System voltage',lblBattType:'Battery type',lblPackV:'Pack voltage',
  lblBattAh:'Capacity (Ah)',lblBattCnt:'Battery count',btnAutoRec:'↺ Auto recommend',lblPeak:'Peak power',
  lblPanelW:'Panel wattage',lblPanelT:'Technology',lblCurP:'Currency',lblInvP:'Inverter price',lblInvPres:'Preset',
  lblInvMod:'Inverter model',btnUpload:'📄 Upload manual (PDF)',lblBatP:'Battery price',lblCtrlP:'Controller price',
  lblWarranty:'Warranty (years)',lblPayTerms:'Payment terms',
  payFull:'Cash (100% upfront)',pay50:'50% upfront, 50% on delivery',
  pay30:'30% upfront, 70% / 3mo',pay6:'6-month installments',pay12:'12-month installments',
  payCustom:'Custom',lblPayCustom:'Custom terms',
  lblElecRate:'Electricity rate (for ROI)',lblInstall:'Install notes',
  lblLenP:'Panel cable',lblLenB:'Battery cable',lblLogo:'Business logo',lblCurS:'Currency',
  lblPanelPriceS:'Panel price per watt',lblBizName:'Business name',
  navClear:'Clear',navWa:'WhatsApp',navSave:'Save',navPdf:'PDF',
  roiTitle:'💰 ROI Analysis',roiSave:'Monthly savings',roiYear:'Annual savings',
  roiPayback:'Payback period',roiCo2:'Annual CO₂ reduction',
  roiNote:'Estimate based on annual production and electricity rate. Higher tariffs = faster payback.',
  termsTitleWarranty:'🛡 Warranty',termsWarrantyYears:'years full equipment warranty',termsWarrantyPerf:'years performance (>80%)',
  termsTitlePay:'💳 Payment terms',termsTitleInstall:'📋 Installation notes',
  pdfView:'View',pdfShare:'Share',pdfReady:'✅ PDF ready',pdfHint:'Downloaded — tap View to open in-app',
  pdfLoading:'Loading PDF…',pdfFailed:'❌ PDF viewer error',
  pdfvTitle:'PDF Preview',pdfvDownload:'⬇ Download',pdfvClose:'Close',pdfvShare:'Share',
  histPh:'🔍 Search (name, phone, amount)…',histAll:'All',histOngrid:'On-grid',histOffgrid:'Off-grid',histHybrid:'Hybrid',
  histExport:'📤 Export',histClear:'🗑 Clear all',histClearConfirm:'Delete all history?',
  histEmpty:'No quotes saved yet.',
  bakDlDesc:'Exports settings, history and current draft as a JSON file.',
  bakUpDesc:'Select a JSON backup. WARNING: current data will be overwritten.',
  bakImported:'✅ Backup restored',bakFailed:'❌ Invalid backup file',
  bakVer:'Version',bakRec:'records',
  noPhone:'No phone number entered',saved:'✅ Saved',loaded:'Loaded',cleared:'Cleared',
  deleted:'Deleted',delAll:'History cleared',autoOn:'Auto-recommend on',pdfWait:'Building PDF…',
  pdfErr:'PDF error',libFail:'PDF libraries not loaded',noQuote:'Quote not ready',
}}};
let currentLang='fa';
try{currentLang=localStorage.getItem('solarLang')||'fa';}catch{}
function t(k){const d=T.fa.text,D=(T[currentLang]&&T[currentLang].text)||d;return D[k]||d[k]||k;}
function syncPayCustom(){const pt=$('#paymentTerms'),w=$('#payCustomWrap');if(pt&&w)w.style.display=pt.value==='custom'?'block':'none';}
function applyTranslations(lang){
  currentLang=lang||'fa';
  document.documentElement.lang=currentLang;
  document.documentElement.dir=currentLang==='en'?'ltr':'rtl';
  const dict=(T[currentLang]&&T[currentLang].text)||T.fa.text;
  Object.entries(dict).forEach(([id,txt])=>{const e=document.getElementById(id);if(e&&txt)e.textContent=txt;});
  const li=currentLang==='fa'?0:currentLang==='ps'?1:2;
  const pH={custName:['محمد احمدی','نوم','Customer name'],custPhone:['۰۷۹۳۱۲۳۴۵۶','شمېره','Phone'],
    custAddr:['شهر، ناحیه، کوچه','پته','Address'],inverterModel:['Growatt 5kW','Growatt 5kW','e.g. Growatt 5kW'],
    priceInverterManual:['قیمت اینورتر','د انورټر قیمت','Inverter price'],
    priceBatteryManual:['قیمت باتری','د بطرۍ قیمت','Battery price'],
    priceControllerManual:['قیمت','قیمت','Controller price'],
    batteryUnitAh:['۱۰۰','۱۰۰','100'],batteryCount:['خودکار','خودکار','Auto'],
    peakPower:['۲۰۰۰','۲۰۰۰','2000'],bizName:['خورشید تابان','','Business name'],
    installerNotes:['شرایط نصب...','','Install notes...'],monthlyKwh:['مصرف ماهانه','میاشتنی','Monthly kWh']};
  Object.entries(pH).forEach(([id,phs])=>{const e=document.getElementById(id);if(e)e.placeholder=phs[li]||phs[0];});
  const hs=$('#histSearch');if(hs)hs.placeholder=t('histPh');
  const ru=$('#elecRateUnit');if(ru&&typeof settings!=='undefined'&&settings)ru.textContent=(settings.currency||'AFN')+'/kWh';
  syncPayCustom();
}

/* ===== CURRENCIES ===== */
const CURRENCIES=[
  {code:'AFN',label:'افغانی',dec:0,defRate:8},
  {code:'USD',label:'دالر',dec:2,defRate:0.1},
  {code:'EUR',label:'یورو',dec:2,defRate:0.09},
  {code:'PKR',label:'کلدار',dec:0,defRate:28},
  {code:'IRR',label:'تومان',dec:0,defRate:4200},
  {code:'AED',label:'درهم',dec:2,defRate:0.37},
  {code:'GBP',label:'پوند',dec:2,defRate:0.08}
];
const curMeta=c=>CURRENCIES.find(x=>x.code===c)||CURRENCIES[0];
const curSels=$$('.currency-sync');
curSels.forEach(sel=>{
  sel.innerHTML=CURRENCIES.map(c=>'<option value="'+c.code+'">'+c.code+' — '+c.label+'</option>').join('');
});

/* ===== SETTINGS ===== */
const DEF={panelPrice:{AFN:1200,USD:17,EUR:15,PKR:4500,IRR:70000,AED:62,GBP:13},
  bizName:'',logo:'',currency:'AFN',warrantyYears:5,paymentTerms:'full',paymentCustom:'',elecRate:8};
let settings;
function loadSettings(){
  try{
    const raw=localStorage.getItem('solarSettings');
    settings=raw?{...DEF,...JSON.parse(raw)}:{...DEF};
    settings.panelPrice={...DEF.panelPrice,...(settings.panelPrice||{})};
  }catch{settings={...DEF,panelPrice:{...DEF.panelPrice}};}
}
loadSettings();
let pendingLogo=settings.logo||'';
function saveSets(){try{localStorage.setItem('solarSettings',JSON.stringify(settings));}catch{}}
function money(n,cur){
  n=Number(n)||0;cur=cur||settings.currency||'AFN';
  const m=curMeta(cur);
  let s=m.dec>0?n.toLocaleString('en-US',{maximumFractionDigits:m.dec}).replace(/,/g,'٬')
            :Math.round(n).toLocaleString('en-US').replace(/,/g,'٬');
  return toFa(s)+' '+m.code;
}
function syncCurrency(){
  curSels.forEach(s=>s.value=settings.currency);
  const lbl=$('#lblPanelPriceS');
  if(lbl)lbl.textContent='قیمت هر وات پنل ('+settings.currency+')';
  const ppw=$('#pricePanelPerWatt');
  if(ppw)ppw.value=settings.panelPrice[settings.currency]??'';
  const ru=$('#elecRateUnit');
  if(ru)ru.textContent=settings.currency+'/kWh';
  const er=$('#elecRate');
  if(er&&!er.dataset.touched){
    const cm=curMeta(settings.currency);
    er.value=cm.defRate;
  }
}
curSels.forEach(sel=>sel.addEventListener('change',function(){
  settings.currency=this.value;saveSets();syncCurrency();recalc();
}));
function renderLogo(url){
  const el=$('#logoPreview');if(!el)return;
  if(url){el.classList.remove('empty');el.innerHTML='<img src="'+url+'" alt="logo">';}
  else{el.classList.add('empty');el.innerHTML=currentLang==='en'?'No logo':'بدون لوگو';}
}
function fillSettings(){
  const bn=$('#bizName');if(bn)bn.value=settings.bizName||'';
  const lu=$('#logoUpload');if(lu)lu.value='';
  pendingLogo=settings.logo||'';renderLogo(pendingLogo);syncCurrency();
  const wy=$('#warrantyYears');if(wy)wy.value=settings.warrantyYears??5;
  const pt=$('#paymentTerms');if(pt)pt.value=settings.paymentTerms||'full';
  const pc=$('#paymentCustom');if(pc)pc.value=settings.paymentCustom||'';
  syncPayCustom();
}
const logoUp=$('#logoUpload');
if(logoUp)logoUp.addEventListener('change',function(e){
  const f=e.target.files[0];if(!f)return;
  if(f.size>900*1024){showToast(currentLang==='en'?'Max 900KB':'حداکثر ۹۰۰KB','warning');return;}
  const r=new FileReader();
  r.onload=ev=>{pendingLogo=ev.target.result;renderLogo(pendingLogo);};
  r.readAsDataURL(f);
});
const rmLogo=$('#removeLogoBtn');
if(rmLogo)rmLogo.addEventListener('click',()=>{pendingLogo='';if(logoUp)logoUp.value='';renderLogo('');});
function openSheet(id){const m=document.getElementById(id);if(m){m.classList.add('open');m.setAttribute('aria-hidden','false');}}
function closeSheet(id){const m=document.getElementById(id);if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true');}}
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>closeSheet(b.dataset.close)));
$$('.sheet-backdrop').forEach(bd=>bd.addEventListener('click',e=>{if(e.target===bd)bd.classList.remove('open');}));
const setBtn=$('#settingsBtn');
if(setBtn)setBtn.addEventListener('click',()=>{haptic();fillSettings();openSheet('settingsModal');});
const hisBtn=$('#historyBtn');
if(hisBtn)hisBtn.addEventListener('click',()=>{haptic();renderHistory();openSheet('historyModal');});
const bakBtn=$('#backupBtn');
if(bakBtn)bakBtn.addEventListener('click',()=>{haptic();renderBackupMeta();openSheet('backupModal');});
const saveSetsBtn=$('#saveSettingsBtn');
if(saveSetsBtn)saveSetsBtn.addEventListener('click',()=>{
  const ppw=$('#pricePanelPerWatt');
  settings.panelPrice[settings.currency]=+(ppw?.value)||0;
  settings.bizName=($('#bizName')?.value||'').trim();
  settings.logo=pendingLogo;
  const wy=$('#warrantyYears');if(wy)settings.warrantyYears=+(wy.value)||0;
  const pt=$('#paymentTerms');if(pt)settings.paymentTerms=pt.value||'full';
  const pc=$('#paymentCustom');if(pc)settings.paymentCustom=pc.value||'';
  const er=$('#elecRate');if(er){settings.elecRate=+(er.value)||0;er.dataset.touched='1';}
  saveSets();closeSheet('settingsModal');showToast(t('saved'));recalc();
});
const resetSetsBtn=$('#resetSettingsBtn');
if(resetSetsBtn)resetSetsBtn.addEventListener('click',()=>{
  const cur=settings.currency,logo=settings.logo;
  settings={...DEF,logo,currency:cur,panelPrice:{...DEF.panelPrice}};
  fillSettings();
});
$('#paymentTerms')?.addEventListener('change',()=>syncPayCustom());

/* ===== TOAST ===== */
function showToast(msg,type='success',dur=2200){
  const to=$('#toast');if(!to)return;
  to.textContent=msg;to.className='toast show '+type;
  clearTimeout(to._tid);
  to._tid=setTimeout(()=>to.classList.remove('show'),dur);
}
function updateOnline(){const b=$('#offlineBadge');if(b)b.classList.toggle('show',!navigator.onLine);}
window.addEventListener('online',updateOnline);
window.addEventListener('offline',updateOnline);
updateOnline();

/* ===== SYSTEM TYPE & CONSUMPTION ===== */
let systemType='ongrid',consMode='daily';
function syncSysUI(){
  $$('#systemType .sys-btn').forEach(b=>b.classList.toggle('active',b.dataset.v===systemType));
  const bf=$('#batteryFields'),bpw=$('#batteryPriceWrap'),cpw=$('#controllerPriceWrap');
  if(bf)bf.style.display=systemType==='ongrid'?'none':'block';
  if(bpw)bpw.style.display=systemType==='ongrid'?'none':'block';
  if(cpw)cpw.style.display=systemType==='offgrid'?'block':'none';
}
function syncConsUI(){
  $$('#consMode button').forEach(b=>b.classList.toggle('active',b.dataset.v===consMode));
  ['daily','bill','appliance'].forEach(m=>{
    const e=$('#cons-'+m);if(e)e.style.display=m===consMode?'block':'none';
  });
}
$$('#systemType .sys-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{haptic();systemType=btn.dataset.v;syncSysUI();recalc();});
});
$$('#consMode button').forEach(btn=>{
  btn.addEventListener('click',()=>{haptic();consMode=btn.dataset.v;syncConsUI();recalc();});
});
$('#cityPreset')?.addEventListener('change',function(){if(this.value){const sh=$('#sunHours');if(sh)sh.value=this.value;recalc();}});

/* ===== INVERTER PRESETS ===== */
const INVERTER_PRESETS=[
  {id:'deye-5k',brand:'Deye',model:'SUN-5K-SG04LP3 هیبریدی',kw:5,kind:'hybrid',bv:48,pvMax:500,mpptA:26,mpptN:2},
  {id:'deye-8k',brand:'Deye',model:'SUN-8K-SG01LP1 هیبریدی',kw:8,kind:'hybrid',bv:48,pvMax:500,mpptA:26,mpptN:2},
  {id:'deye-12k',brand:'Deye',model:'SUN-12K-SG04LP3 هیبریدی',kw:12,kind:'hybrid',bv:48,pvMax:500,mpptA:52,mpptN:2},
  {id:'growatt-5k',brand:'Growatt',model:'SPF 5000 ES آف‌گرید',kw:5,kind:'offgrid',bv:48,pvMax:450,mpptA:80,mpptN:1},
  {id:'growatt-3k',brand:'Growatt',model:'SPF 3500 ES آف‌گرید',kw:3.5,kind:'offgrid',bv:24,pvMax:450,mpptA:60,mpptN:1},
  {id:'must-5k',brand:'MUST',model:'PV18-5024 آف‌گرید',kw:5,kind:'offgrid',bv:24,pvMax:145,mpptA:60,mpptN:1},
  {id:'must-6k',brand:'MUST',model:'PH18-6248 هیبریدی',kw:6,kind:'hybrid',bv:48,pvMax:450,mpptA:80,mpptN:2},
  {id:'volt-5k',brand:'Voltronic',model:'Axpert MKS 5K آف‌گرید',kw:5,kind:'offgrid',bv:48,pvMax:145,mpptA:60,mpptN:1},
  {id:'volt-3k',brand:'Voltronic',model:'Axpert King 3K آف‌گرید',kw:3,kind:'offgrid',bv:24,pvMax:145,mpptA:60,mpptN:1}
];
let selectedPreset=null;
(function(){
  const sel=$('#inverterPreset');if(!sel)return;
  const brands=[...new Set(INVERTER_PRESETS.map(p=>p.brand))];
  brands.forEach(brand=>{
    const g=document.createElement('optgroup');g.label=brand;
    INVERTER_PRESETS.filter(p=>p.brand===brand).forEach(p=>{
      const o=document.createElement('option');o.value=p.id;o.textContent=p.model+' — '+toFa(p.kw)+'kW';g.appendChild(o);
    });
    sel.appendChild(g);
  });
  sel.addEventListener('change',function(){
    if(!this.value){selectedPreset=null;const cb=$('#inverterCompatBox');if(cb)cb.style.display='none';recalc();return;}
    const p=INVERTER_PRESETS.find(x=>x.id===this.value);
    selectedPreset=p;
    const im=$('#inverterModel');if(im)im.value=p.brand+' '+p.model;
    if(systemType!=='ongrid'){const bv=$('#batteryVoltage');if(bv)bv.value=String(p.bv);battVAuto=false;updateAutoTags();}
    recalc();
  });
})();
function renderCompat(preset,wiring,battV){
  const box=$('#inverterCompatBox');if(!box)return;
  if(!preset){box.style.display='none';return;}
  const issues=[];
  if(wiring.arrayV>preset.pvMax)issues.push('ولتاژ آرایه ('+num(wiring.arrayV,1)+'V) > حداکثر PV ('+toFa(preset.pvMax)+'V)');
  if(wiring.arrayA>preset.mpptA)issues.push('جریان آرایه ('+num(wiring.arrayA,1)+'A) > حداکثر MPPT ('+toFa(preset.mpptA)+'A)');
  if(systemType!=='ongrid'&&preset.bv!==battV)issues.push('مدل برای '+toFa(preset.bv)+'V — سیستم '+toFa(battV)+'V');
  box.style.display='block';
  box.innerHTML=issues.length
    ?'<div class="note" style="color:#EF4444;">⚠️ '+issues.join('<br>⚠️ ')+'</div>'
    :'<div class="note" style="color:#0D9488;">✅ سازگار</div>';
}

/* ===== APPLIANCES ===== */
function addApp(name,watt,hours,qty){
  const wrap=document.createElement('div');
  wrap.className='appliance-row';
  wrap.innerHTML=
    '<input type="text" class="app-name" placeholder="نام وسیله" value="'+esc(name||'')+'" data-f="name">'+
    '<div class="app-fields" style="grid-column:1/-1;">'+
      '<div class="field-mini"><label>وات</label><input type="number" placeholder="۰" min="0" value="'+(watt||'')+'" data-f="watt" inputmode="decimal"></div>'+
      '<div class="field-mini"><label>ساعت/روز</label><input type="number" placeholder="۰" min="0" step="0.5" value="'+(hours||'')+'" data-f="hours" inputmode="decimal"></div>'+
      '<div class="field-mini"><label>تعداد</label><input type="number" placeholder="۱" min="1" value="'+(qty||1)+'" data-f="qty" inputmode="numeric"></div>'+
    '</div>'+
    '<button class="del-row" type="button">🗑 '+(currentLang==='en'?'Delete':'حذف')+'</button>';
  wrap.querySelectorAll('input').forEach(i=>i.addEventListener('input',recalc));
  wrap.querySelector('.del-row').addEventListener('click',()=>{wrap.remove();recalc();});
  const c=$('#applianceRows');if(c)c.appendChild(wrap);
}
function appDailyWh(){
  let t=0;
  $$('#applianceRows .appliance-row').forEach(r=>{
    const w=+(r.querySelector('[data-f=watt]')?.value)||0;
    const h=+(r.querySelector('[data-f=hours]')?.value)||0;
    const q=+(r.querySelector('[data-f=qty]')?.value)||0;
    t+=w*h*q;
  });
  return t;
}
const addAppBtn=$('#addApplianceBtn');
if(addAppBtn)addAppBtn.addEventListener('click',()=>{addApp();recalc();});

/* ===== ENGINEERING ===== */
const PANEL_SPECS={
  400:{vmp:37.1,imp:10.8},450:{vmp:41.4,imp:10.9},500:{vmp:41.7,imp:12.0},
  550:{vmp:41.7,imp:13.2},600:{vmp:45.5,imp:13.2},650:{vmp:46.9,imp:13.9},
  700:{vmp:38.7,imp:18.1}
};
const BATT_CHEM={
  lithium:{dod:.90,cRate:.5,caps:[100,150,200,280],life:6000},
  'li-ion':{dod:.85,cRate:.5,caps:[100,150,200],life:3000},
  gel:{dod:.60,cRate:.2,caps:[100,150,200],life:1200},
  dry:{dod:.50,cRate:.3,caps:[100,150,200],life:800},
  lead:{dod:.45,cRate:.2,caps:[100,150,200],life:500}
};
const bc=t=>BATT_CHEM[t]||BATT_CHEM.lithium;
const STD_INV=[1,1.5,2,3,3.5,5,6,8,10,12,15,20,25,30];
const STD_CTRL=[10,20,30,40,50,60,80,100,120,150];
const STD_BRK=[2,4,6,10,13,16,20,25,32,40,50,63,80,100,125,160,200,250];
const STD_FUSE=[2,4,6,10,15,20,25,30,35,40,50,60,70,80,100,125,150,200];
const WIRE_TBL=[{mm2:1.5,a:23},{mm2:2.5,a:30},{mm2:4,a:40},{mm2:6,a:52},{mm2:10,a:70},{mm2:16,a:94},{mm2:25,a:119},{mm2:35,a:148},{mm2:50,a:180},{mm2:70,a:232},{mm2:95,a:282}];
const CU=0.0175,LOSS=0.20,BATT_UV=12,CHG_EFF=0.75;
const ru=(list,v)=>list.find(s=>s>=v-1e-9)||list[list.length-1];
const pwWire=amps=>WIRE_TBL.find(w=>w.a>=amps)||WIRE_TBL[WIRE_TBL.length-1];
const vd=(I,L,mm2,Vs)=>Vs?((2*L*I*CU)/mm2/Vs)*100:0;
function recSysV(kw){return kw<=1.5?12:kw<=3.5?24:48;}
function recBattPack(reqAh,sysV,type){
  const s=Math.max(1,Math.round(sysV/BATT_UV));
  const caps=bc(type).caps;
  for(const c of caps){if(c>=reqAh-1e-9)return {unitV:BATT_UV,unitAh:c,series:s,par:1,total:s,totalAh:c};}
  const lg=caps[caps.length-1];const p=Math.max(1,Math.ceil(reqAh/lg));
  return {unitV:BATT_UV,unitAh:lg,series:s,par:p,total:s*p,totalAh:lg*p};
}
function calcPW(count,spec,sType,sysV){
  if(count<=0)return {series:0,par:0,total:0,arrayV:0,arrayA:0,wType:'—'};
  const {vmp,imp}=spec;const voc=vmp*1.25;let s;
  if(sType==='ongrid'){const mx=Math.max(1,Math.floor(500/voc));s=Math.min(Math.max(1,Math.round(380/vmp)),mx,count);}
  else{const mn=Math.max(1,Math.ceil((sysV*1.3)/vmp));const mx=Math.max(1,Math.floor(400/voc));s=Math.ceil(count/2);s=Math.max(s,mn);s=Math.min(s,mx,count);s=Math.max(1,s);}
  const p=Math.max(1,Math.ceil(count/s));
  return {series:s,par:p,total:s*p,arrayV:s*vmp,arrayA:p*imp,wType:s===1?'موازی':p===1?'سری':'مختلط'};
}
function calcBB(reqAh,sysV,uV,uAh,cnt){
  if(!uV||uV<=0)uV=sysV;
  const sps=Math.max(1,Math.round(sysV/uV));let p=0,t=0;
  if(cnt>0){t=cnt;p=Math.max(1,Math.floor(cnt/sps));}
  else if(uAh>0){p=Math.max(1,Math.ceil(reqAh/uAh));t=sps*p;}
  return {sps,par:p,total:t,totalAh:uAh>0?p*uAh:0,wType:t<=0?'—':sps===1?'موازی':p===1?'سری':'مختلط',vMis:Math.abs(sps*uV-sysV)>0.01};
}
function calcCtrl(aA){const d=aA*1.25;return {d,rated:ru(STD_CTRL,d)};}
function calcProt(sT,w,bCable,bV,invKw,spec){
  const r={};
  r.pvBrk=ru(STD_BRK,(w.arrayA||0)*1.25);
  if(w.par>=2){r.sFuse=ru(STD_FUSE,(spec.imp||0)*1.56);r.sFuseNeeded=true;}else{r.sFuseNeeded=false;}
  if(sT!=='ongrid'&&bCable)r.bBrk=ru(STD_BRK,bCable.cur*1.25);
  r.acOut=ru(STD_BRK,invKw>0?(invKw*1000/230)*1.25:0);
  if(sT!=='offgrid')r.acGrid=r.acOut;
  return r;
}

/* ===== SVG DIAGRAM ===== */
const SVG_M='<defs>'+
  '<marker id="ah" markerWidth="10" markerHeight="10" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#0D9488"/></marker>'+
  '<linearGradient id="panelGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FBBF24"/><stop offset="100%" stop-color="#F59E0B"/></linearGradient>'+
  '<linearGradient id="inverterGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#14B8A6"/><stop offset="100%" stop-color="#0D9488"/></linearGradient>'+
  '<linearGradient id="batteryGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#A78BFA"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient>'+
  '<linearGradient id="gridGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#60A5FA"/><stop offset="100%" stop-color="#3B82F6"/></linearGradient>'+
  '<linearGradient id="loadGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F87171"/><stop offset="100%" stop-color="#EF4444"/></linearGradient>'+
  '<filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur in="SourceAlpha" stdDeviation="2"/><feOffset dx="0" dy="2" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>'+
  '</defs>';
function svgBox(x,y,w,h,lines,gradId,iconEmoji){
  const lh=12,is=iconEmoji?16:0,csy=y+12+is;
  let t='';lines.forEach((l,i)=>{t+='<text x="'+(x+w/2)+'" y="'+(csy+i*lh+4)+'" text-anchor="middle" font-size="10" font-family="Vazirmatn,system-ui,sans-serif" fill="#FFFFFF" font-weight="'+(i===0?'700':'500')+'">'+esc(l)+'</text>';});
  const icon=iconEmoji?'<text x="'+(x+w/2)+'" y="'+(y+18)+'" text-anchor="middle" font-size="14">'+iconEmoji+'</text>':'';
  return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="12" fill="url(#'+gradId+')" filter="url(#softShadow)"/>'+icon+t;
}
function svgArr(x1,y1,x2,y2,lbl,side){
  side=side||'right';const mx=(x1+x2)/2,my=(y1+y2)/2;
  let lx=mx,ly=my,anch='middle';
  if(side==='right'){lx=mx+8;anch='start';}else if(side==='left'){lx=mx-8;anch='end';}
  const lblLen=esc(lbl||'').length,bgW=lblLen*4.5+10;
  const bgX=anch==='start'?lx-4:anch==='end'?lx-bgW+4:lx-bgW/2;
  const bg=lbl?'<rect x="'+bgX+'" y="'+(ly-8)+'" width="'+bgW+'" height="14" rx="7" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1"/>':'';
  const lt=lbl?'<text x="'+lx+'" y="'+(ly+3)+'" text-anchor="'+anch+'" font-size="9" font-family="Vazirmatn,system-ui,sans-serif" fill="#B45309" font-weight="700">'+esc(lbl)+'</text>':'';
  return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="#0D9488" stroke-width="2.5" stroke-linecap="round" marker-end="url(#ah)"/>'+bg+lt;
}
function buildDiag(sT,nP,wP,prot,bInfo){
  const pL=['پنل خورشیدی',toFa(nP)+'×'+toFa(wP)+'W'];
  const pvB=prot.sFuseNeeded?'MCB '+toFa(prot.pvBrk)+'A + فیوز '+toFa(prot.sFuse)+'A':'MCB '+toFa(prot.pvBrk)+'A';
  if(sT==='ongrid')return{vb:'0 0 320 340',body:
    svgBox(70,10,180,50,pL,'panelGrad','☀️')+
    svgArr(160,60,160,100,pvB,'right')+
    svgBox(70,100,180,50,['اینورتر آن‌گرید'],'inverterGrad','🔌')+
    svgArr(160,150,160,190,'AC '+toFa(prot.acOut)+'A','right')+
    svgBox(70,190,180,50,['تابلو برق'],'loadGrad','🏠')+
    svgArr(160,240,160,280,'AC '+toFa(prot.acGrid)+'A','right')+
    svgBox(70,280,180,50,['برق شهری'],'gridGrad','⚡')};
  if(sT==='offgrid')return{vb:'0 0 320 430',body:
    svgBox(70,10,180,50,pL,'panelGrad','☀️')+
    svgArr(160,60,160,100,pvB,'right')+
    svgBox(70,100,180,50,['شارژ کنترلر'],'inverterGrad','🎛️')+
    svgArr(160,150,160,190,prot.bBrk?'باتری '+toFa(prot.bBrk)+'A':'','right')+
    svgBox(70,190,180,50,['باتری',bInfo],'batteryGrad','🔋')+
    svgArr(160,240,160,280,'','right')+
    svgBox(70,280,180,50,['اینورتر'],'inverterGrad','⚙️')+
    svgArr(160,330,160,370,'AC '+toFa(prot.acOut)+'A','right')+
    svgBox(70,370,180,50,['لودها'],'loadGrad','🏠')};
  return{vb:'0 0 400 260',body:
    svgBox(110,8,180,50,pL,'panelGrad','☀️')+
    svgArr(200,58,200,96,pvB,'right')+
    svgBox(110,96,180,54,['اینورتر هیبریدی'],'inverterGrad','⚡')+
    svgArr(170,150,70,190,prot.bBrk?toFa(prot.bBrk)+'A':'','left')+
    svgBox(10,190,120,50,['باتری',bInfo],'batteryGrad','🔋')+
    svgArr(200,150,200,190,'AC '+toFa(prot.acOut)+'A','right')+
    svgBox(140,190,120,50,['لودها'],'loadGrad','🏠')+
    svgArr(290,150,360,190,prot.acGrid?toFa(prot.acGrid)+'A':'','right')+
    svgBox(300,190,90,50,['شبکه'],'gridGrad','⚡')};
}
function renderDiag(sT,nP,wP,prot,bKwh,bV){
  const box=$('#diagramBox');if(!box)return;
  const bi=sT!=='ongrid'?num(bKwh,1)+'kWh / '+toFa(bV)+'V':'';
  const d=buildDiag(sT,nP,wP,prot,bi);
  box.innerHTML='<div class="chart-card"><div class="chart-head"><span class="chart-icon">🗺️</span><h4>شماتیک سیستم</h4></div><div class="chart-svg-wrap"><svg viewBox="'+d.vb+'" style="width:100%;height:auto;display:block;">'+SVG_M+d.body+'</svg></div><p class="chart-note">💡 ساده‌شده — ارت و SPD در نقشه نهایی اضافه شود.</p></div>';
}
function renderChart(dKwh){
  const box=$('#consumptionChartBox');if(!box)return;
  const isDark=document.documentElement.classList.contains('dark');
  const inkColor=isDark?'#F1F5F9':'#0F172A';
  const inkSoft=isDark?'#94A3B8':'#64748B';
  const lineColor=isDark?'#334155':'#CBD5E1';
  const periods=[
    {l:currentLang==='en'?'Daily':'روزانه',v:dKwh,color:'#0D9488',grad:'chartGrad1'},
    {l:currentLang==='en'?'Monthly':'ماهانه',v:dKwh*30,color:'#F59E0B',grad:'chartGrad2'},
    {l:currentLang==='en'?'Yearly':'سالانه',v:dKwh*365,color:'#8B5CF6',grad:'chartGrad3'}
  ];
  const H=140,bW=70,gap=30,baseY=170;
  const maxL=Math.log10(Math.max(dKwh*365,1)+1)||1;
  const defs='<defs>'+
    '<linearGradient id="chartGrad1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#14B8A6"/><stop offset="100%" stop-color="#0D9488"/></linearGradient>'+
    '<linearGradient id="chartGrad2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FBBF24"/><stop offset="100%" stop-color="#F59E0B"/></linearGradient>'+
    '<linearGradient id="chartGrad3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#A78BFA"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient>'+
    '<filter id="barShadow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/><feOffset dx="0" dy="3" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>'+
    '</defs>';
  let bars='';
  periods.forEach((p,i)=>{
    const x=25+i*(bW+gap);
    const h=Math.max(4,(Math.log10(p.v+1)/maxL)*H);
    const y=baseY-h;
    bars+='<text x="'+(x+bW/2)+'" y="'+(y-10)+'" text-anchor="middle" font-size="13" font-weight="800" font-family="Vazirmatn,system-ui,sans-serif" fill="'+p.color+'">'+num(p.v,1)+'</text>';
    bars+='<rect x="'+x+'" y="'+y+'" width="'+bW+'" height="'+h+'" rx="10" fill="url(#'+p.grad+')" filter="url(#barShadow)"><animate attributeName="height" from="0" to="'+h+'" dur="0.7s" fill="freeze"/><animate attributeName="y" from="'+baseY+'" to="'+y+'" dur="0.7s" fill="freeze"/></rect>';
    bars+='<text x="'+(x+bW/2)+'" y="'+(baseY+22)+'" text-anchor="middle" font-size="12" font-weight="600" font-family="Vazirmatn,system-ui,sans-serif" fill="'+inkColor+'">'+p.l+'</text>';
    bars+='<text x="'+(x+bW/2)+'" y="'+(baseY+38)+'" text-anchor="middle" font-size="9" font-family="Vazirmatn,system-ui,sans-serif" fill="'+inkSoft+'">kWh</text>';
  });
  const vbW=25+periods.length*(bW+gap)+15;
  box.innerHTML='<div class="chart-card"><div class="chart-head"><span class="chart-icon">📊</span><h4>'+(currentLang==='en'?'Electricity consumption':'مصرف برق')+'</h4></div><div class="chart-svg-wrap"><svg viewBox="0 0 '+vbW+' 200" style="width:100%;height:auto;display:block;">'+defs+'<line x1="15" y1="'+baseY+'" x2="'+(vbW-15)+'" y2="'+baseY+'" stroke="'+lineColor+'" stroke-width="1.5" stroke-dasharray="3,3"/>'+bars+'</svg></div></div>';
}

/* ===== PROTECTION & BANNER RENDERERS ===== */
function renderProt(sT,p){
  const box=$('#protectionResults');if(!box)return;
  const items=[];
  items.push({icon:'🔲',label:currentLang==='en'?'Main DC breaker':'بریکر DC اصلی',value:toFa(p.pvBrk)+'A',color:'#0D9488',bg:'linear-gradient(135deg,#CCFBF1,#99F6E4)'});
  if(p.sFuseNeeded)items.push({icon:'⚡',label:currentLang==='en'?'String fuse':'فیوز رشته',value:toFa(p.sFuse)+'A',color:'#F59E0B',bg:'linear-gradient(135deg,#FEF3C7,#FDE68A)'});
  if(p.bBrk)items.push({icon:'🔋',label:currentLang==='en'?'Battery breaker':'بریکر باتری',value:toFa(p.bBrk)+'A',color:'#8B5CF6',bg:'linear-gradient(135deg,#EDE9FE,#DDD6FE)'});
  items.push({icon:'🔌',label:currentLang==='en'?'AC output breaker':'بریکر AC خروجی',value:toFa(p.acOut)+'A',color:'#EF4444',bg:'linear-gradient(135deg,#FEE2E2,#FECACA)'});
  if(p.acGrid)items.push({icon:'⚡',label:currentLang==='en'?'Grid breaker':'بریکر برق شهری',value:toFa(p.acGrid)+'A',color:'#3B82F6',bg:'linear-gradient(135deg,#DBEAFE,#BFDBFE)'});
  box.innerHTML='<div class="prot-grid">'+items.map(it=>
    '<div class="prot-item" style="background:'+it.bg+';"><div class="prot-icon">'+it.icon+'</div><div class="prot-info"><div class="prot-label">'+it.label+'</div><div class="prot-value" style="color:'+it.color+';">'+it.value+'</div></div></div>'
  ).join('')+'</div><p class="chart-note" style="margin-top:10px;">⚠️ '+(currentLang==='en'?'Final approval by a licensed electrician is required.':'تایید نهایی توسط برق‌کار مجاز الزامی است.')+'</p>';
}
function renderBanner(sT,aKw,nP,wP,invKw,bV,bBank,bType){
  const box=$('#recommendBanner');if(!box)return;
  const btL={lithium:'LiFePO₄','li-ion':'Li-ion',gel:'Gel',dry:'AGM',lead:'Lead'}[bType]||'';
  let ch='';
  ch+='<span class="rb-chip">☀️ '+toFa(nP)+'×'+toFa(wP)+'W</span>';
  ch+='<span class="rb-chip">⚡ '+num(aKw,2)+' kW</span>';
  if(sT!=='ongrid'){
    ch+='<span class="rb-chip">🔧 '+toFa(bV)+'V</span>';
    if(bBank&&bBank.total>0&&bBank.unitAh)ch+='<span class="rb-chip">🔋 '+btL+' '+toFa(bBank.unitAh)+'Ah×'+toFa(bBank.total)+'</span>';
  }
  ch+='<span class="rb-chip gold">⚙️ '+num(invKw,1)+'kW</span>';
  box.innerHTML='<div class="rb-title">🎯 '+(currentLang==='en'?'Recommended system':'سیستم پیشنهادی')+'</div><div class="rb-items">'+ch+'</div>';
}

/* ===== AUTO TAGS ===== */
let battVAuto=true,battPAuto=true;
function updateAutoTags(){
  const vt=$('#voltageAutoTag'),pt=$('#packAutoTag');
  if(vt)vt.textContent=battVAuto?'🎯 خودکار':'';
  if(pt)pt.textContent=battPAuto?'🎯 خودکار':'';
}
const bvSel=$('#batteryVoltage');
if(bvSel)bvSel.addEventListener('change',()=>{battVAuto=false;updateAutoTags();});
['batteryUnitVoltage','batteryUnitAh','batteryCount'].forEach(id=>{
  const e=document.getElementById(id);if(!e)return;
  const h=()=>{battPAuto=false;updateAutoTags();};
  e.addEventListener('input',h);e.addEventListener('change',h);
});
const rab=$('#resetAutoBtn');
if(rab)rab.addEventListener('click',()=>{battVAuto=true;battPAuto=true;updateAutoTags();recalc();showToast(t('autoOn'),'info');});
updateAutoTags();

/* ===== PDF MANUAL EXTRACTION ===== */
const INST_KW=['install','mounting','wiring','wire size','cable','terminal','torque','ground','earth','clearance','ventilation','bracket','circuit breaker','fuse','pv input','ac output','battery connection','ambient temperature','ip rating','altitude'];
const PROG_KW=['program','setting','parameter','menu','lcd','battery type','battery capacity','configuration','setup','mode selection','charge current','float voltage','bulk voltage','absorption','dip switch','firmware','battery voltage setting','utility mode','output priority','charger source priority','low voltage cut'];
function extractManual(txt){
  const lines=txt.split(/\n|(?<=\.)\s(?=[A-Z0-9•\-])/).map(l=>l.replace(/\s+/g,' ').trim()).filter(l=>l.length>12&&l.length<260);
  function collect(kw,max){const seen=new Set(),out=[];for(const l of lines){if(out.length>=max)break;const lo=l.toLowerCase();if(kw.some(k=>lo.includes(k))&&!seen.has(lo)){seen.add(lo);out.push(l);}}return out;}
  return {inst:collect(INST_KW,12),prog:collect(PROG_KW,12)};
}
function renderManual(result,fn){
  const box=$('#manualExtractBox');if(!box)return;
  if(!result||(!result.inst.length&&!result.prog.length)){
    box.style.display='block';
    box.innerHTML='<div class="chart-card"><p class="note">'+t('notFound')+'</p></div>';
    return;
  }
  function tbl(rows){
    if(!rows.length)return '<p class="note">—</p>';
    return '<table class="manual-table"><tbody>'+rows.map((r,i)=>'<tr><th>'+toFa(i+1)+'</th><td>'+esc(r)+'</td></tr>').join('')+'</tbody></table>';
  }
  box.style.display='block';
  box.innerHTML='<div class="chart-card"><div class="chart-head"><span class="chart-icon">📄</span><h4>'+esc(fn||'یوزر منوال')+'</h4></div>'+
    '<div class="manual-section"><h4>🛠️ '+(currentLang==='en'?'Installation':'نصب')+'</h4>'+tbl(result.inst)+'</div>'+
    '<div class="manual-section"><h4>⚙️ '+(currentLang==='en'?'Programming':'پروگرام')+'</h4>'+tbl(result.prog)+'</div></div>';
}
let curManual=null,curManualFile='';
const manUpBtn=$('#manualUploadBtn');
if(manUpBtn)manUpBtn.addEventListener('click',()=>{const mu=$('#manualUpload');if(mu)mu.click();});
const manUp=$('#manualUpload');
if(manUp)manUp.addEventListener('change',async function(e){
  const f=e.target.files[0];if(!f)return;
  const st=$('#manualStatus');if(st)st.textContent=currentLang==='en'?'Reading…':'خواندن...';
  try{
    if(!window.pdfjsLib){if(st)st.textContent='PDF.js';return;}
    const buf=await f.arrayBuffer();
    const pdf=await pdfjsLib.getDocument({data:buf}).promise;
    let txt='';
    for(let p=1;p<=pdf.numPages;p++){
      if(st)st.textContent=(currentLang==='en'?'Page ':'صفحه ')+toFa(p)+'/'+toFa(pdf.numPages);
      const pg=await pdf.getPage(p);
      const c=await pg.getTextContent();
      txt+=c.items.map(it=>it.str).join(' ')+'\n';
    }
    const ext=extractManual(txt);curManual=ext;curManualFile=f.name;
    renderManual(ext,f.name);
    if(st)st.textContent='✅ '+f.name;
  }catch{
    if(st)st.textContent=currentLang==='en'?'PDF error':'خطا در PDF';
    curManual=null;curManualFile='';
  }
});

/* ===== PROGRESS / STATUS ===== */
function updateProgress(){
  const fields=['custName','dailyKwh','sunHours','panelWatt'];
  if(systemType!=='ongrid')fields.push('autonomyDays','batteryType');
  const filled=fields.filter(id=>{const e=document.getElementById(id);return e&&e.value&&String(e.value).trim()!=='';}).length;
  const pct=Math.round((filled/fields.length)*100);
  const bar=$('#progressBar');if(bar)bar.style.width=pct+'%';
}
function updateStatusBar(){
  const q=window.__currentQuote;if(!q)return;
  const skw=$('#statusKw'),sp=$('#statusPanels'),st=$('#statusTotal');
  if(skw)skw.textContent=num(q.actualKw||0,1)+' kW';
  if(sp)sp.textContent=toFa(q.panelCount||0)+' '+(currentLang==='en'?'panels':'پنل');
  if(st)st.textContent=q.grandTotal?money(q.grandTotal,q.currency):'—';
}
function renderQuoteCards(rows){
  const container=$('#quoteItems');if(!container)return;
  container.innerHTML=rows.map(r=>
    '<div class="quote-item"><div class="qi-title">'+r[0]+'</div>'+
    '<div class="qi-row"><span>'+(currentLang==='en'?'Qty':'تعداد')+'</span><b>'+r[1]+'</b></div>'+
    '<div class="qi-row"><span>'+(currentLang==='en'?'Unit price':'قیمت واحد')+'</span><b>'+r[2]+'</b></div>'+
    '<div class="qi-row"><span>'+(currentLang==='en'?'Total':'قیمت کل')+'</span><b>'+r[3]+'</b></div></div>'
  ).join('');
}

/* ===== DRAFT ===== */
const DRAFT_KEY='solarDraft';
function saveDraft(){
  try{
    const d={};
    ['custName','custPhone','custAddr','dailyKwh','monthlyKwh','sunHours','panelWatt','autonomyDays','batteryVoltage','batteryType','batteryUnitVoltage','batteryUnitAh','batteryCount','peakPower','cableLenPanel','cableLenBattery','priceInverterManual','priceBatteryManual','priceControllerManual','inverterModel','installerNotes','warrantyYears','paymentTerms','paymentCustom','elecRate'].forEach(id=>{const e=document.getElementById(id);if(e)d[id]=e.value;});
    d._st=systemType;d._cm=consMode;d._ts=Date.now();
    localStorage.setItem(DRAFT_KEY,JSON.stringify(d));
  }catch{}
}
function loadDraft(){try{const r=localStorage.getItem(DRAFT_KEY);if(!r)return null;const d=JSON.parse(r);if(Date.now()-(d._ts||0)>7*86400000)return null;return d;}catch{return null;}}
function restoreDraft(){
  const d=loadDraft();if(!d)return;
  Object.entries(d).forEach(([k,v])=>{if(k.startsWith('_'))return;const e=document.getElementById(k);if(e)e.value=v;});
  if(d._st){systemType=d._st;syncSysUI();}
  if(d._cm){consMode=d._cm;syncConsUI();}
  if(d.warrantyYears)settings.warrantyYears=+d.warrantyYears;
  if(d.paymentTerms)settings.paymentTerms=d.paymentTerms;
  if(d.paymentCustom)settings.paymentCustom=d.paymentCustom;
  if(d.elecRate){settings.elecRate=+d.elecRate;const er=$('#elecRate');if(er)er.dataset.touched='1';}
  syncPayCustom();
}
const debouncedDraft=debounce(saveDraft,1000);

/* ===== RECALC ===== */
let quoteCounter;
try{quoteCounter=+(localStorage.getItem('solarQC')||'1');}catch{quoteCounter=1;}
const qnEl=$('#quoteNo');if(qnEl)qnEl.textContent='#'+toFa(quoteCounter);

function getDailyKwh(){
  if(consMode==='daily')return +($('#dailyKwh')?.value)||0;
  if(consMode==='bill')return (+($('#monthlyKwh')?.value)||0)/30;
  return appDailyWh()/1000;
}
function recalc(){
  const dKwh=getDailyKwh();
  const sunH=+($('#sunHours')?.value)||5;
  const shade=$('#shadingLevel')?.value;
  const shadeFactor=shade==='significant'?0.70:shade==='partial'?0.90:1.0;
  const eff=Math.max(.3,(1-LOSS)*shadeFactor);
  const pW=+($('#panelWatt')?.value)||550;
  const pSpec=PANEL_SPECS[pW]||{vmp:pW/13,imp:13};

  let peakW=+($('#peakPower')?.value)||0;
  if(!peakW)peakW=(dKwh*1000)/4;

  const reqKw=sunH>0?dKwh/(sunH*eff):0;
  const rawN=Math.ceil((reqKw*1000)/pW)||0;
  const rawKw=(rawN*pW)/1000;

  let roughInv;
  if(systemType==='ongrid')roughInv=rawKw*.92;
  else roughInv=Math.max(rawKw*.9,peakW/1000*1.25);

  let battV;const vNote=$('#voltageRecommendNote');
  if(systemType==='ongrid'){battV=24;if(vNote)vNote.textContent='';}
  else if(battVAuto){
    battV=recSysV(roughInv);
    const sel=$('#batteryVoltage');if(sel&&+sel.value!==battV)sel.value=String(battV);
    if(vNote)vNote.textContent=(currentLang==='en'?'Auto':'خودکار')+' ('+num(roughInv,1)+'kW)';
  }else{
    battV=+($('#batteryVoltage')?.value)||24;
    if(vNote)vNote.textContent=currentLang==='en'?'Manual':'دستی';
  }

  const panW=calcPW(rawN,pSpec,systemType,battV);
  const panelCount=panW.total||rawN;
  const actualKw=(panelCount*pW)/1000;

  let needInv;
  if(systemType==='ongrid')needInv=actualKw*.92;
  else needInv=Math.max(actualKw*.9,peakW/1000*1.25);
  const invKw=ru(STD_INV,Math.max(.5,needInv));

  let bKwh=0,bAh=0,bBank=null,chgCur=0,bMaxA=0,chgWarn=false;
  const pNote=$('#packRecommendNote');
  if(systemType!=='ongrid'){
    const autoDays=+($('#autonomyDays')?.value)||1;
    const bType=$('#batteryType')?.value||'lithium';
    const ch=bc(bType);
    bKwh=ch.dod>0?(dKwh*autoDays)/ch.dod:0;
    bAh=battV>0?(bKwh*1000)/battV:0;
    let uV,uAh,cnt;
    if(battPAuto){
      const rec=recBattPack(bAh,battV,bType);
      uV=rec.unitV;uAh=rec.unitAh;cnt=rec.total;
      const buvEl=$('#batteryUnitVoltage'),buaEl=$('#batteryUnitAh'),bcEl=$('#batteryCount');
      if(buvEl)buvEl.value=String(uV);if(buaEl)buaEl.value=uAh;if(bcEl)bcEl.value=cnt;
      if(pNote)pNote.textContent=(currentLang==='en'?'Auto: 12V→':'خودکار: ۱۲V→')+toFa(battV)+'V';
    }else{
      uV=+($('#batteryUnitVoltage')?.value)||battV;
      uAh=+($('#batteryUnitAh')?.value)||0;
      cnt=+($('#batteryCount')?.value)||0;
      if(pNote)pNote.textContent=currentLang==='en'?'Manual':'دستی';
    }
    bBank=calcBB(bAh,battV,uV,uAh,cnt);
    bBank.unitAh=uAh;
    chgCur=battV>0?(actualKw*1000*.95)/battV:0;
    bMaxA=bBank.totalAh>0?bBank.totalAh*ch.cRate:0;
    chgWarn=bMaxA>0&&chgCur>bMaxA;
  }else{if(pNote)pNote.textContent='';}

  let ctrl=null;
  if(systemType!=='ongrid')ctrl=calcCtrl(panW.arrayA);

  renderCompat(selectedPreset,panW,battV);

  const cLP=+($('#cableLenPanel')?.value)||15;
  const cLB=+($('#cableLenBattery')?.value)||2;
  const mainA=pSpec.vmp>0?((actualKw*1000)/pSpec.vmp)*1.25:0;
  const mainW=pwWire(mainA);
  const mainVd=vd(mainA/1.25,cLP,mainW.mm2,pSpec.vmp);
  const strA=pSpec.imp*1.25;
  const strW=pwWire(strA);
  let bCable=null;
  if(systemType!=='ongrid'){
    const bA=(Math.max(actualKw*1000,peakW||0)/battV)*1.25;
    const bW=pwWire(bA);
    bCable={cur:bA/1.25,wire:bW,vdrop:vd(bA/1.25,cLB,bW.mm2,battV)};
  }

  let pkgH='';
  pkgH+='<div class="note">📐 '+num(dKwh,2)+'kWh ÷ '+num(sunH,1)+'h ÷ '+toFa(Math.round(eff*100))+'٪ = <b>'+num(reqKw,2)+'kW</b> → '+toFa(rawN)+' '+(currentLang==='en'?'panels':'پنل')+'</div>';
  if(panW.total!==rawN)pkgH+='<div class="note">🔧 → '+toFa(panW.total)+' '+(currentLang==='en'?'panels':'پنل')+'</div>';
  pkgH+='<div>☀️ <b>'+toFa(panW.series)+'</b> '+(currentLang==='en'?'series':'سری')+' × <b>'+toFa(panW.par)+'</b> '+(currentLang==='en'?'parallel':'موازی')+' = <b>'+toFa(panW.total)+'</b> — '+panW.wType+'</div>';
  pkgH+='<div>⚡ '+num(panW.arrayV,1)+'V | '+num(panW.arrayA,1)+'A</div>';
  if(systemType!=='ongrid'&&bBank){
    if(bBank.total>0){
      pkgH+='<div>🔋 <b>'+toFa(bBank.sps)+'</b> '+(currentLang==='en'?'s':'سری')+' × <b>'+toFa(bBank.par)+'</b> '+(currentLang==='en'?'p':'موازی')+' = <b>'+toFa(bBank.total)+'</b> — '+bBank.wType+'</div>';
      if(bBank.totalAh>0)pkgH+='<div>📦 '+num(bBank.totalAh,0)+'Ah ('+(currentLang==='en'?'need ':'نیاز: ')+num(bAh,0)+'Ah)</div>';
    }
    pkgH+='<div>🔌 '+(currentLang==='en'?'Charge:':'شارژ:')+' <b>'+num(chgCur,1)+'A</b></div>';
    if(chgWarn)pkgH+='<div style="color:#EF4444;">⚠️ '+(currentLang==='en'?'Over limit':'بیش از حد مجاز')+' ('+num(bMaxA,1)+'A)</div>';
    if(actualKw>0&&bKwh>0)pkgH+='<div>⏱️ ~'+num(bKwh/(actualKw*CHG_EFF),1)+' '+(currentLang==='en'?'h charge':'ساعت شارژ')+'</div>';
  }
  const pkgBox=$('#packagingResults');if(pkgBox)pkgBox.innerHTML=pkgH;

  const ctrlBox=$('#controllerResults');
  if(ctrlBox&&ctrl){
    let ch='<div>🎛️ '+(currentLang==='en'?'Charge controller:':'شارژ کنترلر:')+' <b>'+toFa(ctrl.rated)+'A</b></div>';
    ctrlBox.innerHTML=ch;
  }else if(ctrlBox)ctrlBox.innerHTML='';

  const cabBox=$('#cablingResults');
  if(cabBox)cabBox.innerHTML=
    '<div>🔌 '+(currentLang==='en'?'String:':'رشته:')+' '+num(strA/1.25,1)+'A → <b>'+toFa(strW.mm2)+'mm²</b></div>'+
    '<div>🔌 '+(currentLang==='en'?'DC main:':'اصلی DC:')+' '+num(mainA/1.25,1)+'A → <b>'+toFa(mainW.mm2)+'mm²</b> ('+num(mainVd,2)+'٪)</div>'+
    (bCable?'<div>🔋 '+(currentLang==='en'?'Battery:':'باتری:')+' '+num(bCable.cur,1)+'A → <b>'+toFa(bCable.wire.mm2)+'mm²</b> ('+num(bCable.vdrop,2)+'٪)</div>':'');

  const prot=calcProt(systemType,panW,bCable,battV,invKw,pSpec);
  renderProt(systemType,prot);
  renderDiag(systemType,panelCount,pW,prot,bKwh,battV);
  renderChart(dKwh);

  const btBanner=systemType!=='ongrid'?($('#batteryType')?.value||null):null;
  renderBanner(systemType,actualKw,panelCount,pW,invKw,battV,bBank,btBanner);

  const cur=settings.currency;
  const ppw=settings.panelPrice[cur]||0;
  const panelCost=panelCount*pW*ppw;
  const invCost=+($('#priceInverterManual')?.value)||0;
  const batCost=systemType!=='ongrid'?(+($('#priceBatteryManual')?.value)||0):0;
  const ctrlCost=systemType==='offgrid'?(+($('#priceControllerManual')?.value)||0):0;
  const grandTotal=panelCost+invCost+batCost+ctrlCost;

  const sysLabels={ongrid:currentLang==='en'?'On-Grid':'متصل به شبکه',offgrid:currentLang==='en'?'Off-Grid':'مستقل',hybrid:currentLang==='en'?'Hybrid':'هیبریدی'};
  const qsl=$('#quoteSystemLabel');if(qsl)qsl.textContent=sysLabels[systemType];
  const dt=new Date();
  const qd=$('#quoteDate');if(qd)qd.textContent=dt.toLocaleDateString(currentLang==='en'?'en-US':'fa-IR');

  const bb=$('#quoteBrand'),bl=$('#quoteBrandLogo'),bn=$('#quoteBrandName');
  if(bb){
    if(settings.logo||settings.bizName){
      bb.style.display='flex';
      if(bl){bl.src=settings.logo;bl.style.display=settings.logo?'block':'none';}
      if(bn)bn.textContent=settings.bizName||'';
    }else{bb.style.display='none';}
  }
  const custName=($('#custName')?.value||'').trim();
  const custPhone=($('#custPhone')?.value||'').trim();
  const custAddr=($('#custAddr')?.value||'').trim();
  let recap='';
  if(custName)recap+='<b>'+(currentLang==='en'?'Customer:':'مشتری:')+'</b> '+esc(custName)+' ';
  if(custPhone)recap+='<b>'+(currentLang==='en'?'Phone:':'تماس:')+'</b> '+esc(custPhone)+' ';
  if(custAddr)recap+='<br><b>'+(currentLang==='en'?'Address:':'آدرس:')+'</b> '+esc(custAddr);
  const cr=$('#custRecap');
  if(cr)cr.innerHTML=recap||'<span class="note">—</span>';

  const producedDaily=actualKw*sunH*eff;
  const covPct=dKwh>0?Math.min(150,(producedDaily/dKwh)*100):100;
  const circ=226,offset=circ-(Math.min(100,covPct)/100)*circ;
  const ga=$('#gaugeArc');if(ga)ga.setAttribute('stroke-dashoffset',offset);
  const gp=$('#gaugePct');if(gp)gp.textContent=toFa(Math.round(covPct))+'٪';
  const gc=$('#gaugeCapacity');if(gc)gc.textContent=num(actualKw,2)+' kW';
  const gl=$('#gaugeLabel');if(gl)gl.textContent=(currentLang==='en'?'Coverage ':'پوشش ')+toFa(Math.round(covPct))+'٪';

  const rows=[];
  rows.push([(currentLang==='en'?'Panel ':'پنل ')+toFa(pW)+'W',toFa(panelCount)+' '+(currentLang==='en'?'pcs':'عدد'),money(pW*ppw),money(panelCost)]);
  const invModel=($('#inverterModel')?.value||'').trim();
  rows.push([(currentLang==='en'?'Inverter ':'اینورتر ')+num(invKw,1)+'kW'+(invModel?' — '+esc(invModel):''),'۱',money(invCost),money(invCost)]);
  if(systemType!=='ongrid')rows.push([(currentLang==='en'?'Battery ':'باتری (')+num(bKwh,1)+'kWh)','۱',money(batCost),money(batCost)]);
  if(systemType==='offgrid'&&ctrlCost>0&&ctrl)rows.push([(currentLang==='en'?'Controller ':'شارژ کنترلر ')+toFa(ctrl.rated)+'A','۱',money(ctrlCost),money(ctrlCost)]);
  renderQuoteCards(rows);

  const tb=$('#totalsBox');
  if(tb)tb.innerHTML='<div class="total-line"><span>'+(currentLang==='en'?'Grand Total':'مبلغ نهایی')+'</span><span><b>'+money(grandTotal)+'</b></span></div>';

  const instNotes=($('#installerNotes')?.value||'').trim();
  const nb=$('#installerNotesBox');
  if(nb){
    if(instNotes){nb.style.display='block';nb.innerHTML='<b>📋 '+(currentLang==='en'?'Notes:':'یادداشت:')+'</b><br>'+esc(instNotes).replace(/\n/g,'<br>');}
    else{nb.style.display='none';nb.innerHTML='';}
  }

  /* ===== ROI ===== */
  const roiBox=$('#roiBox');
  if(roiBox){
    const elecRate=+($('#elecRate')?.value)||0;
    const annualProd=actualKw*sunH*365*eff;
    const annualSav=annualProd*elecRate;
    const monthlySav=annualSav/12;
    const paybackYears=annualSav>0?grandTotal/annualSav:Infinity;
    const co2=annualProd*0.45; // kg CO2/kWh (grid mix ~ AF region approx)
    const isEn=currentLang==='en';
    const pb=!isFinite(paybackYears)?'—':(paybackYears<1?'<1 '+ (isEn?'year':'سال'):num(paybackYears,1)+' '+(isEn?'years':'سال'));
    roiBox.innerHTML=
      '<div class="roi-card">'+
        '<div class="rb-title" style="color:#fff;margin-bottom:10px;">'+t('roiTitle')+'</div>'+
        '<div class="roi-grid">'+
          '<div class="roi-stat"><div class="lbl">'+t('roiSave')+'</div><div class="val">'+money(monthlySav,cur)+'</div></div>'+
          '<div class="roi-stat"><div class="lbl">'+t('roiYear')+'</div><div class="val">'+money(annualSav,cur)+'</div></div>'+
          '<div class="roi-stat"><div class="lbl">'+t('roiPayback')+'</div><div class="val">'+pb+'</div></div>'+
          '<div class="roi-stat"><div class="lbl">'+t('roiCo2')+'</div><div class="val">'+num(co2/1000,1)+' t</div></div>'+
        '</div>'+
        '<div class="roi-note">'+t('roiNote')+'</div>'+
      '</div>';
  }

  /* ===== TERMS (warranty + payment) ===== */
  const termsBox=$('#termsBox');
  if(termsBox){
    const wY=+($('#warrantyYears')?.value)||0;
    const pT=$('#paymentTerms')?.value||'full';
    const pC=($('#paymentCustom')?.value||'').trim();
    const isEn=currentLang==='en';
    const payLabels={
      full:isEn?'100% upfront / Cash':'پرداخت نقدی ۱۰۰٪ پیش از نصب',
      split50:isEn?'50% upfront, 50% on delivery':'۵۰٪ پیش‌پرداخت، ۵۰٪ هنگام تحویل و راه‌اندازی',
      split30:isEn?'30% upfront, 70% over 3 months':'۳۰٪ پیش‌پرداخت، ۷۰٪ طی ۳ ماه بدون سود',
      install6:isEn?'6-month installments':'اقساط ۶ ماهه با چک',
      install12:isEn?'12-month installments':'اقساط ۱۲ ماهه',
      custom:pC||(isEn?'As agreed':'مطابق توافق طرفین')
    };
    termsBox.innerHTML=
      '<div class="terms-box">'+
        '<div class="terms-title">'+t('termsTitleWarranty')+'</div>'+
        '<ul class="terms-list">'+
          '<li>'+toFa(wY)+' '+t('termsWarrantyYears')+'</li>'+
          '<li>'+(isEn?'25':'۲۵')+' '+t('termsWarrantyPerf')+'</li>'+
          '<li>'+(isEn?'Panel + inverter + controller + structure + wiring':'پنل + اینورتر + کنترلر + استراکچر + کابل‌کشی شامل گارانتی')+'</li>'+
          '<li>'+(isEn?'Damages from negligence, natural disasters or unauthorized modifications not covered':'آسیب‌های ناشی از سهل‌انگاری، بلایای طبیعی و دستکاری شامل گارانتی نمی‌باشد')+'</li>'+
        '</ul>'+
        '<div class="terms-title" style="margin-top:10px;">'+t('termsTitlePay')+'</div>'+
        '<ul class="terms-list">'+
          '<li>'+esc(payLabels[pT]||payLabels.full)+'</li>'+
          '<li>'+(isEn?'Quote valid for 15 days':'اعتبار پیش‌فاکتور ۱۵ روز')+'</li>'+
          '<li>'+(isEn?'Prices may change with exchange-rate fluctuations':'قیمت‌ها نقدی و با نرخ روز ممکن است تغییر کند')+'</li>'+
        '</ul>'+
      '</div>';
  }

  updateProgress();
  debouncedDraft();
  window.__currentQuote={
    id:Date.now(),no:quoteCounter,date:dt.toISOString(),
    systemType,custName,custPhone,custAddr,
    dailyKwh:dKwh,actualKw,panelCount,panelWatt:pW,inverterKw:invKw,
    batteryKwh:bKwh,inverterCost:invCost,batteryCost:batCost,controllerCost:ctrlCost,
    grandTotal,currency:settings.currency,
    inverterModel:invModel,installerNotes:instNotes,
    manualExtract:curManual,manualFileName:curManualFile,
    warrantyYears:+($('#warrantyYears')?.value)||0,
    paymentTerms:$('#paymentTerms')?.value||'full',
    paymentCustom:($('#paymentCustom')?.value||'').trim(),
    elecRate:+($('#elecRate')?.value)||0,
    annualProd:actualKw*sunH*365*eff,
    annualSav:(actualKw*sunH*365*eff)*((+($('#elecRate')?.value)||0)),
    sunHours:sunH,
    shading:shade,
    panelPricePerW:ppw
  };
  updateStatusBar();
}

  const debouncedRecalc=debounce(recalc,100);
  ['dailyKwh','monthlyKwh','sunHours','panelWatt','autonomyDays','batteryVoltage','batteryType',
   'batteryUnitVoltage','batteryUnitAh','batteryCount','peakPower','custName','custPhone','custAddr',
   'cableLenPanel','cableLenBattery','priceInverterManual','priceBatteryManual','priceControllerManual',
   'inverterModel','installerNotes','warrantyYears','paymentTerms','paymentCustom','elecRate','shadingLevel'
  ].forEach(id=>{
    const e=document.getElementById(id);if(!e)return;
    e.addEventListener('input',debouncedRecalc);
    if(e.tagName==='SELECT')e.addEventListener('change',debouncedRecalc);
  });
  $('#elecRate')?.addEventListener('input',()=>{const er=$('#elecRate');if(er)er.dataset.touched='1';});

/* ===== HISTORY with search + filter ===== */
let histFilter='all', histQuery='';
function loadHist(){try{return JSON.parse(localStorage.getItem('solarHist')||'[]');}catch{return[];}}
function saveHist(l){try{localStorage.setItem('solarHist',JSON.stringify(l));}catch{}}

function renderHistory(){
  const list=loadHist();
  const box=$('#historyList');if(!box)return;
  const q=histQuery.trim().toLowerCase();
  let filtered=list.slice().reverse();
  if(histFilter!=='all')filtered=filtered.filter(x=>x.systemType===histFilter);
  if(q){
    filtered=filtered.filter(x=>{
      return (x.custName||'').toLowerCase().includes(q)||
             (x.custPhone||'').toLowerCase().includes(q)||
             String(x.grandTotal||'').includes(q)||
             (x.currency||'').toLowerCase().includes(q)||
             (x.inverterModel||'').toLowerCase().includes(q);
    });
  }
  if(!list.length){box.innerHTML='<div class="empty">'+t('histEmpty')+'</div>';$('#histActions').style.display='none';return;}
  if(!filtered.length){box.innerHTML='<div class="empty">'+t('notFound')+'</div>';return;}
  const actions=$('#histActions');if(actions)actions.style.display='flex';
  box.innerHTML=filtered.map(q=>{
    const dt=new Date(q.date).toLocaleDateString(currentLang==='en'?'en-US':'fa-IR');
    return '<div class="history-item">'+
      '<div class="h-main">'+
        '<div class="h-top">#'+toFa(q.no)+' — '+esc(q.custName||'—')+'</div>'+
        '<div class="h-sub">'+dt+' • '+money(q.grandTotal,q.currency)+' • '+((q.systemType==='ongrid'?'🔌':q.systemType==='offgrid'?'🔋':'⚡')||'')+' '+esc(q.systemType||'')+'</div>'+
      '</div>'+
      '<span class="h-actions">'+
        '<button data-load="'+q.id+'" title="'+t('loaded')+'">↩️</button>'+
        '<button class="del" data-del="'+q.id+'" title="'+t('deleted')+'">🗑</button>'+
      '</span>'+
    '</div>';
  }).join('');
  box.querySelectorAll('[data-del]').forEach(b=>{
    b.addEventListener('click',()=>{saveHist(loadHist().filter(q=>q.id!==+b.dataset.del));renderHistory();showToast(t('deleted'),'info');});
  });
  box.querySelectorAll('[data-load]').forEach(b=>{
    b.addEventListener('click',()=>{
      const q=loadHist().find(x=>x.id===+b.dataset.load);if(!q)return;
      const cn=$('#custName');if(cn)cn.value=q.custName||'';
      const cp=$('#custPhone');if(cp)cp.value=q.custPhone||'';
      const ca=$('#custAddr');if(ca)ca.value=q.custAddr||'';
      const dk=$('#dailyKwh');if(dk)dk.value=q.dailyKwh;
      systemType=q.systemType;syncSysUI();
      battVAuto=false;battPAuto=false;updateAutoTags();
      const pi=$('#priceInverterManual');if(pi)pi.value=q.inverterCost||'';
      const pb=$('#priceBatteryManual');if(pb)pb.value=q.batteryCost||'';
      const pc=$('#priceControllerManual');if(pc)pc.value=q.controllerCost||'';
      const im=$('#inverterModel');if(im)im.value=q.inverterModel||'';
      const in_=$('#installerNotes');if(in_)in_.value=q.installerNotes||'';
      const wy=$('#warrantyYears');if(wy)wy.value=q.warrantyYears??5;
      const pt=$('#paymentTerms');if(pt)pt.value=q.paymentTerms||'full';
      const pcu=$('#paymentCustom');if(pcu)pcu.value=q.paymentCustom||'';
      syncPayCustom();
      const er=$('#elecRate');if(er){er.value=q.elecRate??8;er.dataset.touched='1';}
      if(q.currency){settings.currency=q.currency;saveSets();syncCurrency();}
      consMode='daily';syncConsUI();
      closeSheet('historyModal');
      recalc();
      showToast(t('loaded'));
    });
  });
}
const histSearch=$('#histSearch');
if(histSearch)histSearch.addEventListener('input',debounce(function(){histQuery=this.value;renderHistory();},120));
$$('#histFilters .hist-chip').forEach(chip=>{
  chip.addEventListener('click',()=>{
    $$('#histFilters .hist-chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    histFilter=chip.dataset.f||'all';
    renderHistory();
  });
});
$('#clearHistBtn')?.addEventListener('click',()=>{
  if(confirm(t('histClearConfirm'))){saveHist([]);renderHistory();showToast(t('delAll'),'warning');}
});
$('#exportHistBtn')?.addEventListener('click',()=>{
  const h=loadHist();if(!h.length){showToast(t('histEmpty'),'warning');return;}
  const blob=new Blob([JSON.stringify({app:'آفتاب‌یار',type:'history',version:1,date:new Date().toISOString(),items:h},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='aftabyar_history_'+new Date().toISOString().split('T')[0]+'.json';
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
});

/* ===== BACKUP / RESTORE ===== */
function renderBackupMeta(){
  const meta=$('#backupMeta');if(!meta)return;
  const h=loadHist();
  let size=0;
  try{size=JSON.stringify(localStorage).length;}catch{}
  const kb=(size/1024).toFixed(1);
  meta.textContent=t('bakVer')+': v5 • '+toFa(h.length)+' '+t('bakRec')+' • '+kb+' KB';
}
$('#exportBackupBtn')?.addEventListener('click',()=>{
  const backup={
    app:'آفتاب‌یار / Aftabyar',
    version:5,
    type:'full_backup',
    date:new Date().toISOString(),
    settings:localStorage.getItem('solarSettings')||null,
    history:localStorage.getItem('solarHist')||'[]',
    draft:localStorage.getItem('solarDraft')||null,
    counter:localStorage.getItem('solarQC')||'1',
    dark:localStorage.getItem('solarDark')||'0',
    lang:localStorage.getItem('solarLang')||'fa'
  };
  try{backup.settings=JSON.parse(backup.settings);backup.history=JSON.parse(backup.history);backup.draft=JSON.parse(backup.draft);}catch{}
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  const ds=new Date().toISOString().split('T')[0];
  a.download='aftabyar_backup_'+ds+'.json';
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
  showToast('📥 '+(currentLang==='en'?'Backup downloaded':'بک‌آپ دانلود شد'));
});
$('#importBackupBtn')?.addEventListener('click',()=>{$('#backupFileInput')?.click();});
$('#backupFileInput')?.addEventListener('change',function(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{
    try{
      const data=JSON.parse(ev.target.result);
      if(!data||!data.app||!data.app.includes('فتاب')&&data.app!=='آفتاب‌یار / Aftabyar'&&data.app.indexOf('Aftabyar')<0){
        throw new Error('not aftabyar');
      }
      if(data.settings)localStorage.setItem('solarSettings',typeof data.settings==='string'?data.settings:JSON.stringify(data.settings));
      if(data.history)localStorage.setItem('solarHist',typeof data.history==='string'?data.history:JSON.stringify(data.history));
      if(data.draft)localStorage.setItem('solarDraft',typeof data.draft==='string'?data.draft:JSON.stringify(data.draft));
      if(data.counter)localStorage.setItem('solarQC',String(data.counter));
      if(data.dark)localStorage.setItem('solarDark',String(data.dark));
      if(data.lang)localStorage.setItem('solarLang',String(data.lang));
      showToast(t('bakImported'),'success',3000);
      closeSheet('backupModal');
      setTimeout(()=>{location.reload();},900);
    }catch(err){
      console.error(err);showToast(t('bakFailed'),'error',4000);
    }
  };
  r.readAsText(f);
  e.target.value='';
});

/* ===== ACTIONS ===== */
function normPhone(r){let d=(r||'').replace(/[^\d]/g,'');if(!d)return'';if(d.startsWith('00'))d=d.slice(2);if(d.startsWith('0'))d='93'+d.slice(1);else if(d.length===9)d='93'+d;return d;}
const saveBtn=$('#saveBtn');
if(saveBtn)saveBtn.addEventListener('click',()=>{
  haptic();recalc();const q=window.__currentQuote;if(!q){showToast(t('noQuote'),'warning');return;}
  const l=loadHist();l.push(q);saveHist(l);
  quoteCounter++;localStorage.setItem('solarQC',quoteCounter);
  const qn=$('#quoteNo');if(qn)qn.textContent='#'+toFa(quoteCounter);
  showToast(t('saved'));
});
const waBtn=$('#whatsappBtn');
if(waBtn)waBtn.addEventListener('click',()=>{
  haptic();recalc();const q=window.__currentQuote;if(!q)return;
  const sL={ongrid:'متصل به شبکه',offgrid:'مستقل',hybrid:'هیبریدی'};
  let t_='پیش‌فاکتور #'+toFa(q.no)+'\n';
  if(settings.bizName)t_+=settings.bizName+'\n';
  if(q.custName)t_+='مشتری: '+q.custName+'\n';
  t_+='نوع: '+sL[q.systemType]+'\n';
  t_+='ظرفیت: '+num(q.actualKw,2)+'kW ('+toFa(q.panelCount)+' پنل)\n';
  t_+='مبلغ: '+money(q.grandTotal,q.currency);
  const ph=normPhone(q.custPhone);
  if(!ph)showToast(t('noPhone'),'warning');
  const enc=encodeURIComponent(t_);
  window.open(ph?'https://wa.me/'+ph+'?text='+enc:'https://wa.me/?text='+enc,'_blank');
});
const clearBtn=$('#clearBtn');
if(clearBtn)clearBtn.addEventListener('click',()=>{
  haptic();
  ['custName','custPhone','custAddr','priceInverterManual','priceBatteryManual','priceControllerManual','inverterModel','installerNotes','batteryUnitAh','batteryCount','peakPower','paymentCustom'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  const dk=$('#dailyKwh');if(dk)dk.value=8;
  const sl=$('#dailyKwhSlider');if(sl)sl.value=8;
  const sh=$('#sunHours');if(sh)sh.value=5.5;
  const pWEl=$('#panelWatt');if(pWEl)pWEl.value=550;
  const cp=$('#cityPreset');if(cp)cp.value='';
  const sd=$('#shadingLevel');if(sd)sd.value='none';
  const wy=$('#warrantyYears');if(wy)wy.value=5;
  const pt=$('#paymentTerms');if(pt)pt.value='full';
  syncPayCustom();
  systemType='ongrid';syncSysUI();
  consMode='daily';syncConsUI();
  battVAuto=true;battPAuto=true;updateAutoTags();
  selectedPreset=null;
  const ip=$('#inverterPreset');if(ip)ip.value='';
  const icb=$('#inverterCompatBox');if(icb)icb.style.display='none';
  const ar=$('#applianceRows');if(ar)ar.innerHTML='';
  addApp(currentLang==='en'?'Refrigerator':'یخچال',150,24,1);
  addApp(currentLang==='en'?'LED lights':'روشنایی LED',10,6,6);
  addApp(currentLang==='en'?'Water pump':'پمپ آب',750,2,1);
  curManual=null;curManualFile='';
  const mu=$('#manualUpload');if(mu)mu.value='';
  const ms=$('#manualStatus');if(ms)ms.textContent='';
  const mb=$('#manualExtractBox');if(mb){mb.style.display='none';mb.innerHTML='';}
  try{localStorage.removeItem(DRAFT_KEY);}catch{}
  recalc();showToast(t('cleared'),'info');
});

/* =============================================================
   IN-APP PDF VIEWER (uses pdfjsLib to render pages into canvases)
   This solves the Android "Open" problem: no external app, no tab,
   no pop-up blocker. PDF renders inside a full-screen viewer.
   ============================================================= */
let _viewerState = null;
function closePdfViewer(){
  const v=$('#pdfViewer');if(v){v.classList.remove('open');v.setAttribute('aria-hidden','true');}
  _viewerState=null;
  document.body.style.overflow='';
}
async function openPdfViewer(blob, filename){
  // Reset container
  const scroll=$('#pdfvScroll');
  const title=$('#pdfvTitle');
  if(!scroll||!window.pdfjsLib){showToast(t('libFail'),'error');return;}
  scroll.innerHTML='<div class="pdfv-loading" id="pdfvLoading">'+t('pdfLoading')+'</div>';
  const v=$('#pdfViewer');if(v){v.classList.add('open');v.setAttribute('aria-hidden','false');}
  document.body.style.overflow='hidden';
  if(title)title.textContent=filename||'PDF';
  haptic(10);
  try{
    const buf=await blob.arrayBuffer();
    const pdf=await pdfjsLib.getDocument({data:buf}).promise;
    _viewerState={pdf,blob,filename};
    scroll.innerHTML='';
    // Render each page as canvas
    const vpW=scroll.clientWidth-16;
    for(let i=1;i<=pdf.numPages;i++){
      const page=await pdf.getPage(i);
      const viewport=page.getViewport({scale:1});
      const scale=Math.min(vpW/viewport.width, 2.2);
      const vp=page.getViewport({scale});
      const wrap=document.createElement('div');
      wrap.className='pdfv-page';
      wrap.style.width=vp.width+'px';
      const canvas=document.createElement('canvas');
      const ctx=canvas.getContext('2d');
      const dpr=window.devicePixelRatio||1;
      canvas.width=vp.width*dpr;
      canvas.height=vp.height*dpr;
      canvas.style.width=vp.width+'px';
      canvas.style.height=vp.height+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      wrap.appendChild(canvas);
      scroll.appendChild(wrap);
      await page.render({canvasContext:ctx,viewport:vp}).promise;
    }
    // Update loading -> nothing
    const ld=$('#pdfvLoading');if(ld)ld.remove();
  }catch(err){
    console.error('Viewer error',err);
    scroll.innerHTML='<div class="pdfv-err">'+t('pdfFailed')+'<br><br><small style="opacity:.8">'+esc(err&&err.message?err.message:'')+'</small></div>';
  }
}
function downloadBlob(blob,filename){
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=filename;a.rel='noopener';
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),3000);
}
async function shareBlob(blob,filename,q){
  if(!(navigator.share&&navigator.canShare))return false;
  try{
    const file=new File([blob],filename,{type:'application/pdf'});
    if(navigator.canShare({files:[file]})){
      await navigator.share({
        files:[file],
        title:'پیش‌فاکتور آفتاب‌یار',
        text:(q?'پیش‌فاکتور '+(q.custName||''):'')||'PDF'
      });
      return true;
    }
  }catch(e){/* user cancelled */}
  return false;
}

/* Viewer toolbar buttons */
$('#pdfvClose')?.addEventListener('click',()=>{haptic();closePdfViewer();});
$('#pdfvDownload')?.addEventListener('click',()=>{
  haptic();
  if(!_viewerState)return;
  downloadBlob(_viewerState.blob,_viewerState.filename);
});
$('#pdfvShare')?.addEventListener('click',async()=>{
  haptic();
  if(!_viewerState)return;
  const shared=await shareBlob(_viewerState.blob,_viewerState.filename,window.__currentQuote);
  if(!shared)showToast(currentLang==='en'?'Share not available':'اشتراک در این مرورگر ممکن نیست','warning');
});

/* ===== PDF generation + toast ===== */
function showPDFReadyToast(blob, filename){
  const old=document.getElementById('pdfToast');if(old)old.remove();
  const toast=document.createElement('div');
  toast.id='pdfToast';toast.className='pdf-toast';
  const isEn=currentLang==='en';
  toast.innerHTML=
    '<div class="pdf-toast-inner">'+
      '<div class="pdf-toast-icon">📄</div>'+
      '<div class="pdf-toast-text">'+
        '<div class="pdf-toast-title">'+t('pdfReady')+'</div>'+
        '<div class="pdf-toast-sub">'+esc(filename)+'</div>'+
      '</div>'+
      '<div class="pdf-toast-actions">'+
        '<button class="pdf-btn open" data-action="open">'+t('pdfView')+'</button>'+
        '<button class="pdf-btn share" data-action="share">'+t('pdfShare')+'</button>'+
        '<button class="pdf-btn close" data-action="close">✕</button>'+
      '</div>'+
    '</div>'+
    '<div class="pdf-toast-hint">💡 '+t('pdfHint')+'</div>';
  document.body.appendChild(toast);
  requestAnimationFrame(()=>toast.classList.add('show'));
  toast.querySelector('[data-action=open]').addEventListener('click',()=>{
    haptic();
    // Use in-app viewer (no window.open — avoids popup-blocker on Android)
    openPdfViewer(blob,filename);
    toast.classList.remove('show');
    setTimeout(()=>toast.remove(),300);
  });
  toast.querySelector('[data-action=share]').addEventListener('click',async()=>{
    haptic();
    const ok=await shareBlob(blob,filename,window.__currentQuote);
    if(!ok)showToast(currentLang==='en'?'Share unavailable':'اشتراک‌گذاری در این مرورگر موجود نیست','warning');
  });
  toast.querySelector('[data-action=close]').addEventListener('click',()=>{
    toast.classList.remove('show');
    setTimeout(()=>{toast.remove();},300);
  });
  setTimeout(()=>{
    if(document.getElementById('pdfToast')){
      toast.classList.remove('show');
      setTimeout(()=>toast.remove(),300);
    }
  },20000);
}

async function generatePDF(){
  const btn=$('#printBtn');
  const originalText=btn?btn.innerHTML:'';
  if(!window.jspdf||!window.html2canvas){showToast(t('libFail'),'error');return;}
  if(btn){btn.disabled=true;btn.innerHTML='<span class="bn-icon">⏳</span><span>…</span>';}
  showToast(t('pdfWait'),'info',3000);
  try{
    recalc();
    const q=window.__currentQuote;
    const target=document.querySelector('.quote-card');
    if(!target){showToast(t('noQuote'),'error');if(btn)btn.disabled=false;if(btn)btn.innerHTML=originalText;return;}
    // Temporarily make the card wide for better PDF
    const prevW=target.style.width,prevMW=target.style.maxWidth;
    target.style.width='780px';target.style.maxWidth='none';
    await new Promise(r=>setTimeout(r,120));
    const canvas=await html2canvas(target,{scale:2,useCORS:true,backgroundColor:'#FFFFFF',logging:false,windowWidth:780});
    target.style.width=prevW;target.style.maxWidth=prevMW;
    const {jsPDF}=window.jspdf;
    const pdf=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
    const pdfW=pdf.internal.pageSize.getWidth();
    const pdfH=pdf.internal.pageSize.getHeight();
    const imgW=pdfW-20;
    const imgH=(canvas.height*imgW)/canvas.width;
    const imgData=canvas.toDataURL('image/jpeg',0.92);
    if(imgH<=pdfH-20){
      pdf.addImage(imgData,'JPEG',10,10,imgW,imgH);
    }else{
      let hLeft=imgH,pos=10,pageN=0;
      while(hLeft>0){
        if(pageN>0)pdf.addPage();
        pdf.addImage(imgData,'JPEG',10,pos,imgW,imgH);
        hLeft-=(pdfH-20);pos-=(pdfH-20);pageN++;
        if(pageN>30)break;
      }
    }
    const custName=(q.custName||'quote').replace(/[^\w\u0600-\u06FF ]/g,'_').substring(0,30).trim()||'quote';
    const dateStr=new Date().toISOString().split('T')[0];
    const filename='AY_'+custName.replace(/\s+/g,'_')+'_'+dateStr+'.pdf';
    const pdfBlob=pdf.output('blob');

    // Try native share first
    let shared=false;
    if(navigator.share&&navigator.canShare){
      try{
        const file=new File([pdfBlob],filename,{type:'application/pdf'});
        if(navigator.canShare({files:[file]})){
          await navigator.share({files:[file],title:'پیش‌فاکتور آفتاب‌یار',text:'پیش‌فاکتور '+(q.custName||'')});
          shared=true;
        }
      }catch(e){/* cancelled */}
    }
    // Always download (filesaver-like) then show viewer toast
    downloadBlob(pdfBlob,filename);
    if(!shared)showPDFReadyToast(pdfBlob,filename);
    else showToast(t('saved'));
  }catch(err){
    console.error('PDF error',err);showToast(t('pdfErr'),'error',4000);
  }finally{
    if(btn){btn.disabled=false;btn.innerHTML=originalText;}
  }
}
const printBtn=$('#printBtn');
if(printBtn)printBtn.addEventListener('click',()=>{haptic();generatePDF();});

/* ===== EXTRA MOBILE FEATURES ===== */
window.addEventListener('load',()=>{setTimeout(()=>{const s=$('#splash');if(s)s.classList.add('hidden');},900);});
const dailySlider=$('#dailyKwhSlider'),dailyInput=$('#dailyKwh');
if(dailySlider&&dailyInput){
  dailySlider.addEventListener('input',function(){dailyInput.value=this.value;recalc();});
  dailyInput.addEventListener('input',function(){dailySlider.value=this.value;});
}
const fab=$('#scrollTopBtn');
if(fab){
  window.addEventListener('scroll',()=>{fab.classList.toggle('show',window.scrollY>400);},{passive:true});
  fab.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});});
}
$$('.bnav-btn,.sys-btn,.fab,.sheet button,.card-toggle,.pdf-btn,.hist-chip,.menu-item').forEach(btn=>{
  btn.addEventListener('click',()=>haptic(8));
});

/* Side menu */
const menuBtn=$('#menuBtn'),menuOverlay=$('#menuOverlay'),sideMenu=$('#sideMenu'),closeMenuBtn=$('#closeMenuBtn');
function openMenu(){if(menuOverlay)menuOverlay.classList.add('open');if(sideMenu)sideMenu.classList.add('open');}
function closeMenu(){if(menuOverlay)menuOverlay.classList.remove('open');if(sideMenu)sideMenu.classList.remove('open');}
if(menuBtn)menuBtn.addEventListener('click',openMenu);
if(closeMenuBtn)closeMenuBtn.addEventListener('click',closeMenu);
if(menuOverlay)menuOverlay.addEventListener('click',closeMenu);
const darkBtn=$('#darkToggleBtn');
if(darkBtn){
  darkBtn.addEventListener('click',()=>{haptic();setTimeout(()=>{applyDark(!darkMode);closeMenu();},80);});
}
if(setBtn)setBtn.addEventListener('click',closeMenu);
if(hisBtn)hisBtn.addEventListener('click',closeMenu);
if(bakBtn)bakBtn.addEventListener('click',closeMenu);

/* Service worker */
if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{});});}

/* INIT */
restoreDraft();
syncSysUI();syncConsUI();
applyTranslations(currentLang);
const langSel=$("#langSelect");
if(langSel){langSel.value=currentLang;langSel.addEventListener("change",function(){currentLang=this.value;try{localStorage.setItem("solarLang",currentLang);}catch{} applyTranslations(currentLang);renderHistory();recalc();});}
syncCurrency();
fillSettings();
recalc();

/* Default appliances if none (e.g. after restoring empty) */
if(!$$('#applianceRows .appliance-row').length){
  addApp(currentLang==='en'?'Refrigerator':'یخچال',150,24,1);
  addApp(currentLang==='en'?'LED lights':'روشنایی LED',10,6,6);
  addApp(currentLang==='en'?'Water pump':'پمپ آب',750,2,1);
  recalc();
}

console.log('%c☀️ آفتاب‌یار v5 — PDF viewer + ROI + Warranty + Backup', 'color:#0D9488;font-size:14px;font-weight:bold;');
})();
