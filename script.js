
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Mobile menu open and close

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("active");
    });
});
// ===== EmailJS contact form: add this at the END of your existing script.js =====
// Replace these three placeholders with the values from your EmailJS dashboard.
const EMAILJS_PUBLIC_KEY = "gyG2PQvFfKItjWqFT";
const EMAILJS_SERVICE_ID = "service_icxowji";
const EMAILJS_TEMPLATE_ID = "template_ck5q1pk";

if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const status = document.getElementById("formStatus");
        const button = document.getElementById("sendMessageBtn");

        if (typeof emailjs === "undefined" || EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" ||
            EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
            EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID") {
            status.textContent = "Contact form setup is not complete yet. Please configure EmailJS.";
            status.className = "error";
            return;
        }

        button.disabled = true;
        button.textContent = "Sending...";
        status.textContent = "";
        status.className = "";

        try {
            // EmailJS template variables: from_name, from_email, subject, message
            await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
            status.textContent = "Your message has been sent successfully!";
            status.className = "success";
            contactForm.reset();
        } catch (error) {
            console.error("EmailJS error:", error);
            status.textContent = "Message could not be sent. Please try again or email me directly.";
            status.className = "error";
        } finally {
            button.disabled = false;
            button.textContent = "Send Message";
        }
    });
}

