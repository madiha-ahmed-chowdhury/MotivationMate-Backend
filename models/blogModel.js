const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Please add a title"]
        },
        content: {
            type: String,
            required: [true, "Please add content"]
        },
        tag:{
            type: String
        },
        url: {
            type: String,
            required: false  // Optional field
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Blog', blogSchema);
