const mongoose=require('mongoose');

async function connectToDB(params) {
mongoose.connect(process.env.MONGO_URI,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Mongo error:', err));
}

module.exports=connectToDB;