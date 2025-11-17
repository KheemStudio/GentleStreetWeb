
document.addEventListener('DOMContentLoaded', function(){
  const player = document.getElementById('musicPlayer');
  if(player){
    player.addEventListener('play', function(){
      setTimeout(()=>{ if(!player.paused){ player.pause(); player.currentTime=0 } }, 50000);
    });
  }
  // attempt to autoplay after user gesture
  function tryAutoplay(){
    if(player && player.paused){
      player.play().catch(()=>{});
    }
    window.removeEventListener('click', tryAutoplay);
  }
  window.addEventListener('click', tryAutoplay);
});
