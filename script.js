const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });
}

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  }),
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("quote-form");

if (form) {
  form.addEventListener("submit", async event => {
    event.preventDefault();

    const button = form.querySelector("button[type='submit']");
    const originalText = button.innerHTML;

    button.disabled = true;
    button.innerHTML = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

     if (response.ok) {
  form.reset();

  if (typeof gtag === "function") {
    gtag("event", "quote_submission", {
      event_category: "lead",
      event_label: "Manufacturing Quote Form"
    });
  }

  button.innerHTML = "Inquiry Sent ✓";
        const note = form.querySelector(".form-note");
        note.textContent =
          "Thank you! Your inquiry has been received. We'll get back to you as soon as possible.";

        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
          note.textContent =
            "Your inquiry will be sent securely. We'll get back to you as soon as possible.";
        }, 5000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      button.disabled = false;
      button.innerHTML = originalText;

      const note = form.querySelector(".form-note");
      note.textContent =
        "Something went wrong. Please try again or contact us on WhatsApp.";
    }
  });
}
