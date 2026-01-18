function getTimeGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) return "Good Morning!";
  if (hour >= 12 && hour < 18) return "Good Afternoon!";
  if (hour >= 18 && hour < 22) return "Good Evening!";
  return "Hello!";
}

const welcomers = ["Welcome!", "Hey there!", "Hi!"];

const greetings = [...welcomers, getTimeGreeting()];

// Pick a random greeting
const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

window.addEventListener("load", () => {
  const welcome = document.getElementById("welcome");
  const welcomeText = document.getElementById("welcome-text");
  const content = document.getElementById("content");

  // Set the welcome text
  welcomeText.textContent = randomGreeting;

  // Hide welcome after 3 seconds
  setTimeout(() => {
    welcome.style.display = "none";
    content.style.opacity = "1";
  }, 3000);
});
