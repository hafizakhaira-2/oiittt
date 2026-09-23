const audio=document.getElementById('birthdayAudio');
const musicBtn=document.getElementById('musicBtn');
const musicLabel=document.getElementById('musicLabel');
const toast=document.getElementById('musicToast');
const openBtn=document.getElementById('openBtn');
const replayBtn=document.getElementById('replayBtn');
const topBtn=document.getElementById('topBtn');
audio.loop=true;

function ui(on){musicLabel.textContent=on?'Musik ON':'Musik OFF';}
function play(){audio.play().then(()=>{ui(true);toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400)}).catch(()=>ui(false));}

window.addEventListener('load',play);
['pointerdown','keydown','touchstart'].forEach(e=>window.addEventListener(e,()=>{if(audio.paused)play()},{once:true,passive:true}));
musicBtn.addEventListener('click',()=>{if(audio.paused)play();else{audio.pause();ui(false)}});
openBtn.addEventListener('click',()=>{document.getElementById('surprise').scrollIntoView({behavior:'smooth'});play()});
replayBtn.addEventListener('click',()=>{audio.currentTime=0;play()});
window.addEventListener('scroll',()=>topBtn.classList.toggle('visible',scrollY>600));
topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

// Confetti saat bagian terakhir masuk layar.
const finale=document.querySelector('.finale');
const observer=new IntersectionObserver(es=>{
 if(es[0].isIntersecting&&!finale.dataset.done){
  finale.dataset.done='1';
  for(let i=0;i<34;i++){
   const x=document.createElement('i');
   x.style.cssText=`position:absolute;left:${Math.random()*100}%;top:15%;width:6px;height:10px;background:${['#ffb5cf','#c9b5ff','#fff9f0','#f2c879'][i%4]};opacity:.85;animation:fall 2.4s ${Math.random()*1.2}s ease-out forwards;--x:${Math.random()*160-80}px;--r:${Math.random()*720-360}deg`;
   finale.appendChild(x);
  }
 }
},{threshold:.35});
observer.observe(finale);
const s=document.createElement('style');s.textContent='@keyframes fall{to{transform:translate(var(--x),70vh) rotate(var(--r));opacity:0}}';document.head.appendChild(s);
