import express from "express";
import mongoose from "mongoose";
import UsersModel from "./db.js";
import cors from "cors";
// App config
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

// DB config
const connectionUrl =
  "mongodb+srv://yourbuca:G4bXYBC2B6x6hQD@cluster0.0o8zi.mongodb.net/youbuca?retryWrites=true&w=majority";
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// Router
app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/signup", async (req, res) => {
  try {
    const user = new UsersModel(req.body);
    await user.save();
    delete req.body.password;
    res.send({user:req.body, token:mongoose.Types.ObjectId()});
  } catch (err) {
    res.status(400).send({
      error: "Mobile number or Email already in use. Try another...",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await UsersModel.findOne(req.body);
    user.password = ""
    res.status(200).send({user:user, token:mongoose.Types.ObjectId()});
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});
// Listen
app.listen(PORT, () => {
  console.log("p");
});
