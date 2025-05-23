import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running. Use /reviews to get Google reviews.");
});

const API_KEY = process.env.API_KEY;
const PLACE_ID = process.env.PLACE_ID;

// Fisher-Yates shuffle helper function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

app.get("/reviews", async (req, res) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,reviews,name&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    // Shuffle reviews before responding
    if (Array.isArray(data.result?.reviews)) {
      shuffleArray(data.result.reviews);
    }

    console.log("Google API response (shuffled):", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
