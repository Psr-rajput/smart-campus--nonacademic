
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
 
  
  const firebaseConfig = {
    apiKey: "AIzaSyCpopSKlsTb_dB1-jya4fTUEjFEN28Wgso",
    authDomain: "login-system-74b2c.firebaseapp.com",
    projectId: "login-system-74b2c",
    storageBucket: "login-system-74b2c.firebasestorage.app",
    messagingSenderId: "622355370220",
    appId: "1:622355370220:web:279c74c77ad1e5798cd5c9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();

 const googleloginBtn = document.getElementById("google-login-Btn");
 const googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
  .then((result) => {  
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
    window.location.href = "../logged.html";// Redirect to the desired page after successful login 
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email; 
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

   function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    const userPhoto = user.photoURL;

    document.getElementById("userName").textContent = userName;
    document.getElementById("userEmail").textContent = userEmail;
    document.getElementById("userPhoto").src = userPhoto;
   }
  
    updateUserProfile();
 
   
