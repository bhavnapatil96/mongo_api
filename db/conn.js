const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/company',(err,res)=>{
    console.log('Connected')
});