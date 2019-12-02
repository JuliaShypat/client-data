const link = document.querySelector(".profrontendLink");
// console.log(link);

link.addEventListener("click", event => {
  const wantToContinue = confirm("Do you want to leave this page?");

  if (!wantToContinue) {
    event.preventDefault();
  }
});

const form = document.querySelector("[name='registerForm']");

form.querySelector("[type='password']").addEventListener("blur", event => {
  console.log(event.target);
  validatePassword(event.target);
});

console.log(form);
form.addEventListener("submit", event => {
  event.preventDefault();
  validateForm(event.target);
});

function validateForm(target) {
  validatePassword(target.pass);
}

function validatePassword(field) {
  if (field.value.length < 10) {
    field.className += " is-invalid";
    console.warn("Your pass is too weak!");
  } else {
    field.className = "form-control is-valid";
  }
}
