
// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navigationItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu after selecting a section
navigationItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Highlight the current navigation section
const pageSections = document.querySelectorAll("main section[id]");

const navigationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navigationItems.forEach((link) => {
                const isCurrent =
                    link.getAttribute("href") === `#${entry.target.id}`;

                link.classList.toggle("active", isCurrent);
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

pageSections.forEach((section) => {
    navigationObserver.observe(section);
});

// Reveal sections smoothly while scrolling
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// Contact form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "Please complete all the fields.";
        return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);

    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    formMessage.textContent = "Opening your email application...";

    window.location.href =
        `mailto:kavyasripusuluri@gmail.com?subject=${subject}&body=${body}`;
});
