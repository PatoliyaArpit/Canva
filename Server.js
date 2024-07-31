const express=require('express')
const mongoose=require('mongoose')

const app =express()
const dotenv=require('dotenv')
const cors=require('cors')
const path=require('path')
dotenv.config()
require('dotenv').config();
app.use(express.json())


var FCM = require('fcm-node');
    var serverKey = '<SERVER_KEY>';
    var fcm = new FCM(serverKey);

    var message = {
        to:'<DEVICE_TOKEN>',
            notification: {
                title: 'NotifcatioTestAPP',
                body: '{"Message from node js app"}',
            },
    
            data: { //you can send only notification or only data(or include both)
                title: 'ok cdfsdsdfsd',
                body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
            }
    
        };
        fcm.send(message, function(err, response) {
            if (err) {
                console.log("Something has gone wrong!"+err);
                console.log("Respponse:! "+response);
            } else {
                // showToast("Successfully sent with response");
                console.log("Successfully sent with response: ", response);
            }
    
        });

if(process.env.NODE_ENV==='local'){
    app.use(cors({
        origin:'http://localhost:5173',
        credentials:true
    }))
}else{
    app.use(cors({
       
        credentials:true
    }))
}
app.use('/api',require('./routes/authRoutes'))
app.use('/api',require('./routes/designRoutes'))
app.use('/api',require('./routes/msgRoutes'))

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"./frontend/dist")))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"./","frontend","dist","index.html"))
    })
}

const dbconnect =async()=>{
    try{
        // if(process.env.NODE_ENV=="local"){
        //     await mongoose.connect(process.env.LOCAL_DB_URI)
        //     console.log('local connect')
        // }
        // else{
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('production database connect')
        // }
    }
    catch(error){
        console.log('database conection failed')
    }
}

dbconnect()
const port=process.env.PORT

app.get('/',(req,res)=>res.send('helloword'))
app.listen(port,()=>console.log(`server is running on port ${port}`))