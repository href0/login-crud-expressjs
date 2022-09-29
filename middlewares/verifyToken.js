import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.header("authorization"); // mengambil header
  const token = authHeader && authHeader.split(" ")[1]; // mengambil token, jika tidak ada header makan null
  if (token == null)
    return res.status(401).json({ status: false, message: "Unauthorized" }); // jika token null status Unauthorized

  // jika token ada, maka verify tokennya
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;
