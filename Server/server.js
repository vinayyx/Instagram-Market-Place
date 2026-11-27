const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const compression = require("compression");
const connectDb = require("./config/db")




//IMPORTING CREATOR ROUTES
const Creator = require("./routes/Creator/creator.routes")


//IMPORTING BRAND ROUTES
const Brand = require("./routes/Brand/brand.routes")
const CreatorForBrand = require("./routes/Brand/creatorForBrand.routes")
const shortlistRoutes = require("./routes/Brand/shortlist.routes");



//IMPORING LOGIN ROUTE
const Login = require("./routes/Auth/login.route")


dotenv.config();
const app = express();

app.use(helmet());
connectDb()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Infule API is running ",
  });
});



//CREATOR ROUTES
app.use("/api/creator", Creator)


//BRAND ROUTES
app.use("/api/brand", Brand)
app.use("/api/brand/creator", CreatorForBrand)
app.use("/api/brand/shortlist", shortlistRoutes);


//LOGIN ROUTE
app.use("/api", Login)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});