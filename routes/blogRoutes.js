const express=require("express");
const router=express.Router();
const {getBlogs,getBlog,postBlog,putBlog,deleteBlog,}= require("../controllers/blogController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getBlogs).post(postBlog);
router.route("/:id").get(getBlog).delete(deleteBlog).put(putBlog);

