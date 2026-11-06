import {g as gsap,l as lenis,S as ScrollTrigger} from './common-runtime-v2.js';
const menu=document.querySelector('[data-menu]');const mobile=document.querySelector('.mobile-menu');const search=document.querySelector('.search-panel');const drawer=document.querySelector('.drawer');
mobile.id='mobile-navigation';menu.setAttribute('aria-controls',mobile.id);menu.setAttribute('aria-expanded','false');
drawer.setAttribute('role','dialog');drawer.setAttribute('aria-modal','true');search.setAttribute('aria-modal','true');
let lastFocus=null,lastPanel=null;
function currentPanel(){const c=document.documentElement.classList;return c.contains('search-open')?search:c.contains('cart-open')?drawer:c.contains('menu-open')?mobile:null;}
new MutationObserver(()=>{const panel=currentPanel();menu.setAttribute('aria-expanded',String(panel===mobile));[drawer,search,mobile].forEach(p=>{p.inert=p!==panel;p.setAttribute('aria-hidden',String(p!==panel));});if(panel!==lastPanel){if(panel){lastFocus=document.activeElement;lenis?.stop();panel.querySelector('input,button,a')?.focus();}else{lenis?.start();lastFocus?.focus();}lastPanel=panel;}}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
[drawer,search,mobile].forEach(p=>{p.inert=true;p.setAttribute('aria-hidden','true');});
document.addEventListener('keydown',event=>{const panel=currentPanel();if(!panel||event.key!=='Tab')return;const nodes=[...panel.querySelectorAll('a[href],button,input,textarea')].filter(n=>!n.disabled);if(panel===mobile)nodes.push(menu);const first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}});
if(document.querySelector('.hero-eyebrow'))gsap.to('.hero-eyebrow',{opacity:0,scrollTrigger:{trigger:'.scene',start:'top top',end:'20% top',scrub:true}});
if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reduce-motion');}
window.addEventListener('load',()=>ScrollTrigger.refresh());

