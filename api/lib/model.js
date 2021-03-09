const mongoose = require('mongoose');
const  URL  = "mongodb://localhost:27017/KG_TIMESLOT";

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log("DB connected");
}).catch(err =>{
    console.log('DB connection problem - ',err);
    process.exit();
});

const appointmentScheme =new mongoose.Schema({
    fromTime :String,
    toTime:String,
    currentTimeStamp: Number,
    currentDate:String
},{
    timestamps:true,
    collection: 'APPOINTMENTS',
    versionKey: false
});

const userScheme =new  mongoose.Schema({
    name :String,
    contact:String,
    appointment:String,
    waited: String,
    age:String,
    image: String,
    status: String
},{
    timestamps:true,
    collection: 'USERS'
});

var appointment = mongoose.model('Appointment',appointmentScheme);
var users = mongoose.model('USERS', userScheme)
module.exports = {
    appointment:appointment,
    users: users
}