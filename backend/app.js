const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors(), express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://mongo:27017/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecting to Mongo URI:", process.env.MONGO_URI);
  });

const Task = mongoose.model("Task", {
  text: String,
  status: { type: String, default: "Pending" },
});

app.get("/tasks", async (_, res) => res.json(await Task.find()));
app.post("/tasks", async (req, res) => res.json(await Task.create(req.body)));
app.delete("/tasks/:id", async (req, res) =>
  res.json(await Task.findByIdAndDelete(req.params.id))
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend listening on port ${port}`));
