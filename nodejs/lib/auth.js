let httpStatus = require("../constants/httpStatus");
const jwt = require("jsonwebtoken");
let privateKey = "123456qwerty";
let publicKey = "qwerty123456";

const createToken = (id, email) => {
  let payload = {
    userId: id,
    email: email,
  };
  var createOptions = getOptions("createOptions");
  try {
    let token = jwt.sign(payload, privateKey, createOptions);
    return { status: true, token: token };
  } catch (error) {
    return { status: httpStatus.failure, message: "Error while creating the token due to " + error.message };
  }
};

const verifyToken = (authtoken) => {
  let token = authtoken;
  var verifyOtpions = getOptions('verifyOptions');
  try {
    let payload = jwt.verify(token, privateKey, verifyOtpions);
    return { status: true, payload: payload }
  } catch (error) {
    console.log('error while verifying JWT Token', error.message)
    return { status: httpStatus.failure, message: error.message }
  }
};

function getOptions(optionsType) {
  let algorithm = optionsType == 'createOptions' ? 'RS256' : ['RS256']
  return {
    expiresIn: '3h',
  };
}

module.exports = { createToken, verifyToken };
