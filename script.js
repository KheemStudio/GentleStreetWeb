
document.addEventListener('DOMContentLoaded', function(){
  // Nav link transitions
  document.querySelectorAll('.nav a').forEach(a=>{
    if(!a.getAttribute('href')) return;
    a.addEventListener('click', function(e){
      if(this.target === '_blank') return;
      e.preventDefault();
      document.body.style.opacity = 0;
      setTimeout(()=>{ window.location.href = this.getAttribute('href'); }, 300);
    });
  });

  // dark mode toggle
  const dm = document.getElementById('darkToggle');
  if(dm){
    dm.addEventListener('click', function(){
      document.body.classList.toggle('dark');
      localStorage.setItem('gentle_dark', document.body.classList.contains('dark'));
    });
    // load preference
    if(localStorage.getItem('gentle_dark') === 'true') document.body.classList.add('dark');
  }

  // News populate with insta mock images
  const newsMock = [
    {title:'ACB 2025', excerpt:'D-KheeM named Ghana rep for ACB 2025', img:'assets/insta_1.jpg'},
    {title:'Vintage Gala', excerpt:'Performance highlights', img:'assets/insta_2.jpg'},
    {title:'New Single', excerpt:'Studio updates incoming', img:'assets/insta_3.jpg'},
    {title:'Merch Tease', excerpt:'Sneak peek', img:'assets/insta_4.jpg'}
  ];
  function populateNews(){
    const grid = document.getElementById('newsGrid');
    if(!grid) return;
    const items = newsMock.sort(()=>0.5-Math.random()).slice(0,3);
    grid.innerHTML = items.map(it=>`<div class="card hover-tilt fade-up"><img src="${it.img}" style="width:100%;border-radius:8px;margin-bottom:8px"><h4>${it.title}</h4><p>${it.excerpt}</p></div>`).join('');
  }
  populateNews();
  setInterval(populateNews, 20000);

  // Kheem assistant appears only on fan_signup page (sign_in sets localStorage then redirect)
  if(window.location.pathname.endsWith('fan_signup.html') || window.location.pathname.endsWith('sign_in.html')){
    // show sign-in helper in sign_in page handled separately
    const signed = localStorage.getItem('gentle_signedIn') === 'true';
    if(signed){
      // after 10s, show assistant popup
      setTimeout(()=>{
        const chat = document.createElement('div');
        chat.id='kheemChat'; chat.style.cssText='position:fixed;right:22px;bottom:86px;width:360px;max-width:92%;background:linear-gradient(180deg,#071224,#021022);color:#fff;border-radius:12px;padding:12px;box-shadow:0 30px 60px rgba(0,0,0,0.7);z-index:9999';
        chat.innerHTML=`<div style="font-weight:700;margin-bottom:8px">Kheem — Virtual Assistant</div><div id="kheemMessages" style="max-height:220px;overflow:auto;font-size:14px;margin-bottom:8px"><div style="opacity:0.9">Hi, I'm Kheem. Ask about shows, merch, or bookings.</div></div><div style="display:flex;gap:8px"><input id="kheemInput" placeholder="Ask Kheem..." style="flex:1;padding:8px;border-radius:8px;border:none"/><button id="kheemSend" class="btn" style="padding:8px 10px">Send</button></div>`;
        document.body.appendChild(chat);
        // auto-close after 10s
        setTimeout(()=>{ chat.style.display='none'; }, 10000);
        document.addEventListener('click', function(e){
          if(e.target && e.target.id === 'kheemSend'){
            const input = document.getElementById('kheemInput'); const msgs = document.getElementById('kheemMessages');
            if(!input.value) return;
            const userDiv = document.createElement('div'); userDiv.style.margin='8px 0'; userDiv.innerHTML=`<div style="font-weight:600">You:</div><div>${input.value}</div>`; msgs.appendChild(userDiv);
            const botDiv = document.createElement('div'); botDiv.style.margin='8px 0'; botDiv.innerHTML=`<div style="font-weight:600;color:#c79a2b">Kheem:</div><div>Mock response: We'll follow up shortly.</div>`; msgs.appendChild(botDiv);
            msgs.scrollTop = msgs.scrollHeight; input.value='';
          }
        });
      }, 10000);
    }
  }

  // initial fade
  document.body.style.opacity = 0;
  setTimeout(()=>{ document.body.style.transition='opacity .45s ease'; document.body.style.opacity = 1; }, 80);
});
