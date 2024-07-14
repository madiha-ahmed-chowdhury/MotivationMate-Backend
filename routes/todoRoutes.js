const express=require("express");
const router=express.Router();
const {getTodos,getTodo,postTodo,putTodo,deleteTodo,getTodoByTitle,doneTodo}= require("../controllers/todoController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getTodos).post(postTodo);
router.route("/:id").get(getTodo);
router.route("/title/:title").get(getTodoByTitle).put(putTodo).delete(deleteTodo);
router.route("/done/title/:title").put(doneTodo);
module.exports=router;
