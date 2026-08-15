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

form.addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = `Manufacturing Inquiry — ${data.get("brand") || "New Brand"}`;

  const body = [
    `Hello ARVEX Clothing,`,
    ``,
    `I would like to discuss an apparel manufacturing project.`,
    ``,
    `Name: ${data.get("name")}`,
    `Brand: ${data.get("brand")}`,
    `Email: ${data.get("email")}`,
    `WhatsApp: ${data.get("whatsapp") || "Not provided"}`,
    `Country: ${data.get("country") || "Not provided"}`,
    `Product: ${data.get("product")}`,
    `Estimated Quantity: ${data.get("quantity") || "Not provided"}`,
    ``,
    `Project Details:`,
    `${data.get("message")}`,
    ``,
    `Thank you.`
  ].join("\n");

  window.location.href =
    `mailto:arvexclothing.co@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
