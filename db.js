const mongoose = require('mongoose'); 

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/user_crud'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;  

db.on('connected', () => {                      
    console.log('Connected to MongoDB Server')
})

db.on('error', () => {                           
    console.log('MongoDB Connection Error', err)
})

db.on('disconnected', () => {                   
    console.log('MongoDB Dis-Connected')
})

module.export = db