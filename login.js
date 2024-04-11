const loginBtn = document.getElementById("loginBtn");
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnNBi5Grf4849VIWNjmMojXgn0SAFHCZc",
  authDomain: "auth-fa7e2.firebaseapp.com",
  databaseURL: "https://auth-fa7e2-default-rtdb.firebaseio.com",
  projectId: "auth-fa7e2",
  storageBucket: "auth-fa7e2.appspot.com",
  messagingSenderId: "86197135899",
  appId: "1:86197135899:web:4ac99b32f2ef3924cca6be",
  measurementId: "G-PLZPWT6YLV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.getElementById("email2").value;
  const password = document.getElementById("password2").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is not correct!!");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const user_data = {
        last_login: Date.now(),
      };

      const dbRef = ref(database, "users/" + user.uid);
      update(dbRef, user_data)
        .then(() => {
          alert("User Logged In!!");
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
          alert("Error updating user data.");
        });
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
});

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/; // Properly declare the variable
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

/*
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAnNBi5Grf4849VIWNjmMojXgn0SAFHCZc",
    authDomain: "auth-fa7e2.firebaseapp.com",
    databaseURL: "https://auth-fa7e2-default-rtdb.firebaseio.com",
    projectId: "auth-fa7e2",
    storageBucket: "auth-fa7e2.appspot.com",
    messagingSenderId: "86197135899",
    appId: "1:86197135899:web:4ac99b32f2ef3924cca6be",
    measurementId: "G-PLZPWT6YLV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  */
