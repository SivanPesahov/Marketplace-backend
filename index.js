const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv")
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db")

dotenv.config()

async function main(){

    //Connect the database
    await connectDB()

    // MIDDLEWARE
    app.use(express.json());

    // allow CORS for local development (for production, you should configure it properly)
    app.use(
    cors()
    );

    // ROUTES
    const productRoutes = require("./routes/product.route");
    app.use("/api/product", productRoutes);

    // START SERVER
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
}

main()
