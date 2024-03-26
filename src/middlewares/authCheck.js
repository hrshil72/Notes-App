const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.send("Access Denied");
  }
};

module.exports = isLoggedIn;
