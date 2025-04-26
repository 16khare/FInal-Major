// Handle Signup Form Submission

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login_button");
  const signupButton = document.getElementById("signup_button");

  // Ensure the button is clicked
  loginButton.addEventListener("click", async function (e) {
    e.preventDefault(); // Prevent form submission

    // Get the input values
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {

        throw new Error(await response.text());
      }

      const result = await response.json();
      console.log(result);
      if (result.message) {
        alert("Login successful!");
        //localStorage.setItem("authToken", result.token);
        window.location.href = "index.html";


      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  });

  signupButton.addEventListener("click", async function (e) {
    e.preventDefault(); // Prevent form submission
    console.log("here");

    // Get the input values
    const username = document.getElementById("username").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      alert(result.message || "Signup successful!");
    } catch (error) {
      alert(`Signup failed: ${error.message}`);
    }
  });
});
