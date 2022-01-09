const express = require("express");
const { User } = require("../../model/user");
const router = express.Router();
const { authenticate } = require("../../middleware");

router.get("/logout", authenticate, async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
});

router.get("/current", authenticate, async (req, res, next) => {
  const { name, email } = req.user;
  res.json({
    user: { name, email },
  });
});

module.exports = router;
