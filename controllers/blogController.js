const asyncHanlder = require("express-async-handler");
const blogModel = require("../models/blogModel");

//@desc get all blog items
//@route GET /api/blog
//@access public
// const getBlogs = asyncHanlder(async (req, res) => {
//     const Blogs = await todoModel.find({user_id:req.user.id});
//     res.status(200).json(Blogs);
// });

//@desc get all blog items
//@route GET /api/blog
//@access private
const getBlogs = asyncHanlder(async (req, res) => {
    const Blogs = await blogModel.find({user_id:req.user.id});
    res.status(200).json(Blogs);
});

//@desc get blog item
//@route GET /api/blog/:id
//@access public
const getBlog = asyncHanlder(async (req, res) => {
    const Blog = await blogModel.findById(req.params.id);
    if (!Blog) {
        res.status(404);
        throw new Error("Blog item not found");
    }
    res.status(200).json(Blog);
});

// //@desc get todo item
// //@route GET /api/todo/title/:title
// //@access private
// const getTodoByTitle = asyncHanlder(async (req, res) => {
//     const title = req.params.title;
//     const todo = await todoModel.findOne({ title });

//     if (!todo) {
//         res.status(404);
//         throw new Error("Todo item not found");
//     }

//     res.status(200).json(todo);
// });


//@desc post blog item
//@route Post /api/blog
//@access private
const postBlog = asyncHanlder(async (req, res) => {
    console.log("The request body is :", req.body);
    const { title, content, url } = req.body;
    if (!title) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const Blog = await blogModel.create(
        {
            title,
            content,
            url,
            user_id:req.user.id,
            done:false
        }
    )
    res.status(201).json(Blog);
});

//@desc update blog item
//@route Put /api/blog/:id
//@access private
const putBlog = asyncHanlder(async (req, res) => {
    //const title = req.params.title;
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
        res.status(404);
        throw new Error("Blog item not found");
    }

    if(blog.user_id.toString()!=req.user.id){
        res.status(403);
        throw new Error("Item cannot be updated by you");
    }

    // Apply updates
    const updates = req.body;
    Object.keys(updates).forEach((key) => {
        blog[key] = updates[key];
    });

    // Save the updated document
    await blog.save();

    res.status(200).json(blog);

});

//@desc delete todo item
//@route Delete /api/todo/:id
//@access private
const deleteBlog = asyncHanlder(async (req, res) => {
    const blog = await blogModel.findById(req.params.id);

    if(!blog) {
        res.status(404);
        throw new Error("Item not found");
    }
    if(blog.user_id.toString()!=req.user.id){
        res.status(403);
        throw new Error("Item cannot be deleted by you");
    }
    const blogId = req.params.id; 
    await blogModel.deleteOne({ _id: blogId });
    res.status(200).json(blog);
});


module.exports = {
    getBlogs, getBlog, postBlog, putBlog, deleteBlog
}
