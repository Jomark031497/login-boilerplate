const joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = joi.object({
        username: joi.string().min(6).required(),
        password: joi.string().min(6).required(),
    });

    const err = schema.validate(data);

    return err;
};

const loginValidation = (data) => {
    const schema = joi.object({
      username: joi.string().min(6).required(),
      password: joi.string().min(6).required(),
    });
    return schema.validate(data);
  };
  
  module.exports = {
    loginValidation,
    registerValidation,
  };