const express = require("express");
const zod = require("zod");
const app = express();

//validation schema
const kidneySchema = zod.array(zod.string());
const authSchema = zod.object({
  username: zod.literal("rishav"),
  password: zod.literal("ris1234"),
});

//middleware functions

const handleException = (err, req, res, next) => {
  console.log("first", err);
  res
    .status(err.status)
    .json({ message: "Oops! server crashed!", error: err.type });
};

const authChecker = (req, res, next) => {
  const userId = req.headers.username;
  const pass = req.headers.password;
  const response = authSchema.safeParse({ userId, pass });
  if (!response.success) {
    res.status(400).json({
      message: "Authentication Failed! Please check your Username/Password!",
    });
  }
  console.log("succesfully logged in: ", response.data);
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
  const kidneys = req.body.kidneys;
  const response = kidneySchema.safeParse(kidneys);
  if (!response.success) {
    res.status(411).json({ message: "Invalid inputs!" });
  }
  const numKidneys = response.data.length;
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

//middleware - handles all exceptions
app.use(handleException);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
