const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

// get user validator
exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];

// create user validator
exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name is required")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((value) =>
      User.findOne({email: value}).then((user) => {
        if (user) {
          return Promise.reject(
            new Error("User with this email already exists")
          );
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("User password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirm) {
        return Promise.reject(new Error("Passwords do not match"));
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirm is required"),
  check("phone")
    .isMobilePhone("ar-IQ")
    .withMessage("Invalid phone number format"),
  check("profileImage").optional(),
  check("role").optional(),
  validatorMiddleware,
];

// update user validator
exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  check("name").custom((value, { req }) => {
    if (!value) return true;
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddleware,
];

// change user password validator
exports.changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  check("currentPassword").notEmpty().withMessage("Current password is required"),
  check("password")
    .notEmpty()
    .withMessage("User password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom(async (value, { req }) => {
      // 1) verify current password
      const user = await User.findById(req.params.id);
      if (!user) return Promise.reject(new Error("User not found"));
      const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isMatch) return Promise.reject(new Error("Current password is incorrect"));
      // 2) verify pssword and passwordConfirm match
      if (value !== req.body.passwordConfirm) {
        return Promise.reject(new Error("Passwords do not match"));
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirm is required"),
  validatorMiddleware,
];  

// delete user validator
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid user id format"),
  validatorMiddleware,
];
