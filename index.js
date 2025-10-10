document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const Hamburger = document.querySelector(".Hamburger");
  const NavMenu = document.querySelector(".Nav-Menu");

  Hamburger.addEventListener("click", () => {
    Hamburger.classList.toggle("active");
    NavMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      Hamburger.classList.remove("active");
      NavMenu.classList.remove("active");
    })
  );

const sendButton = document.getElementById("Send");
const fullNameInput = document.getElementById("Name");
const emailInput = document.getElementById("Email");
const numberInput = document.getElementById("Number");
const descriptionInput = document.getElementById("Description");

sendButton.addEventListener("click", function (event) {
  event.preventDefault();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const number = numberInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!fullName || !email || !number || !description) {
    alert("All fields are required. Please fill in all the details.");
    return;
  }

  if (description.length < 20 || description.length > 300) {
    alert("Description must be between 20 and 300 characters.");
    return;
  }

  // Disable the button and change text
  sendButton.textContent = "SENDING...";
  sendButton.style.pointerEvents = "none";
  sendButton.style.opacity = "0.6";

  const formData = {
    fullName: fullName,
    email: email,
    number: number,
    description: description,
  };

  fetch("https://arjunrenvon.pythonanywhere.com/send-food-inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Inquiry sent successfully!") {
        alert("Your inquiry was sent successfully!");
        fullNameInput.value = "";
        emailInput.value = "";
        numberInput.value = "";
        descriptionInput.value = "";
      } else {
        alert(
          data.message ||
            "There was an error sending your inquiry. Please try again."
        );
      }
    })
    .catch((error) => {
      alert("An error occurred: " + error);
    })
    .finally(() => {
      // Re-enable button and reset text
      sendButton.textContent = "SEND MESSAGE";
      sendButton.style.pointerEvents = "auto";
      sendButton.style.opacity = "1";
    });
});

});
