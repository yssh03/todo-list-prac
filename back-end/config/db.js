const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://yash0310:drc1234@cluster0.qc3e0p4.mongodb.net/serverless-demo",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected successfully!"))
  .catch((err) => console.log("error", err));
