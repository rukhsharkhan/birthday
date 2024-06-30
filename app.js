const birthdayDate = new Date("2024-07-13 00:00:00 GMT");
const countdownElement = document.createElement("div");
countdownElement.classList.add("count");

function updateCountdown() {
  const now = new Date();
  const difference = birthdayDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `<p>Countdown to Birthday: ${days}d ${hours}h ${minutes}m ${seconds}s</p>`;
  } else {
    countdownElement.innerHTML = "<p>Happy Birthday!</p>";
  }
}

// Update every second
setInterval(updateCountdown, 1000);

// Add the countdown element to the section with id "about"
const aboutSection = document.getElementById("about");
aboutSection.appendChild(countdownElement);

const quotes = [
  "I am truly grateful to have you in my life. You effortlessly command attention with your intelligence and sensibility, becoming the center of attraction wherever you go. Your unique blend of charm and intellect enriches my life, and I cherish the moments spent with you as a true privilege.",
  "Your unwavering dedication to your PhD journey is nothing short of inspiring, Anjali. Your resilience and passion for learning show that no challenge is too great. I am continually amazed by your ability to balance everything with grace and intelligence.",
  "Anjali, your kindness and empathy are as remarkable as your academic achievements. You always know how to lift others up, offering a listening ear and thoughtful advice. Your friendship is a treasure, and I'm grateful for every moment shared with you.",
  "Anjali, your determination to pursue your PhD with such focus and dedication is truly admirable. Your intellectual curiosity and passion for your field shine brightly, inspiring everyone around you. I am incredibly proud to see you achieving your dreams and making a difference in the world."
];

const images = [
  "00000PORTRAIT_00000_BURST20200309173410155.jpg",
  "00100sPORTRAIT_00100_BURST20200309173239199_COVER.jpg",
  "IMG_20200309_173033.jpg",
  "00000PORTRAIT_00000_BURST20200309173442525.jpg"
];

let currentIndex = 0;

const updateCarousel = () => {
  const para = document.querySelector(".para");
  const img = document.querySelector("img");
  const dots = document.querySelectorAll(".dot");

  para.innerHTML = quotes[currentIndex];
  img.src = images[currentIndex];

  dots.forEach(dot => dot.classList.remove("dot--fill1"));
  dots[currentIndex].classList.add("dot--fill1");
};

document.querySelector(".btn--right").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % quotes.length;
  updateCarousel();
});

document.querySelector(".btn--left").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
  updateCarousel();
});

// Initial setup
updateCarousel();



