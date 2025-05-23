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

app.get("/reviews", async (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,reviews,name&key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("Google API response:", data);
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
