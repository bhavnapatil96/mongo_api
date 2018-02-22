const mongoose=require('mongoose');
const {validator}=require('validator')
const conn=require('../db/conn');

var deptSchema=new mongoose.Schema({

    deptname:{
        type:String,
        required:true,
        trim:true,
    },
    flag:{
        type:Boolean,
        required:true,
        default:1
    }

});

let Dept=mongoose.model('Dept',deptSchema);
module.exports={Dept}