const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Please add a name"]
        },
        description: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        done:{
            type: Boolean
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('todo', todoSchema);