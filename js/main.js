// ==========================
// Mobile Nav Toggle
// ==========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ==========================
// Smooth Scroll
// ==========================
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close menu on link click
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        }
    });
});

// ==========================
// Popup Logic
// ==========================
const popup = document.getElementById("leadPopup");
const openBtns = document.querySelectorAll(".primary");
const closeBtn = document.querySelector(".close");

// Open popup
openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (popup) popup.style.display = "block";
        // Close menu if open (when clicking 'Get Started' in mobile nav)
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

function closePopup() {
    if (popup) popup.style.display = "none";
    // Reset form view when closing
    const formContainer = document.getElementById("formContainer");
    const successMessage = document.getElementById("successMessage");
    if (formContainer && successMessage) {
        setTimeout(() => {
            formContainer.style.display = "block";
            successMessage.style.display = "none";
        }, 300);
    }
}

// Close popup (X button)
if (closeBtn) {
    closeBtn.onclick = closePopup;
}

// Close popup on outside click
window.onclick = (e) => {
    if (e.target === popup) {
        closePopup();
    }
};

// ==========================
// Google Script Form Submit (FINAL FIXED)
// ==========================
const form = document.getElementById("leadForm");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Change button state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "Please wait 5 seconds...";
        submitBtn.disabled = true;

        // Fetch IP Address
        fetch("https://api.ipify.org?format=json")
            .then(res => res.json())
            .then(data => data.ip)
            .catch(() => "Unknown IP")
            .then(ip => {
                // Generate a Unique ID
                const uniqueId = "DOG-" + Date.now() + "-" + Math.floor(Math.random() * 9000 + 1000);

                // Create FormData (REQUIRED for Apps Script)
                const formData = new FormData();
                formData.append("name", document.getElementById("name").value);
                formData.append("phone", document.getElementById("phone").value);
                formData.append("issue", document.getElementById("issue")?.value || "");
                formData.append("city", document.getElementById("city")?.value || "");
                formData.append("id", uniqueId);
                formData.append("ip", ip);

                // Send data
                return fetch("https://script.google.com/macros/s/AKfycbyUjjjy-YJ1hy4A6c5gapHa5UlHIVtEH-BV8V2kSmqQi6cfSsZZjVGZC0y81tiw3Mal/exec", {
                    method: "POST",
                    body: formData
                });
            })
            .then(res => res.text())
            .then(response => {
                console.log("Server response:", response);

                if (response.includes("SUCCESS")) {
                    form.reset();
                    // Show custom success message instead of boring alert
                    const formContainer = document.getElementById("formContainer");
                    const successMessage = document.getElementById("successMessage");
                    if (formContainer && successMessage) {
                        formContainer.style.display = "none";
                        successMessage.style.display = "block";
                    } else {
                        if (popup) popup.style.display = "none";
                    }
                } else {
                    alert("❌ " + response);
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
                alert("❌ Something went wrong. Try again.");
            })
            .finally(() => {
                // Restore button state
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// ==========================
// Scroll Animations
// ==========================
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: stop observing once it has faded in to not repeat
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));