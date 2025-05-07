// Set your valid username and password here
const validUsername = "admin";
const validPassword = "1234";

// Login with validation and error message
function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('loginError');

  if (username === validUsername && password === validPassword) {
    // Login successful
    if (errorMsg) errorMsg.innerText = "";
    window.location.href = "home.html";
  } else {
    // Show error message
    if (errorMsg) errorMsg.innerText = "Invalid username or password. Please try again.";
  }
  return false;
}

// Attach event listener for login form
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.onsubmit = loginUser;
  }

  // Show balance on balance.html
  if (window.location.pathname.endsWith('balance.html')) {
    document.getElementById('balanceAmount').innerText = getBalance();
  }
});

// Use localStorage to simulate balance
function getBalance() {
  return parseInt(localStorage.getItem('balance') || '0', 10);
}

function setBalance(amount) {
  localStorage.setItem('balance', amount);
}

// Deposit
function deposit(event) {
  event.preventDefault();
  const amount = parseInt(document.getElementById('depositAmount').value, 10);
  if (amount > 0) {
    let balance = getBalance();
    balance += amount;
    setBalance(balance);
    document.getElementById('depositMsg').innerText = `Deposited ${amount} units! New balance: ${balance}`;
  }
  return false;
}

// Withdraw
function withdraw(event) {
  event.preventDefault();
  const amount = parseInt(document.getElementById('withdrawAmount').value, 10);
  let balance = getBalance();
  if (amount > 0 && amount <= balance) {
    balance -= amount;
    setBalance(balance);
    document.getElementById('withdrawMsg').innerText = `Withdrew ${amount} units! New balance: ${balance}`;
  } else {
    document.getElementById('withdrawMsg').innerText = 'Insufficient balance or invalid amount.';
  }
  return false;
}
