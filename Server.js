const express=require('express')
const mongoose=require('mongoose')
const app =express()
const dotenv=require('dotenv')
const cors=require('cors')
const path=require('path')
dotenv.config()
if(process.env.NODE_ENV==='local'){
    app.use(cors({
        origin:'http://localhost:3000',
        credentials:true
    }))
}else{
    app.use(cors({
       
        credentials:true
    }))
}

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"./frontend/dist")))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"./","frontend","dist","index.html"))
    })
}

const dbconnect =async()=>{
    try{
        if(process.env.NODE_ENV==='local'){
            await mongoose.connect(process.env.LOCAL_DB_URI)
            console.log('local connect')
        }
        else{
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('production database connect')
        }
    }
    catch(error){
        console.log('database conection failed')
    }
}
dbconnect()
const port=process.env.PORT

app.get('/',(req,res)=>res.send('helloword'))
app.listen(port,()=>console.log(`server is running on port ${port}`))