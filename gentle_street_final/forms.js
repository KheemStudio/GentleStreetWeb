
import { db, collection, addDoc, serverTimestamp } from './firebase-init.js';

document.addEventListener('DOMContentLoaded', function(){
  const fanForm = document.getElementById('fanForm');
  const fanMsg = document.getElementById('fanMsg');
  if(fanForm){
    fanForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const fd = new FormData(fanForm);
      const data = {
        name: fd.get('name'),
        email: fd.get('email'),
        country: fd.get('country') || '',
        createdAt: serverTimestamp()
      };
      try{
        await addDoc(collection(db, 'fan_list'), data);
        fanMsg.textContent = 'Welcome to the circle. Check your email for updates.';
        fanForm.reset();
      }catch(err){
        console.error(err);
        fanMsg.textContent = 'There was an error. Please try again.';
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  const contactMsg = document.getElementById('contactMsg');
  if(contactForm){
    contactForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const fd = new FormData(contactForm);
      const data = {
        name: fd.get('name'),
        email: fd.get('email'),
        message: fd.get('message'),
        createdAt: serverTimestamp()
      };
      try{
        await addDoc(collection(db, 'messages'), data);
        contactMsg.textContent = 'Message sent. We will reply soon.';
        contactForm.reset();
      }catch(err){
        console.error(err);
        contactMsg.textContent = 'There was an error. Please try again.';
      }
    });
  }
});
