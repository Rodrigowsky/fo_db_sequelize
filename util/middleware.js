const jwt = require("jsonwebtoken");

const errorHandler = (error, request, response, next) => {
  console.error("error", error.message);

  if (error.name === "SequelizeDatabaseError") {
    return response
      .status(400)
      .send({ error: "database does not support this command" });
  }

  next(error);
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const authVerification = (req, res, next) => {
  const token = getTokenFrom(req);
  
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  

  if (!decodedToken.username || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  req.authToken = decodedToken;

  next();
};

module.exports = { errorHandler, authVerification };
