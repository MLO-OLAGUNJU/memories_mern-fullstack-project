import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    console.log("Received token:", token);

    let decodedData;

    if (token.length < 500) {
      // Assuming it's a custom authentication token
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      // Assuming it's a Google authentication token
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
