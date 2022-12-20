const mongoose = require("mongoose");
require("dotenv").config()

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.qc3e0p4.mongodb.net/serverless-demo`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected successfully!"))
  .catch((err) => console.log("error", err));
