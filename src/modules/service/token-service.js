const jwt = require("jsonwebtoken");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_KEY);
		return accessToken;
	}
}

module.exports = new TokenService();
