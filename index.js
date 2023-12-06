import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs"; // Import EJS package

// Initialize Express app and define port
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configure middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", async (req, res) => {
  try {

    quote_ = (await axios.get(`https://animechan.xyz/api/random`)).data;

    const randomQuote = quote_.quote;
    const characterName = quote_.character;

    ejs.renderFile(
      __dirname + "/views/index.ejs",
      { randomQuote: randomQuote, characterName: characterName },
      (err, html) => {
        if (err) {
          console.error("Error rendering EJS template:", err);
          res.status(500).send("Internal Server Error");
        } else {
          res.send(html);
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.render("index.ejs", { randomQuote: "Error", characterName: "Error" });
  }
});

app.get("/getQuote", async (req, res) => {
  try {
    const quote_ = (await axios.get(`https://animechan.xyz/api/random`)).data;

    const randomQuote = quote_.quote;
    const characterName = quote_.character;

    // const randomQuote = "Look, even if we were enemies in the world you were before, right now I’m your only ally. Even if the whole world turned against you, I would continue to be your only ally."
    // const characterName = "another-author"

    res.json({ randomQuote, characterName });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ randomQuote: "Error", characterName: "Error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
