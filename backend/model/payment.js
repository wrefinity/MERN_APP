import Mongoose from 'mongoose';

const paymentSch = new Mongoose.Schema({
    amount:{type:String, required:true},
    post:{type:String, required:true},
    address:{type:String, required:true},
    phoneNo:{type:String, required:true},
    country:{type:String, required:true},
    state:{type:String, required:true},
    city:{type:String, required:true},
    zip_code:{type:String, required:true},
    fullname:{type:String, required:true}
}, {timestamps:true})



const payModel = Mongoose.model('payment', paymentSch);
export default payModel