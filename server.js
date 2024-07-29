const express = require("express");
const app = express();

//middleware functions

const authChecker = (req, res, next) => {
    const userId = req.headers.username;
    const pass = req.headers.password;
    if (!(userId === "rishav" && pass === "ris1234")) {
        res.status(400).json({
            message: "Authentication Failed! Please check your Username/Password!",
        });
    }
    next();
};

const heartChecker = (req, res, next) => {
  const heartHasHole = req.body.hasHole.toLowerCase() === "true" ? true : false;
  if (heartHasHole) {
    res
      .status(400)
      .json({ message: "Your heart has a hole! Get the surgery done asap!" });
  }
  next();
};

const kidneyChecker = (req, res, next) => {
  const numKidneys = parseInt(req.body.numKidneys);
  if (!(numKidneys === 1 || numKidneys === 2)) {
    res
      .status(400)
      .json({ message: "Invalid number of kidneys! You are not a human!" });
  }
  next();
};

//common middlewares
app.use(express.json());
app.use(authChecker);

//routes
app.get("/hospital-check", heartChecker, kidneyChecker, (req, res) => {
  //all set
  res.status(200).json({
    message: "All tests done! You can now go to the doctor's chamber!",
  });
});

app.get("/heart-check", heartChecker, (req, res) => {
  //all set
  res.status(200).json({
    message: "Your heart is healthy!",
  });
});

app.get("/kidney-check", kidneyChecker, (req, res) => {
  //all set
  res.status(200).json({
    message: "Your kidney is healthy!",
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
