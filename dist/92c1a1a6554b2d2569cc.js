import "./index.html";
import "./main.css";
import _ from "lodash";
import {
  store,
  check,
  enableButton,
  displayPassword,
  hidePassword,
} from "./utils";
const userName = document.getElementById("userName"),
  password = document.getElementById("password"),
  registerButton = document.getElementById("rgstr_btn");
function enableRegisterButton() {
  enableButton(registerButton, userName.value, password.value);
}
userName.addEventListener("change", enableRegisterButton),
  password.addEventListener("change", enableRegisterButton);
const logInUserName = document.getElementById("logInName"),
  logInPassword = document.getElementById("logInPassword"),
  loginButton = document.getElementById("login_btn");
function enableLogInButton() {
  enableButton(loginButton, logInUserName.value, logInPassword.value);
}
logInUserName.addEventListener("change", enableLogInButton),
  logInPassword.addEventListener("change", enableLogInButton),
  registerButton.addEventListener("click", store),
  loginButton.addEventListener("click", check);
const iconBtn = document.querySelector(".icon");
iconBtn.addEventListener("mousedown", displayPassword),
  iconBtn.addEventListener("mouseup", hidePassword);
