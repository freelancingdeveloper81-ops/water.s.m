// --- EmailJS Setup (Replace with your keys later) ---
(function() {
    // emailjs.init("YOUR_PUBLIC_KEY"); // Yahan apni Public Key dalein
})();

const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");
const formSteps = document.querySelectorAll(".form-step");
const bookingForm = document.getElementById("waterBookingForm");
const bookingMain = document.getElementById("bookingMain");
const thankYouState = document.getElementById("thankYouState");

let currentStep = 1;

// --- 1. Step Navigation Logic ---
function nextStep(step) {
    if (step > currentStep) {
        // Validation check for inputs in current step
        const currentInputs = formSteps[currentStep - 1].querySelectorAll("input, select, textarea");
        let valid = true;
        currentInputs.forEach(input => {
            if (input.hasAttribute("required") && !input.value) {
                valid = false;
                input.style.borderColor = "red";
            } else {
                input.style.borderColor = "";
            }
        });
        if (!valid) return alert("Please fill all required fields.");
    }

    currentStep = step;
    updateUI();
}

function updateUI() {
    // Update Form Steps Visibility
    formSteps.forEach((step, idx) => {
        step.classList.toggle("active", idx === (currentStep - 1));
    });

    // Update Progress Bar
    const actives = document.querySelectorAll(".circle.active");
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + "%";

    // Update Circles
    circles.forEach((circle, idx) => {
        circle.classList.toggle("active", idx < currentStep);
    });
}

// --- 2. Form Submission & Email Sending ---
bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.innerText = "Processing Logistics...";
    submitBtn.disabled = true;

    // Form Data Collect karein
    const formData = {
        name: document.getElementById("userName").value,
        phone: document.getElementById("userPhone").value,
        email: document.getElementById("userEmail").value,
        company: document.getElementById("companyName").value,
        sector: document.getElementById("sector").value,
        volume: document.getElementById("volume").value,
        urgency: document.getElementById("urgency").value,
        address: document.getElementById("siteAddress").value
    };

    /** 
     * NOTE: EmailJS integrate karne ke liye EmailJS dashboard par service banayein
     * Phir niche wala code use karein:
     * 
     * emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
     * .then(() => { showThankYou(formData); });
     */

    // Simulation (As if email is sent)
    setTimeout(() => {
        showThankYou(formData);
    }, 2000);
});

// --- 3. Thank You State Logic ---
function showThankYou(data) {
    // UI Switch
    bookingMain.style.display = "none";
    thankYouState.style.display = "block";

    // Display Data back to user
    document.getElementById("displayUserName").innerText = data.name;
    document.getElementById("displayUserPhone").innerText = data.phone;
    
    // Smooth Scroll to Top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 4. Dark Mode Logic ---
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});