const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  console.log(req.headers)
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verify = jwt.verify(token, process.env.SECRET_KEY);

    if (verify) next();
    else res.status(401).json({ msg: "Debes loguearte primero" });
  } catch (error) {
    res.status(500).json({ msg: "Error: token", error });
  }
};
