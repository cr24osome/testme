'use strict';

const jwt = require('jsonwebtoken');

const JwtAuth = function (_token) {
  const token = _token;
  console.log(token)
};

function jwtMiddleware(req, res, next) {
  const jwtHeader = req.get('Authorization');
  if (jwtHeader) {
    const token = jwtHeader.substr(jwtHeader.indexOf(' ') + 1);
    const jwtToken = jwt.verify(token, 'SuperSuperSecret12345');
    console.log(jwtToken)
    if (jwtToken) {
      req.auth = new JwtAuth(jwtToken);
      next();
    }
    else {
      res.status(401);
      res.end();
    };
  }
  else {
    res.status(401);
    res.end();
  };
};

module.exports = jwtMiddleware;
