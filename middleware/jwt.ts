const jwt = require("jsonwebtoken");

function getSecret() {
  const ret = Buffer.from(process.env.JWT_SECRET, "base64").toString();

  return ret;
}

export function token(token: string): any {
  var encodedToken = jwt.sign(
    {
      data: {
        accessToken: token
      },
    },
    getSecret(),
    { expiresIn: "23h" }
  );

  console.log("encoded_token", encodedToken);
  
  return encodedToken;
}

export function verifyToken(token) {
  try {
    var decodedToken = jwt.verify(token, getSecret());
    if(Date.now() >= decodedToken.exp * 1000){
      return "expired"
    }
    return decodedToken.data
  } catch (e) {
    return "error";
  }
}

export function verifyTokenAccess(token) {
  var userLogin = null;
  var result = {};
  try {
    var decodedToken = jwt.verify(token, getSecret());
    userLogin = Buffer.from(decodedToken.data, "base64").toString("ascii");
    result = { userLogin };
    return result;
  } catch (e) {
    console.log("verifyTokenAccess", e.message);
    return "error";
  }
}
