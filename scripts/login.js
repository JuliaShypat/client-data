const registerForm = document.querySelector("[name='registerForm']");

registerForm.addEventListener("submit", event => {
  event.preventDefault();
  validateRegisterForm(event.target);
});

const loginForm = document.querySelector("[name='loginForm']");

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  validateLoginForm(event.target);
});

//Observe changes
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    // let displayName = user.displayName;
    let email = user.email;
    window.location.href =
      "file:///C:/Users/yulii/proFrontend/client-data/index.html";
    // let emailVerified = user.emailVerified;
    // let photoURL = user.photoURL;
    // let isAnonymous = user.isAnonymous;
    // let uid = user.uid;
    // let providerData = user.providerData;
  } else {
    // User is signed out.
    // ...
  }
});

// Validation
registerForm
  .querySelector("[type='password']")
  .addEventListener("blur", event => {
    console.log(event.target);
    validatePassword(event.target);
  });

function validateRegisterForm(target) {
  validatePassword(target.pass);
  registerNewUser(target.email.value, target.pass.value);
}

function validateLoginForm(target) {
  // validatePassword(target.pass);
  logIn(target.email.value, target.pass.value);
}

function validatePassword(field) {
  if (field.value.length < 10) {
    field.className += " is-invalid";
    console.warn("Your pass is too weak!");
  } else {
    field.className = "form-control is-valid";
  }
}

function registerNewUser(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => console.log("Registered new user", response))
    .catch(error => handleError(error));
}

function logIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => console.log(`Hello ${response.user.email}`, response))
    .catch(error => handleError(error));
}

function handleError(error) {
  alert(`Error! ${error.code} - ${error.message}`);
}
