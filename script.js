
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

// ---------- FIREBASE CONFIGURATION ----------
const firebaseConfig = {
  apiKey: "AIzaSyDxuPt0uQagTAba5HJYXlODr1Pa8fbCSSY",
  authDomain: "automagika-industries.firebaseapp.com",
  projectId: "automagika-industries",
  storageBucket: "automagika-industries.firebasestorage.app",
  messagingSenderId: "409031111941",
  appId: "1:409031111941:web:41f28e04d3de3c9beef36c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// =====================================================
// AUTOMAGIKA INDUSTRIES — MAIN JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  const get = id => document.getElementById(id);

  // ---------- TOAST NOTIFICATIONS ----------
  const toast = get("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // ---------- FOOTER YEAR ----------
  const year = get("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- MOBILE NAVIGATION ----------
  const menuToggle = get("menuToggle");
  const mainNav = get("mainNav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      mainNav.classList.toggle("open", !isOpen);
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });
  }

  // ---------- AUTHENTICATION MODAL ----------
  const authModal = get("authModal");
  const signInBtn = get("signInBtn");
  const signUpBtn = get("signUpBtn");
  const authClose = get("authClose");
  const authForm = get("authForm");
  const authTitle = get("authTitle");
  const authDescription = get("authDescription");
  const authSwitch = get("authSwitch");
  const googleSignInBtn = get("googleSignInBtn");

  let authMode = "signin";

  function openAuth(mode) {
    if (!authModal) return;
    authMode = mode;
    updateAuthModal();
    authModal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeAuth() {
    if (!authModal) return;
    authModal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function updateAuthModal() {
    if (authMode === "signup") {
      authTitle.textContent = "Join the mission.";
      authDescription.textContent = "Create your AutoMagika account with Google.";
      authSwitch.textContent = "Already have an account? Switch to sign in";
    } else {
      authTitle.textContent = "Welcome aboard.";
      authDescription.textContent = "Sign in to your AutoMagika account.";
      authSwitch.textContent = "Need an account? Switch to sign up";
    }
  }

  if (signInBtn) {
    signInBtn.addEventListener("click", () => openAuth("signin"));
  }

  if (signUpBtn) {
    signUpBtn.addEventListener("click", () => openAuth("signup"));
  }

  if (authClose) authClose.addEventListener("click", closeAuth);

  if (authSwitch) {
    authSwitch.addEventListener("click", () => {
      authMode = authMode === "signin" ? "signup" : "signin";
      updateAuthModal();
    });
  }

  if (authModal) {
    authModal.addEventListener("click", event => {
      if (event.target === authModal) closeAuth();
    });
  }

  // ---------- REAL GOOGLE SIGN-IN ----------
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener("click", async () => {
      googleSignInBtn.disabled = true;

      try {
        const result = await signInWithPopup(auth, googleProvider);
        showToast(`Welcome, ${result.user.displayName || "Engineer"}!`);
        console.log("Signed in:", result.user.email);
        closeAuth();
      } catch (error) {
        console.error("Google sign-in error:", error);
        showToast(error.message);
      } finally {
        googleSignInBtn.disabled = false;
      }
    });
  }

  // ---------- AUTHENTICATION STATE ----------
 // ---------- AUTHENTICATION STATE ----------
const profileMenu = get("profileMenu");
const profileTrigger = get("profileTrigger");
const profileDropdown = get("profileDropdown");

const profileAvatar = get("profileAvatar");
const profileDropdownAvatar = get("profileDropdownAvatar");
const profileTriggerName = get("profileTriggerName");
const profileName = get("profileName");
const profileEmail = get("profileEmail");

const signOutBtn = get("signOutBtn");

onAuthStateChanged(auth, user => {
  if (user) {
    if (signInBtn) signInBtn.hidden = true;
    if (signUpBtn) signUpBtn.hidden = true;
    if (profileMenu) profileMenu.hidden = false;

    const photo = user.photoURL || "";
    const name = user.displayName || "AutoMagika Engineer";

    profileAvatar.src = photo;
    profileDropdownAvatar.src = photo;

    profileTriggerName.textContent = name;
    profileName.textContent = name;
    profileEmail.textContent = user.email || "";

    console.log("Current user:", name, user.email);
  } else {
    if (signInBtn) signInBtn.hidden = false;
    if (signUpBtn) signUpBtn.hidden = false;
    if (profileMenu) profileMenu.hidden = true;
    if (profileDropdown) profileDropdown.hidden = true;
    if (profileTrigger) {
  profileTrigger.setAttribute("aria-expanded", "false");
}

    console.log("No user signed in.");
  }
});
// ---------- PROFILE DROPDOWN ----------
if (profileTrigger && profileDropdown) {
  profileTrigger.addEventListener("click", () => {
    const isOpen = !profileDropdown.hidden;
    profileDropdown.hidden = isOpen;
    profileTrigger.setAttribute("aria-expanded", String(!isOpen));
  });
}

// ---------- SIGN OUT ----------
if (signOutBtn) {
  signOutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      profileDropdown.hidden = true;
      showToast("Signed out successfully.");
    } catch (error) {
      console.error("Sign-out error:", error);
      showToast("Could not sign out. Please try again.");
    }
  });
}
  // ---------- DISABLE OLD DEMO PASSWORD LOGIN ----------
  if (authForm) {
    authForm.addEventListener("submit", event => {
      event.preventDefault();
      showToast("Please use Continue with Google to authenticate.");
    });
  }

  // ---------- MAGIK CHATBOT ----------
  const magikLauncher = get("magikLauncher");
  const magikPanel = get("magikPanel");
  const magikClose = get("magikClose");
  const magikForm = get("magikForm");
  const magikInput = get("magikInput");
  const magikMessages = get("magikMessages");

  function openMagik() {
    if (!magikPanel || !magikLauncher) return;
    magikPanel.hidden = false;
    magikLauncher.setAttribute("aria-expanded", "true");
    if (magikInput) magikInput.focus();
  }

  function closeMagik() {
    if (!magikPanel || !magikLauncher) return;
    magikPanel.hidden = true;
    magikLauncher.setAttribute("aria-expanded", "false");
  }

  if (magikLauncher) {
    magikLauncher.addEventListener("click", () => {
      if (magikPanel.hidden) openMagik();
      else closeMagik();
    });
  }

  if (magikClose) magikClose.addEventListener("click", closeMagik);

  function addMessage(message, sender) {
    if (!magikMessages) return;
    const bubble = document.createElement("div");
    bubble.classList.add("chat-message");
    bubble.classList.add(sender === "user" ? "user-message" : "bot-message");
    bubble.textContent = message;
    magikMessages.appendChild(bubble);
    magikMessages.scrollTop = magikMessages.scrollHeight;
  }

  function getMagikResponse(question) {
    const q = question.toLowerCase();

    if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return "Hey! Welcome to AutoMagika Industries. What would you like to explore?";
    }

    if (q.includes("draco") || q.includes("f22") || q.includes("raptor")) {
      return "DRACO-F22 Raptor is one of AutoMagika's aircraft projects. It is an experimental model featuring a twin-tail design, control surfaces and an electric propulsion system. Ask us about our engineering work!";
    }

    if (q.includes("airoracle") || q.includes("flight simulator")) {
      return "AirOracle is a planned flight simulation project. The vision is to explore aviation through different aircraft categories, from basic RC aircraft to more advanced flight systems.";
    }

    if (q.includes("research") || q.includes("technology")) {
      return "AutoMagika explores aerospace, robotics, intelligent systems, jet technology and AI. Our goal is to turn research and engineering ideas into practical projects.";
    }

    if (q.includes("project") || q.includes("projects")) {
      return "Our work includes DRACO-F22, AirOracle and other developing engineering concepts. Explore the Projects section of this website to learn more.";
    }

    if (q.includes("about") || q.includes("automagika") || q.includes("who are you")) {
      return "AutoMagika Industries is a student-led engineering initiative focused on aerospace, robotics and intelligent systems. We aim to engineer ideas into reality.";
    }

    if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
      return "You can reach the team through the Contact section of this website.";
    }

    if (q.includes("thank")) {
      return "You're welcome! Keep exploring, keep questioning and keep engineering.";
    }

    if (q.includes("help")) {
      return "Of course! You can ask me about AutoMagika, DRACO-F22, AirOracle, our projects or our research.";
    }

    return "That's an interesting question! I don't have that information in my current knowledge base. Try asking about DRACO-F22, AirOracle, projects or research.";
  }

  function sendToMagik(message) {
    const question = message.trim();
    if (!question) return;
    addMessage(question, "user");

    setTimeout(() => {
      addMessage(getMagikResponse(question), "bot");
    }, 450);
  }

  if (magikForm) {
    magikForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!magikInput) return;
      sendToMagik(magikInput.value);
      magikInput.value = "";
      magikInput.focus();
    });
  }

  document.querySelectorAll("[data-question]").forEach(button => {
    button.addEventListener("click", () => {
      openMagik();
      sendToMagik(button.dataset.question);
    });
  });

  // ---------- CONTACT FORM ----------
  const contactForm = get("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      showToast("Your message is ready, but the contact form isn't connected to a delivery service yet.");
      contactForm.reset();
    });
  }

  // ---------- ESCAPE KEY ----------
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeAuth();
      closeMagik();
      closeMenu();
    }
  });

  // ---------- CURSOR GLOW ----------
  const cursorGlow = document.querySelector(".cursor-glow");

  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", event => {
      cursorGlow.style.left = event.clientX + "px";
      cursorGlow.style.top = event.clientY + "px";
    });
  }

  // ---------- SCROLL REVEAL ANIMATIONS ----------
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }

  console.log("AutoMagika Industries systems initialized.");
});
