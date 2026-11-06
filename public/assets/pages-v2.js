import {b as boot,g as gsap,S as ScrollTrigger,f as SplitText,p as services,d as selection,t as toast} from './common-runtime-v2.js';
const arrow='<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const detail=document.querySelector('[data-service-detail]');
if(detail){
 const id=new URLSearchParams(location.search).get('p');const service=services.find(s=>s.id===id)||services.find(s=>s.id==='juramentada');
 document.title=`Tradução ${service.name} — Traduz Tudo`;
 detail.innerHTML=`<section class="detail-hero" style="--service:${service.color}"><div><span class="chip">Traduções que conectam</span><h1 class="display" data-split>${service.name}</h1><p class="tag">${service.tagline}</p><p data-fade>${service.desc}</p><div class="detail-tags">${service.ingredients.map(x=>`<span class="chip">${x}</span>`).join('')}</div><div class="detail-actions"><a class="btn btn--light" href="/orcamento?servico=${service.id}">Pedir orçamento ${arrow}</a><button class="btn btn--ghost" data-select-service>Selecionar serviço +</button></div></div><div class="detail-visual"><img src="${service.cup}" alt="Modelo ilustrativo de tradução ${service.name}"></div></section>`;
 detail.querySelector('[data-select-service]').addEventListener('click',()=>{selection.add({key:service.id,name:service.name,price:0,qty:1,img:service.cup});toast(`${service.name} adicionada à sua seleção`);});
}
boot();
if(document.querySelector('[data-tl-track]')){
 gsap.fromTo('[data-hero-img]',{scale:1.25},{scale:1,yPercent:12,ease:'none',scrollTrigger:{trigger:'.story-hero',start:'top top',end:'bottom top',scrub:true}});
 document.fonts.ready.then(()=>{const split=SplitText.create('[data-manifesto]',{type:'words',wordsClass:'w'});gsap.to(split.words,{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:'.manifesto',start:'top 70%',end:'bottom 60%',scrub:true}});});
 const track=document.querySelector('[data-tl-track]');gsap.to(track,{x:()=>-Math.max(0,track.scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'.timeline',start:'top top',end:'bottom bottom',scrub:.6,invalidateOnRefresh:true}});
 gsap.to('[data-tl-bar]',{scaleX:1,ease:'none',scrollTrigger:{trigger:'.timeline',start:'top top',end:'bottom bottom',scrub:true}});gsap.utils.toArray('.tl-card').forEach((el,i)=>gsap.set(el,{rotate:i%2?2:-2}));
}
document.querySelectorAll('.faq-item').forEach((item,index)=>{
 const button=item.querySelector('button'),answer=item.querySelector('.faq-a');answer.id=`faq-${index}`;button.setAttribute('aria-controls',answer.id);answer.setAttribute('aria-hidden','true');
 button.addEventListener('click',()=>{const open=!item.classList.contains('is-open');document.querySelectorAll('.faq-item').forEach(other=>{const on=other===item&&open;other.classList.toggle('is-open',on);other.querySelector('button').setAttribute('aria-expanded',String(on));other.querySelector('.faq-a').setAttribute('aria-hidden',String(!on));gsap.to(other.querySelector('.faq-a'),{height:on?'auto':0,duration:.6,ease:'expo.out',onComplete:()=>ScrollTrigger.refresh()});});});
});
function openMessage(form,message){
 const url='https://api.whatsapp.com/send?phone=5511947485091&text='+encodeURIComponent(message);
 const status=form.querySelector('.form-status');
 if(status){
   status.innerHTML='<span style="color:var(--cyan);font-weight:600;">Abrindo WhatsApp...</span> <a href="'+url+'" target="_blank" rel="noopener noreferrer" style="color:var(--cyan);font-weight:700;margin-left:8px;">Abrir WhatsApp agora ↗</a>';
 }
 let opened=false;
 try{
   const win=window.open(url,'_blank','noopener,noreferrer');
   if(win&&!win.closed&&typeof win.closed!=='undefined') opened=true;
 }catch(e){}
 if(!opened){
   window.location.href=url;
 }
}
const quote=document.querySelector('#quote-form');
if(quote){const selected=new Set(selection.items.map(s=>s.key));const initial=new URLSearchParams(location.search).get('servico');if(initial)selected.add(initial);quote.querySelectorAll('[name=servico]').forEach(input=>input.checked=selected.has(input.value));quote.addEventListener('submit',async event=>{
event.preventDefault();
const data=new FormData(quote);
const ids=data.getAll('servico');
const status=quote.querySelector('.form-status');
const submitBtn=quote.querySelector('button[type="submit"]');

if(!ids.length){
  status.innerHTML='<span style="color:#ef4444;font-weight:600;">Selecione pelo menos um serviço acima para prosseguir.</span>';
  quote.querySelector('[name=servico]')?.focus();
  return;
}

const nome=(data.get('nome')||'').trim();
const telefone=(data.get('telefone')||data.get('phone')||'').trim();
const email=(data.get('email')||'').trim();
const origem=(data.get('origem')||'Português').trim();
const destino=(data.get('destino')||'Inglês').trim();
const volume=(data.get('volume')||'').trim();
const mensagem=(data.get('mensagem')||'').trim();

if(!telefone){
  status.innerHTML='<span style="color:#ef4444;font-weight:600;">Por favor, informe seu WhatsApp / Telefone com DDD.</span>';
  quote.querySelector('[name=telefone]')?.focus();
  return;
}

const serviceNames=ids.map(id=>services.find(s=>s.id===id)?.name||id).join(', ');

if(submitBtn){
  submitBtn.disabled=true;
  submitBtn.style.opacity='0.7';
  submitBtn.style.pointerEvents='none';
}
status.innerHTML='<span style="color:var(--cyan);font-weight:600;">⏳ Registrando solicitação e conectando ao WhatsApp...</span>';

const saasPayload={
  name: nome,
  email: email || `${(telefone || 'cliente').replace(/\D/g, '')}@whatsapp.traduztudo.com`,
  phone: telefone,
  whatsapp: telefone,
  service: serviceNames,
  sourceLanguage: origem,
  targetLanguage: destino,
  estimatedVolume: volume || 'A combinar',
  notes: [
    mensagem,
    volume ? `Volume estimado: ${volume}` : '',
    `Serviços selecionados: ${serviceNames}`
  ].filter(Boolean).join('\n'),
  origin: 'Site Oficial TraduzTudo (traduztudo.com)'
};

let requestId = null;

// AbortController with 1.8s timeout so the customer is never blocked
const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
const timeoutId = setTimeout(() => { if (controller) controller.abort(); }, 1800);

try {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(saasPayload),
    signal: controller ? controller.signal : undefined
  }).catch(() => null);

  clearTimeout(timeoutId);

  if (res && res.ok) {
    const resData = await res.json().catch(() => ({}));
    requestId = resData.requestId || resData.id || null;
    console.log('[SaaS Sync] Orçamento registrado com sucesso no TraduzTudo OS:', resData);
  }
} catch (syncErr) {
  clearTimeout(timeoutId);
  console.warn('[SaaS Sync] Falha ao enviar para o SaaS:', syncErr);
}

if(submitBtn){
  submitBtn.disabled=false;
  submitBtn.style.opacity='';
  submitBtn.style.pointerEvents='';
}

const refHeader = requestId ? `[Solicitação #${requestId}]\n` : '';
const waMessage = `Olá, Traduz Tudo! Gostaria de um orçamento.\n\n` +
  refHeader +
  `Nome: ${nome}\n` +
  `WhatsApp: ${telefone}\n` +
  (email ? `E-mail: ${email}\n` : '') +
  `Serviços: ${serviceNames}\n` +
  `De: ${origem} Para: ${destino}\n` +
  (volume ? `Volume: ${volume}\n` : '') +
  `\nProjeto: ${mensagem}`;

const waUrl = 'https://api.whatsapp.com/send?phone=5511947485091&text=' + encodeURIComponent(waMessage);

if(requestId){
  status.innerHTML = `<span style="color:#22c55e;font-weight:700;">✅ Solicitação #${requestId} registrada com sucesso no sistema!</span><br><span style="color:var(--ink-muted);font-size:0.9rem;">Redirecionando para o WhatsApp...</span><br><a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn" style="display:inline-flex;margin-top:10px;padding:8px 20px;font-size:0.95rem;background:#25d366;color:#fff;border-color:#25d366;text-decoration:none;border-radius:999px;">Abrir WhatsApp agora ↗</a>`;
} else {
  status.innerHTML = `<span style="color:var(--cyan);font-weight:600;">Redirecionando para o WhatsApp...</span><br><a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn" style="display:inline-flex;margin-top:10px;padding:8px 20px;font-size:0.95rem;background:#25d366;color:#fff;border-color:#25d366;text-decoration:none;border-radius:999px;">Abrir WhatsApp agora ↗</a>`;
}

// Try window.open first; if blocked by browser popup blocker or on mobile, redirect via location.href
let opened = false;
try {
  const win = window.open(waUrl, '_blank', 'noopener,noreferrer');
  if (win && !win.closed && typeof win.closed !== 'undefined') {
    opened = true;
  }
} catch(e) {
  opened = false;
}

if (!opened) {
  window.location.href = waUrl;
}
});}
const contact=document.querySelector('#contact-form');if(contact)contact.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(contact);openMessage(contact,`Olá, Traduz Tudo! Meu nome é ${data.get('nome')}.\n\n${data.get('mensagem')}`);});
