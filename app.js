// script.js

// Example countdown to a specific date (modify as needed)
const birthdayDate = new Date("2024-07-13 00:00:00 GMT");
const countdownElement = document.createElement("div");
countdownElement.classList.add("count");
function updateCountdown() {
  const now = new Date();
  const difference = birthdayDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `<p>Countdown to Birthday: ${days}d ${hours}h ${minutes}m ${seconds}s</p>`;
  } else {
    countdownElement.innerHTML = "<p>Happy Birthday!</p>";
  }
}

// Update every second
setInterval(updateCountdown, 1000);

// Example: add the countdown element to the section with id "about"
const aboutSection = document.getElementById("about");
aboutSection.appendChild(countdownElement);

let quotes = [
  " I am truly grateful to have you in my life. You effortlessly commands attention with your intelligence and sensibility, becoming the center of attraction wherever you goes. Your unique blend of charm and intellect enriches my life, and I cherish the moments spent with you as a true privilege.",
  "Your unwavering dedication to your PhD journey is nothing short of inspiring, Anjali. Your resilience and passion for learning show that no challenge is too great. I am continually amazed by your ability to balance everything with grace and intelligence.",
  "Anjali, your kindness and empathy are as remarkable as your academic achievements. You always know how to lift others up, offering a listening ear and thoughtful advice. Your friendship is a treasure, and I'm grateful for every moment shared with you.",
  "Anjali, your determination to pursue your PhD with such focus and dedication is truly admirable. Your intellectual curiosity and passion for your field shine brightly, inspiring everyone around you. I am incredibly proud to see you achieving your dreams and making a difference in the world.",
];
let image = [
  "00000PORTRAIT_00000_BURST20200309173410155.jpg",
  "00100sPORTRAIT_00100_BURST20200309173239199_COVER.jpg",
  "IMG_20200309_173033.jpg",
  "00000PORTRAIT_00000_BURST20200309173442525.jpg",
];

let btn1 = document.querySelector(".btn--right");
let btn2 = document.querySelector(".btn--left");
let j = 0;
let l = 4;
btn1.addEventListener("click", () => {
  j++;
  l--;
  let para = document.querySelector(".para");
  let img = document.querySelector("img");
  let para2 = document.querySelector(".testimonial-author");
  let para3 = document.querySelector(".testimonial-job");
  let dot = document.querySelector(".dot1");
  let dot1 = document.querySelector(".dot2");
  let dot2 = document.querySelector(".dot3");
  let dot3 = document.querySelector(".dot4");

  if (j == 1) {
    dot.classList.remove("dot--fill1");
    dot1.classList.add("dot--fill1");
    para.innerHTML = quotes[j];
    img.src = image[j];
  } else if (j == 2) {
    dot1.classList.remove("dot--fill1");
    dot2.classList.add("dot--fill1");
    para.innerHTML = quotes[j];
    img.src = image[j];
  } else if (j == 3) {
    dot2.classList.remove("dot--fill1");
    dot3.classList.add("dot--fill1");
    para.innerHTML = quotes[j];
    img.src = image[j];
  } else if (j == 4) {
    dot3.classList.remove("dot--fill1");
    dot.classList.add("dot--fill1");
    j = 0;
    l = 4;
    para.innerHTML = quotes[j];
    img.src = image[j];
  }

  para2.innerHTML = "";
  para3.innerHTML = "";
});

k = 4;
let m = 0;
btn2.addEventListener("click", () => {
  k--;
  m++;
  let para = document.querySelector(".para");
  let img = document.querySelector("img");
  let para2 = document.querySelector(".testimonial-author");
  let para3 = document.querySelector(".testimonial-job");
  let dot = document.querySelector(".dot1");
  let dot1 = document.querySelector(".dot2");
  let dot2 = document.querySelector(".dot3");
  let dot3 = document.querySelector(".dot4");

  if (k == 3) {
    dot.classList.remove("dot--fill1");
    dot3.classList.add("dot--fill1");
    para.innerHTML = quotes[k];
    img.src = image[k];
  } else if (k == 2) {
    dot3.classList.remove("dot--fill1");
    dot2.classList.add("dot--fill1");
    para.innerHTML = quotes[k];
    img.src = image[k];
  } else if (k == 1) {
    dot2.classList.remove("dot--fill1");
    dot1.classList.add("dot--fill1");
    para.innerHTML = quotes[k];
    img.src = image[k];
  } else if (k == 0) {
    dot1.classList.remove("dot--fill1");
    dot.classList.add("dot--fill1");
    para.innerHTML = quotes[k];
    img.src = image[k];
    k = 4;
    m = 0;
  }
  para2.innerHTML = "";
  para3.innerHTML = "";
});
let url = "http://localhost:3000/api/birthday-greeting/v4/init-data";

async function getWishes() {
  try {
    let req = await axios.get(url);
    console.log(req);
  } catch (e) {
    console.log("Error: " + e);
  }
}
