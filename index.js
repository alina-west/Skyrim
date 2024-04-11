const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
console.log(loginBtn);
console.log(registerBtn);
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

registerBtn.onclick = function () {
  console.log("here");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const full_name = document.getElementById("full_name").value;
  const user_name = document.getElementById("username").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is not correct!!");
    return;
  }
  if (
    validate_field(full_name) == false ||
    validate_field(user_name) == false
  ) {
    alert("One or More Extra Fields is not correct!!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const user_data = {
        email: email,
        full_name: full_name,
        user_name: user_name,
        last_login: Date.now(),
      };

      const dbRef = ref(database, "users/" + user.uid);
      set(dbRef, user_data);

      alert("User Created!!");
    })
    .catch((error) => {
      const errorMessage = error;
      alert(errorMessage);
    });
};

console.log(loginBtn);
loginBtn.onclick = function () {
  email = document.getElementById("email2").value;
  password = document.getElementById("password2").value;

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

      const dbRef = ref(database, "users/" + user.uid).update(user_data);
      set(dbRef, user_data);

      alert("User Logged In!!");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
};

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
