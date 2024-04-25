import Joi from "joi";

const userValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a valid string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:'\"|,.<>\\/?]).{8,30}$"
      )
    )
    .required()
    .messages({
      "string.base": "Password must be a valid string",
      "string.empty": "Password cannot be empty",
      "string.pattern.base": "Create Strong Password",
      "any.required": "Password is required",
    }),
  confirm: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "confirm Password",
  }),
});

const messageValidation = Joi.object({
  firstName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z ]{3,20}$/))
    .required()
    .messages({
      "string.pattern.base": "Please provide clear  firstName",
      "string.empty": "FirstName cannot be empty",
      "any.required": "First Name is required",
    }),
  lastName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z ]{3,20}$/))
    .required()
    .messages({
      "string.pattern.base": "Please Provide a clear LastName",
      "string.empty": "FirstName cannot be empty",
      "any.required": "Last Name is required",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a valid string",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  phoneNumber: Joi.string()
    .pattern(new RegExp(/^(072|078|079|073)[0-9]{7}$/))
    .required()
    .messages({
      "string.pattern.base":
        "Please provide a valid phone number starting with 072, 078, 079, or 073 followed by 7 digits.",
      "any.required": "Phone number is required.",
    }),
  message: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z ]{3,255}$/))
    .required()
    .messages({
      "string.pattern.base": "Please provide the clear message",
      "any.required": "Message is required",
    }),
});
export { userValidation, messageValidation };
