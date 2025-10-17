const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const toggleLink = document.getElementById("toggleLink");
const formTitle = document.getElementById("form-title");
const message = document.getElementById("message");

// Backend API URL
const API_URL = 'http://localhost:3000/api';

// Toggle between Register and Login forms
toggleLink.addEventListener("click", () => {
  if (registerForm.classList.contains("active")) {
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
    formTitle.textContent = "User Login";
    toggleLink.textContent = "Don't have an account? Register";
  } else {
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
    formTitle.textContent = "User Registration";
    toggleLink.textContent = "Already have an account? Login";
  }
  message.textContent = "";
});

// Registration
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();
    if (data.success) {
      message.style.color = "green";
      message.textContent = data.message;
      registerForm.reset();
    } else {
      message.style.color = "red";
      message.textContent = data.message;
    }
  } catch (error) {
    message.style.color = "red";
    message.textContent = "Error connecting to server. Make sure backend is running!";
    console.error('Registration error:', error);
  }
});

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      message.style.color = "green";
      message.textContent = data.message;
      loginForm.reset();
      sessionStorage.setItem('user', JSON.stringify(data.user));
      setTimeout(() => {
        window.location.href = 'dashboard-advanced.html';
      }, 1000);
    } else {
      message.style.color = "red";
      message.textContent = data.message;
    }
  } catch (error) {
    message.style.color = "red";
    message.textContent = "Error connecting to server. Make sure backend is running!";
    console.error('Login error:', error);
  }
});
