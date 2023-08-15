const { Schema, model } = require("mongoose")

const TaskSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    }

})

TaskSchema.methods.toJSON = function () {
    const { __v, ...task } = this.toObject();
    return task;
  };

const TaskModel = model("task", TaskSchema)

module.exports = TaskModel