document.querySelector("#nextPage").addEventListener("click", nextPageAccess);
document.querySelector("#previousPage").addEventListener("click", switchPages);
document.querySelector("#toggleTest").addEventListener("click", switchPages);
document.querySelector("#submit").addEventListener("click", submitForm);

function switchPages() {
  document.getElementById("secondStep").classList.toggle("hidden");
  document.getElementById("firstStep").classList.toggle("hidden");

  if (document.querySelector("h3+p").innerHTML === "Шаг второй") {
    document.querySelector("h3+p").innerHTML = "Шаг первый";
  } else {
    document.querySelector("h3+p").innerHTML = "Шаг второй";
  }
}

const newUser = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  phoneNumber: undefined,
  city: undefined,
  gender: undefined,
};

function nextPageAccess() {
  let nextPageCheck = 0;

  newUser.firstName = document.getElementById("firstName").value;
  newUser.lastName = document.getElementById("lastName").value;
  newUser.email = document.getElementById("email").value;
  newUser.phoneNumber = document.getElementById("phoneNumber").value;
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (newUser.firstName.length > 1) {
    nextPageCheck++;
    document.getElementById("firstName").classList.remove("error");
  } else {
    document.getElementById("firstName").classList.add("error");
  }

  if (newUser.lastName.length > 1) {
    nextPageCheck++;
    document.getElementById("lastName").classList.remove("error");
  } else {
    document.getElementById("lastName").classList.add("error");
  }

  if (emailReg.test(newUser.email) === true) {
    nextPageCheck++;
    document.getElementById("email").classList.remove("error");
  } else {
    document.getElementById("email").classList.add("error");
  }

  if (newUser.phoneNumber.length > 10) {
    nextPageCheck++;
    document.getElementById("phoneNumber").classList.remove("error");
  } else {
    document.getElementById("phoneNumber").classList.add("error");
  }

  if (nextPageCheck === 4) {
    switchPages();
  }

  console.log(newUser);
}

/* Скрипт проверки телефона */

maskPhone("#phoneNumber");

function maskPhone(selector, masked = "+7 (___) ___-__-__") {
  const elems = document.querySelectorAll(selector);

  function mask(event) {
    const keyCode = event.keyCode;
    const template = masked,
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    console.log(template);
    let i = 0,
      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i !== -1) {
      newValue = newValue.slice(0, i);
    }
    let reg = template
      .substr(0, this.value.length)
      .replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      })
      .replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    ) {
      this.value = newValue;
    }
    if (event.type === "blur" && this.value.length < 5) {
      this.value = "";
    }
  }

  for (const elem of elems) {
    elem.addEventListener("input", mask);
    elem.addEventListener("focus", mask);
    elem.addEventListener("blur", mask);
  }
}

/* Скрипт регистрации */

function submitForm() {
  newUser.gender = document.querySelector('input[name="gender"]:checked').value;
  newUser.city = document.getElementById("city").value;

  let registerCheck = 0;

  if (newUser.city.length > 1) {
    registerCheck++;
    document.getElementById("city").classList.remove("error");
  } else {
    document.getElementById("city").classList.add("error");
  }

  if (document.querySelectorAll("input[type=checkbox]:checked").length === 3) {
    registerCheck++;
  }

  if (registerCheck === 2) {
    console.log(newUser);
  }
}
