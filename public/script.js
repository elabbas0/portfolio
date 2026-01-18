/**
 * 1. GREETING LOGIC
 */
function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning!";
    if (hour >= 12 && hour < 18) return "Good Afternoon!";
    if (hour >= 18 && hour < 22) return "Good Evening!";
    return "Hello!";
}

const welcomers = ["Welcome!", "Hey there!", "Hi!"];
const allPossibleGreetings = [...welcomers, getTimeGreeting()];
const randomGreeting = allPossibleGreetings[Math.floor(Math.random() * allPossibleGreetings.length)];


async function loadSteamGames() {
    const container = document.getElementById('steam-cards-container');
    if (!container) return;

    try {
        
        const response = await fetch('/api/steam');
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const games = await response.json();

        // Get top 3 games by playtime (already sorted by backend)
        const topGames = games.slice(0, 3);

        if (topGames.length === 0) {
            container.innerHTML = "<p>No recent gaming activity found.</p>";
            return;
        }

        container.innerHTML = topGames.map(game => `
            <div class="game-card">
                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg" 
                     alt="${game.name}" 
                     onerror="this.src='https://via.placeholder.com/460x215?text=${encodeURIComponent(game.name)}'">
                <div class="game-info">
                    <h3>${game.name}</h3>
                    <p>${game.hours} Hours Played</p>
                </div>
            </div>
        `).join('');

    } catch (err) {
        console.error("Error loading games:", err);
        container.innerHTML = "<p>Unable to load Steam activity at this time.</p>";
    }
}

window.addEventListener("load", () => {
    const welcome = document.getElementById("welcome");
    const welcomeText = document.getElementById("welcome-text");
    const content = document.getElementById("content");

    if (welcomeText) welcomeText.textContent = randomGreeting;

    // Trigger Steam fetch immediately
    loadSteamGames();

    setTimeout(() => {
        if (welcome && content) {
            welcome.style.transition = "opacity 0.5s ease";
            welcome.style.opacity = "0";
            
            setTimeout(() => {
                welcome.style.display = "none";
                content.style.opacity = "1";
                content.style.visibility = "visible"; 
            }, 500);
        }
    }, 2500);
});