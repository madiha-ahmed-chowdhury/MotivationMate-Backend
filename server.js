const express=require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv=require("dotenv").config();
connectDB();
const app=express();

const port= process.env.PORT||6001;
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json());
app.use(errorHandler);
app.use("/api/todoList",require("./routes/todoRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/blogs",require("./routes/blogRoutes"));
app.use("/api", require("./routes/searchRoutes")); 

//app.get('/api/todoList/title/:title', require("./routes/todoRoutes"));

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})