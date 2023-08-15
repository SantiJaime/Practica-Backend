const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, pass, ...user } = this.toObject();
    return user;
  };

const UserModel = model("user", UserSchema)

module.exports = UserModel