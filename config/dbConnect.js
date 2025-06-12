const mongoose = require('mongoose');

//function to connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected successfully');
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }

}

dbConnect();


