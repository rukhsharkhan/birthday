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

// Add the countdown element to the section with id "about"
const aboutSection = document.getElementById("about");
aboutSection.appendChild(countdownElement);

const quotes = [
  "I am truly grateful to have you in my life. You effortlessly command attention with your intelligence and sensibility, becoming the center of attraction wherever you go. Your unique blend of charm and intellect enriches my life, and I cherish the moments spent with you as a true privilege.",
  "Your unwavering dedication to your PhD journey is nothing short of inspiring, Anjali. Your resilience and passion for learning show that no challenge is too great. I am continually amazed by your ability to balance everything with grace and intelligence.",
  "Anjali, your kindness and empathy are as remarkable as your academic achievements. You always know how to lift others up, offering a listening ear and thoughtful advice. Your friendship is a treasure, and I'm grateful for every moment shared with you.",
  "Anjali, your determination to pursue your PhD with such focus and dedication is truly admirable. Your intellectual curiosity and passion for your field shine brightly, inspiring everyone around you. I am incredibly proud to see you achieving your dreams and making a difference in the world.",
];

const images = [
  "00000PORTRAIT_00000_BURST20200309173410155.jpg",
  "00100sPORTRAIT_00100_BURST20200309173239199_COVER.jpg",
  "IMG_20200309_173033.jpg",
  "00000PORTRAIT_00000_BURST20200309173442525.jpg",
];
const wishes = [
  "Happy 20 years of friendship, Anjali! Cheers to many more.",
  "May your life be filled with endless joy and happiness.",
  "Wishing you success in everything you do.",
  "May all your dreams come true.",
  "Here's to health, wealth, and prosperity.",
  "May you always find reasons to smile.",
  "I hope your days are as bright as your spirit.",
  "Wishing you a lifetime of love and laughter.",
  "May you achieve all your goals and aspirations.",
  "Here's to a future filled with exciting adventures.",
  "May you always have good health.",
  "Wishing you peace and serenity.",
  "May you find joy in the little things.",
  "I hope you never lose your sense of wonder.",
  "Wishing you strength to overcome any challenge.",
  "May you always be surrounded by loved ones.",
  "Here's to endless fun and unforgettable moments.",
  "Wishing you the courage to pursue your passions.",
  "May your heart be full of love.",
  "I hope you find beauty in every day.",
  "Wishing you endless creativity and inspiration.",
  "May you always feel cherished and appreciated.",
  "Here's to new opportunities and experiences.",
  "Wishing you financial abundance and security.",
  "May you find balance and harmony in life.",
  "I hope you always feel confident and empowered.",
  "Wishing you a journey filled with learning and growth.",
  "May you always have a positive outlook on life.",
  "Here's to making more beautiful memories together.",
  "Wishing you patience and perseverance.",
  "May you always feel fulfilled and content.",
  "I hope you have a heart full of gratitude.",
  "Wishing you exciting surprises and blessings.",
  "May you always stay true to yourself.",
  "Here's to a future filled with love and light.",
  "Wishing you a life free of worries and stress.",
  "May you always find joy in helping others.",
  "I hope you have a strong sense of purpose.",
  "Wishing you resilience and determination.",
  "May you always be surrounded by positivity.",
  "Here's to your incredible strength and spirit.",
  "Wishing you a heart full of compassion and kindness.",
  "May you always feel supported and understood.",
  "I hope you never stop dreaming big.",
  "Wishing you the best of luck in all your endeavors.",
  "May your life be a beautiful journey.",
  "I hope you always have a reason to celebrate.",
  "Wishing you a lifetime of wonderful moments.",
  "May you continue to inspire those around you.",
  "Here's to our unbreakable bond and friendship.",
];

let currentIndex = 0;
let currentImg = 0;

const updateCarousel = () => {
  const para = document.querySelector(".para");
  const img = document.querySelector("img");
  const dots = document.querySelectorAll(".dot");

  para.innerHTML = quotes[currentIndex];
  img.src = images[currentImg];

  dots.forEach((dot) => dot.classList.remove("dot--fill1"));
  dots[currentIndex].classList.add("dot--fill1");
};

let c = 0;
document.querySelector(".btn--right").addEventListener("click", () => {
  c++;
  currentImg = (currentImg + 1) % images.length;
  currentIndex = (currentIndex + 1) % quotes.length;

  updateCarousel();
});

document.querySelector(".btn--left").addEventListener("click", () => {
  currentImg = (currentImg - 1 + images.length) % images.length;
  currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;

  updateCarousel();
});

// Initial setup
updateCarousel();

let genbtn = document.querySelector(".gen");
let i = 0;
genbtn.addEventListener("click", () => {
  let h3 = document.querySelector("h3");
  h3.innerText = wishes[i];
  h3.style.backgroundImage = `url("IMG_20200309_173033.jpg")`;
  i++;
  if (i == wishes.length) {
    i = 0;
  }
});

document.addEventListener('DOMContentLoaded', loadMessages);

      async function postMessage() {
        const message = document.getElementById('message').value;
        if (message.trim() === "") return;  // Prevent empty messages
        try {
          await axios.post('http://localhost:8080/messages', { message });
          document.getElementById('message').value = '';
          loadMessages();  // Refresh the messages
        } catch (error) {
          console.error('Error posting message:', error);
        }
      }

      async function loadMessages() {
        try {
          const response = await axios.get('http://localhost:8080/messages');
          const messages = response.data;
          const messagesDiv = document.getElementById('messages');
          messagesDiv.innerHTML = '';  // Clear the div first
          messages.forEach((message, index) => {
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message-container');
            const p = document.createElement('p');
            p.textContent = message;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add("delete");
            deleteButton.onclick = () => deleteMessage(index);
            messageContainer.appendChild(p);
            messageContainer.appendChild(deleteButton);
            messagesDiv.appendChild(messageContainer);
          });
        } catch (error) {
          console.error('Error loading messages:', error);
        }
      }

      async function deleteMessage(index) {
        try {
          await axios.delete(`http://localhost:8080/messages/${index}`);
          loadMessages();  // Refresh the messages
        } catch (error) {
          console.error('Error deleting message:', error);
        }
      }

const confettiCanvas = document.getElementById("confetti");
const confettiSettings = {
  particleCount: 200,
  spread: 160,
};

function launchConfetti() {
  confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
  })(confettiSettings);
  setTimeout(launchConfetti, 2000);
}

launchConfetti();
