const express = require("express");
const cors = require("cors");
require("dotenv").config();
const DataBase = require("./config/DataBase");



// Connect to DB 
DataBase();


// Run express server
const app = express();


// middleware
app.use(express.json());
app.use(cors({
    origin: "*"
}));


// Routes
app.use("/api/v1/category" , require("./routes/CategoryRoute"));
app.use("/api/v1/subcategory" , require("./routes/subCategoryRoute"));
app.use("/api/v1/products" , require("./routes/productRoute"));


// Run server
const port = process.env.PORT || 8000;
app.listen(port , () => console.log(`Server is run on port ${port}`));
