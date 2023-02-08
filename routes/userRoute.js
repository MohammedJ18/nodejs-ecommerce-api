const express = require("express");
const {
  getUserValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} = require("../services/userService");
const router = express.Router();
router.route("/").get(getUsers).post(createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);
router.put("/change-password/:id", changeUserPasswordValidator, changeUserPassword);
module.exports = router;
