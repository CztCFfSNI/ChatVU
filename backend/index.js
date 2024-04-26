const express = require("express");
const cors = require("cors");
const {default: axios} = require("axios");
require('dotenv').config({ path: '../.env.local' });

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": process.env.PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    console.error(e);
    if (e.response) {
        return res.status(e.response.status).json(e.response.data);
    } else {
        return res.status(500).json({ message: "Internal server error" });
    }    
  }
//   return res.json({ username: username, secret: "sha256..." });
});

app.listen(3001);
