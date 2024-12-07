import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, query, where, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";




const firebaseConfig = {
apiKey: "AIzaSyDOhYq9sHZoMRzXY3i6el0qH6oMg0iMJic",
authDomain: "smit-hakaton-2.firebaseapp.com",
projectId: "smit-hakaton-2",
storageBucket: "smit-hakaton-2.firebasestorage.app",
messagingSenderId: "204288397209",
appId: "1:204288397209:web:972a387db16a9ddc4e4d08"
    
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.log(db)

const submitFormToDb = () => {
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const phone = document.getElementById('phone').value
  const subject = document.getElementById('subject').value
  const message = document.getElementById('message').value

  db.collection("contact")
  .add({
    name,
    email,
    phone,
    subject,
    message,
    date: new Date()
  })
  .then((docRef) => {
    console.log("Form Submitted: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

const submitForm = document.getElementById('submitBtn');
submitForm.addEventListener('click', submitFormToDb);

const getFormData = async () => {
  let val = null;
  try {
      const data = await db.collection("contact").get();
      console.log("contacts ..............", data);
      data.forEach((doc) => {
          val = JSON.stringify(doc.data());
      });
  } catch (error) {
      console.error("Error fetching data:", error);
  }
  document.getElementById('data').innerText = val
};

getFormData()