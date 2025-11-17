
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
const firebaseConfig = { apiKey: "YOUR_FIREBASE_API_KEY", authDomain: "YOUR_FIREBASE_AUTH_DOMAIN", projectId: "YOUR_FIREBASE_PROJECT_ID", storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET", messagingSenderId: "YOUR_FIREBASE_SENDER_ID", appId: "YOUR_FIREBASE_APP_ID" };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
document.addEventListener('DOMContentLoaded', function(){
  const fanForm = document.getElementById('fanForm');
  if(fanForm){ fanForm.addEventListener('submit', async function(e){ e.preventDefault(); const fd=new FormData(fanForm); try{ await addDoc(collection(db,'fan_list'), {name:fd.get('name'), email:fd.get('email'), country:fd.get('country')||'', createdAt:serverTimestamp()}); document.getElementById('fanMsg').textContent='Welcome to the circle'; fanForm.reset(); }catch(e){ document.getElementById('fanMsg').textContent='Error saving'; } }); }
  const contactForm = document.getElementById('contactForm');
  if(contactForm){ contactForm.addEventListener('submit', async function(e){ e.preventDefault(); const fd=new FormData(contactForm); try{ await addDoc(collection(db,'messages'), {name:fd.get('name'), email:fd.get('email'), message:fd.get('message'), createdAt:serverTimestamp()}); document.getElementById('contactMsg').textContent='Message sent'; contactForm.reset(); }catch(e){ document.getElementById('contactMsg').textContent='Error'; } }); }
});
