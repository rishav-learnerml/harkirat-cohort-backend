const express = require("express");
const app = express();

app.get("/hospital-check", (req, res) => {
  const userId = req.headers.username;
  const pass = req.headers.password;
  const numKidneys = parseInt(req.query.numKidneys);
  //early returns
  //auth check
  if (!(userId === "rishav" && pass === "ris1234")) {
    res
      .status(400)
      .json({
        message: "Authentication Failed! Please check your Username/Password!",
      });
    return;
  }
  //kidney check
  if (!(numKidneys === 1 || numKidneys === 2)) {
    res
      .status(400)
      .json({ message: "Invalid number of kidneys! You are not a human!" });
    return;
  }

  //all set
  res
    .status(200)
    .json({
      message: "All tests done! You can now go to the doctor's chamber!",
    });
});

app.listen(3000,()=>{console.log('server running on port 3000')})