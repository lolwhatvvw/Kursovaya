const db = require("../../../config/db");
const User = require("../model/User");

exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ email: req.body.email });
    if (isUser.length >= 1) {
      return res.status(409).json({
        message: "email already in use"
      });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      favorite: req.body.favorite
    });
    let data = await user.save();
    const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.updateFavorite = async (req, res) => {
    try {
      const favorite = req.body.favorite
      const email = req.body.email
      let data = await User.updateOne({email: email}, { $addToSet: {favorite: favorite}})
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.getFavorite = async (req, res) => {
  const email = req.body.email
  User.find({ email: email }, 'favorite', function (err, User) {
    const list = User[0]
  res.status(201).json({ list })
  })
};
exports.deleteFavorite = async (req, res) => {
  try {
    const email = req.body.email
    const favorite = req.body.favorite
    let data = await User.updateOne({email: email}, { $pull: {favorite: favorite}})
    User.find({ email: email }, 'favorite', function (err, User) {
      const list = User[0]
      res.status(201).json({ list })
    })
} catch (err) {
  res.status(400).json({ err: err });
}
};