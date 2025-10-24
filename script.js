// PASSWORD HANDLER
const password = "140223";
const overlay = document.getElementById('passwordOverlay');
const mainContent = document.getElementById('mainContent');
const enterBtn = document.getElementById('enterPassword');
const passwordInput = document.getElementById('sitePassword');

function startSite() {
  overlay.style.display = 'none';
  mainContent.style.display = 'block';
  launchHearts();
  startTimer();
  startJourney();
  setupEnvelope();
  setupSlider();
  setupQuiz();
}

enterBtn.addEventListener('click', () => {
  if(passwordInput.value === password) startSite();
  else alert("Senha incorreta 😘");
});
passwordInput.addEventListener('keyup', e => { if(e.key === 'Enter') enterBtn.click(); });

// FLOATING HEARTS
function launchHearts(){
  setInterval(()=>{
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random()*window.innerWidth+'px';
    heart.style.top = window.innerHeight+'px';
    heart.style.fontSize = 20+Math.random()*30+'px';
    heart.style.opacity = Math.random();
    heart.style.zIndex = 9999;
    document.body.appendChild(heart);
    let top = window.innerHeight;
    const speed = 1+Math.random()*2;
    function animate(){ 
      top-=speed; 
      heart.style.top=top+'px'; 
      if(top<-50) heart.remove(); 
      else requestAnimationFrame(animate);
    }
    animate();
  }, 300);
}

// TIMER
function startTimer(){
  const startDate = new Date("2023-02-14T00:00:00");
  function updateTimer(){
    const now = new Date();
    let years = now.getFullYear()-startDate.getFullYear();
    let months = now.getMonth()-startDate.getMonth();
    let days = now.getDate()-startDate.getDate();
    if(days<0){ months--; days+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(months<0){ years--; months+=12;}
    const diff = now - startDate;
    const hours = Math.floor((diff/(1000*60*60))%24);
    const minutes = Math.floor((diff/(1000*60))%60);
    const seconds = Math.floor((diff/1000)%60);
    document.getElementById('timeTogether').textContent = `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s 💞`;
  }
  updateTimer();
  setInterval(updateTimer,1000);
}

// JOURNEY TYPEWRITER
const journeyText = ` From February 14, 2023, to today—every laugh, every hug, every memory is a piece of my heart that you keep safe.
We've been through hard times, tears, and arguments, but we always find our way back to each other.
Our love grows and strengthens every day.💕.`;
let i=0;
function startJourney(){
  const el = document.getElementById('journeyText');
  function typeWriter(){ 
    if(i<journeyText.length){ 
      el.textContent+=journeyText.charAt(i); 
      i++; 
      setTimeout(typeWriter,30);
    }
  }
  typeWriter();
}

// ENVELOPE & CONFETTI
function setupEnvelope(){
  const envelope = document.getElementById('envelope');
  const letter = envelope.querySelector('.letter');
  const closeBtn = document.getElementById('closeLetter');

  envelope.addEventListener('click', ()=>{
    envelope.classList.add('open');
    document.body.style.overflow = 'hidden';
    launchConfetti();
  });
  closeBtn.addEventListener('click', e=>{
    e.stopPropagation();
    envelope.classList.remove('open');
    document.body.style.overflow = 'auto';
  });
}

function launchConfetti(){
  for(let i=0;i<50;i++){
    const c = document.createElement('div');
    c.textContent='🎉';
    c.style.position='fixed';
    c.style.left=Math.random()*window.innerWidth+'px';
    c.style.top='-50px';
    c.style.fontSize=20+Math.random()*30+'px';
    c.style.zIndex=9999;
    document.body.appendChild(c);
    let top=-50;
    const speed = 1+Math.random()*4;
    const rotate = Math.random()*360;
    function fall(){
      top+=speed;
      c.style.top=top+'px';
      c.style.transform=`rotate(${rotate+top}deg)`;
      if(top<window.innerHeight+50) requestAnimationFrame(fall);
      else c.remove();
    }
    fall();
  }
}

// PHOTO SLIDER
function setupSlider(){
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  let current=0;
  function moveSlide(dir){
    current+=dir;
    if(current<0) current=slides.length-1;
    if(current>=slides.length) current=0;
    track.style.transform=`translateX(-${current*100}%)`;
  }
  window.moveSlide = moveSlide;
}

// QUIZ
function setupQuiz(){
  const quizQuestions = [
    {q:"Nos conhecemos falando sobre abacaxi na pizza?",a:true,img:"pizza.png"},
    {q:"Mariana é secretamente um macaco?",a:true,img:"monkey.png"},
    {q:"Kris come todos os snacks?",a:true,img:"snacks.png"}
  ];
  const quizContainer = document.getElementById('quizContainer');
  quizQuestions.forEach((item,idx)=>{
    const div = document.createElement('div');
    div.className='quiz-question';
    div.innerHTML=`<img src="${item.img}" alt="q${idx+1}">
      <p>${item.q}</p>
      <button class="quiz-btn" data-answer="true">Verdadeiro</button>
      <button class="quiz-btn" data-answer="false">Falso</button>
      <div class="quiz-feedback" id="feedback${idx}"></div>`;
    quizContainer.appendChild(div);
  });

  document.querySelectorAll(".quiz-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      const idx = Array.from(parent.parentElement.children).indexOf(parent);
      const feedback = document.getElementById(`feedback${idx}`);
      const ans = e.target.dataset.answer === "true";
      if (ans === quizQuestions[idx].a) {
        feedback.textContent = "✅ Correto!";
        feedback.className = "quiz-feedback correct";
      } else {
        feedback.textContent = "❌ Ops!";
        feedback.className = "quiz-feedback wrong";
      }
    });
  });
}
