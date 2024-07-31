const {model,Schema, Types}=require('mongoose')

const sms_schema=new Schema({
    name:{
        type:String,
        required:true,
    },
    
    contact:{
        type:String,
        required:true,
       
    },
   
},{timestamps:true})

module.exports=model('sms',sms_schema)