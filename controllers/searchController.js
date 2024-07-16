const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Blog = require('../models/blogModel'); // Assuming your blog model file is named blogModel.js

const searchUsers = asyncHandler(async (req, res) => {
    const { username } = req.query;

    if (!username) {
        res.status(400);
        throw new Error("Username query parameter is required");
    }

    // Using regex to find users whose username contains the search term
    const users = await User.find({ username: new RegExp(username, 'i') });

    if (!users.length) {
        res.status(404).json({ message: 'No users found' });
        return;
    }

    // Fetch blogs for each user
    //const userIds = users.map(user => user._id);
    //const blogs = await Blog.find({ user_id: { $in: userIds } });

    // Combine user info with their blogs
    const result = users.map(user => ({
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
        //blogs: blogs.filter(blog => blog.user_id.toString() === user._id.toString())
    }));

    res.status(200).json(result);
});


const showBlogs = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        res.status(400);
        throw new Error("User ID parameter is required");
    }

    // Find blogs by user ID
    const blogs = await Blog.find({ user_id: userId });

    if (!blogs.length) {
        res.status(404).json({ message: 'No blogs found for this user' });
        return;
    }

    res.status(200).json(blogs);
});

const searchBlogs = asyncHandler(async (req, res) => {
    const { title } = req.query;

    if (!title) {
        res.status(400);
        throw new Error("Title query parameter is required");
    }

    // Using regex to find blogs whose title contains the search term
    const blogs = await Blog.find({ title: new RegExp(title, 'i') });

    if (!blogs.length) {
        res.status(404).json({ message: 'No blogs found' });
        return;
    }

    res.status(200).json(blogs);
});

module.exports = { searchUsers, showBlogs, searchBlogs };
