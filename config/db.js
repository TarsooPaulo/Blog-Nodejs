require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.advpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  };
} else {
  module.exports = {
    mongoURI: `mongodb://${process.env.SERVER_IP}/blogapp`,
  };
}
