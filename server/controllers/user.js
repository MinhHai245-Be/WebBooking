const User = require("../models/user");

exports.postRegister = (req, res, next) => {
  const signup = req.body;
  User.findOne({ username: signup.email })
    .then((isuser) => {
      if (isuser) {
        res.status(200).json({ isSignup: false });
      } else {
        const user = new User({
          username: signup.email,
          password: signup.password,
          fullname: "HuynhMinhHai",
          phoneNumber: "03333333",
          email: signup.email,
          isAdmin: false,
        });
        user.save();
        res.status(200).json({ isSignup: true });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

exports.postLogin = (req, res, next) => {
  const login = req.body;
  User.findOne({ email: login.email, password: login.password })
    .then((user) => {
      if (user) {
        res.status(200).json({ isLogin: true, user: user });
      } else {
        res.status(200).json({ isLogin: false });
      }
    })
    .catch((err) => {
      res.json(err);
    }); // Lấy tất cả user từ MongoDB
};
