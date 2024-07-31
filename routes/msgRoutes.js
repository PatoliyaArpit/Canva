const SmsContro=require('../controllers/SmsContro')
const router=require('express').Router()

router.post('/user-msg',SmsContro.user_sms)

module.exports=router