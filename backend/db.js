



require('dotenv').config();

const mongoose = require('mongoose');

// Get database name and URI from environment variables
const dbName = process.env.MONGO_DB_NAME || 'HabitQuest';
const baseURI = process.env.MONGO_URI;

// Create the full connection string dynamically
const connectionString = `${baseURI}/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => console.log(`MongoDB connected successfully to database: ${dbName}`))
  .catch(err => console.error('MongoDB connection error:', err));




const userschema= new mongoose.Schema({
    username:String,
    email: {
        type: String,    
        required: true,  
        unique: true,    
        lowercase: true, 
        trim: true,      
        
      },
    password:{
        type:String,
        required:true,
    }  ,

    rewardCount: {
      type: Number,
      default: 0, // Default reward count is 0 when the user is created
  },


})

const habitschema = new mongoose.Schema({
  name: { type: String, required: true },
  targetDays: { type: Number, required: true },
  rewardType: { type: String, required: true },
  streak: { type: Number, default: 0 },
  startDate: { type: String, default: () => new Date().toISOString() },
  frequency: { type: String, default: 'daily' },
  status: { type: [String], default: [] }, // Array of dates for habit completion
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Ensure user ID is stored
});
  
  const Habit = mongoose.model('Habit', habitschema);

const User=mongoose.model("User",userschema);
module.exports={
    User,
    Habit,
}