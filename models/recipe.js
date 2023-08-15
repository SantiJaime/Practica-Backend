const { Schema, model } = require("mongoose")

const RecipeShema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
})

RecipeShema.methods.toJSON = function () {
    const { __v, ...recipe } = this.toObject();
    return recipe;
  };

const RecipeModel = model("recipe", RecipeShema)

module.exports = RecipeModel