const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const intro=document.querySelector('.intro');
window.addEventListener('load',()=>setTimeout(()=>intro?.classList.add('done'),reduced?0:450));

const items=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
items.forEach(item=>observer.observe(item));

const progress=document.querySelector('.reading-progress');
const nav=document.querySelector('.nav');
const crossing=document.querySelector('.crossing');
const marker=document.querySelector('.stage-marker');
const chapterText=document.querySelector('#chapterText');
let currentStep='01';
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=`${max?scrollY/max*100:0}%`;
  nav.classList.toggle('scrolled',scrollY>40);
  if(crossing){
    const span=crossing.offsetHeight-innerHeight;
    const value=Math.max(0,Math.min(1,(scrollY-crossing.offsetTop)/span));
    crossing.style.setProperty('--journey-pct',`${18+value*64}%`);
    const index=Math.min(2,Math.floor(value*3));
    const active=document.querySelectorAll('.chapter')[index];
    if(active&&active.dataset.step!==currentStep){
      currentStep=active.dataset.step;chapterText.classList.add('changing');
      setTimeout(()=>{chapterText.textContent=active.dataset.copy;chapterText.classList.remove('changing');marker.querySelector('span').textContent=currentStep},180);
    }
  }
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

const glow=document.querySelector('.cursor-glow');
addEventListener('pointermove',event=>{if(glow){glow.style.left=`${event.clientX}px`;glow.style.top=`${event.clientY}px`}const stage=document.querySelector('.crossing-stage');if(stage){const r=stage.getBoundingClientRect();stage.style.setProperty('--mx',`${event.clientX-r.left}px`);stage.style.setProperty('--my',`${event.clientY-r.top}px`)}});

const portrait=document.querySelector('.portrait-frame');
document.querySelector('.portal-shell')?.addEventListener('pointermove',event=>{if(reduced)return;const r=event.currentTarget.getBoundingClientRect();const x=(event.clientX-r.left)/r.width-.5;const y=(event.clientY-r.top)/r.height-.5;portrait.style.transform=`rotateY(${x*7}deg) rotateX(${-y*7}deg)`});
document.querySelector('.portal-shell')?.addEventListener('pointerleave',()=>portrait.style.transform='');

document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:reduced?'auto':'smooth'})}}));
