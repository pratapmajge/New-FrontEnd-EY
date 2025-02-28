const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://gofood:pratap123@database1.ez26n.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=database1");

    console.log("Connected to MongoDB successfully!");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(function(err, data){
        if(err) console.log(err);
        else console.log(data);
    })
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = mongoDB;
