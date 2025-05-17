
// Language Switcher (only simulates change)
document.querySelector("select").addEventListener("change", function () {
  alert("Language switching is currently under development.");
});

// Subscription button
document.querySelector(".subscribe-btn").addEventListener("click", function () {
  const email = document.querySelector("input[type='email']").value;
  if (email.trim() === "") {
    alert("Please enter a valid email address.");
  } else {
    alert("Thanks for subscribing! A 15% discount code has been sent to " + email);
  }
});

// Cart animation
document.querySelectorAll(".icon-btn")[0].addEventListener("click", function () {
  alert("Cart function coming soon!");
});
