const { Schema, model } = require("mongoose")

const ColorSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    cod: {
        type: Number,
        required: true,
        unique: true,
    },
    codHex: {
        type: String,
        default: "No asignado"
    },
    codRGB: {
        type: String,
        default: "No asignado"
    },
})

ColorSchema.methods.toJSON = function () {
    const { __v, ...color } = this.toObject();
    return color;
  };

const ColorModel = model("color", ColorSchema)

module.exports = ColorModel