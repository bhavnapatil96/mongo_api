const mongoose=require('mongoose');
const {Schema}=require('mongoose')
const {validator}=require('validator')
const conn=require('../db/conn')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {Dept}=require('./dept');
var EmpSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },

    dob:{
        type:Date,

    },

    photo:{
       type:String,

    },
    did:
        {
            type:String,

        },
    flag:{
        type:Boolean,
        default:true,
    },
    token:[{
        access:{
            type:String
        },
        token:{
            type:String
        }
    }]


});
EmpSchema.pre('save',(function (next) {
    let emp=this;


    if(emp.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(emp.password,salt,(err,hash)=>{
                emp.password=hash;
                next();
            })
        })
    }
    else
    {
        next();
    }
}))
EmpSchema.methods.generateAuth=function () {
    let emp=this;
    let access='auth';
    let token=jwt.sign({_id:emp._id.toHexString(),access},'abc').toString();
    emp.token.push({access,token});
    return emp.save().then(()=>{
        return token;
    })

}
let Emp=mongoose.model('Emp',EmpSchema);
module.exports={Emp}