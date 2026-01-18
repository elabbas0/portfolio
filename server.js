require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); 
const path = require('path'); // Built-in Node module

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/steam', async (req, res) => {
  try {
    const url =
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/` +
      `?key=${process.env.STEAM_API_KEY}` +
      `&steamid=${process.env.STEAM_STEAMID}` +
      `&include_appinfo=true` +
      `&include_played_free_games=1`;

    const steamRes = await fetch(url);
    const data = await steamRes.json();

    const games = (data.response.games || []).map(g => ({
      name: g.name,
      hours: Math.floor(g.playtime_forever / 60),
      appid: g.appid
    }));

    games.sort((a,b) => b.hours - a.hours);
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Steam data' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));