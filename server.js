const express=require('express');
const bodyParser=require('body-parser');
const conn=require('./db/conn');

const {Emp}=require('./models/emp');
const {Dept}=require('./models/dept');
const _=require('lodash')
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Dept....................................

app.get('/',(req,res)=>{
    res.send('hii')
})

app.post('/dept',(req,res)=>{

    var newDept=new Dept({
        deptname:req.body.deptname
    });
    newDept.save().then((data)=>{
        res.send(data);
    }).catch((e)=>{
        res.send(e);
    })
})

app.get('/dept',(req,res)=>{

    Dept.find({flag:true}).then((data)=>{
        res.send(data);
    }).catch((e)=>{
        console.log(e)
    })
})

app.delete('/dept',(req,res)=>{

    Dept.findByIdAndUpdate(req.body.id,{$set:{flag:false}}).then((data)=>{
        res.send(data);
    }).catch((e)=>{
        console.log(e)
    })
})


app.put('/dept',(req,res)=>{

    let body=_.pick(req.body,['deptname'])
    Dept.findByIdAndUpdate(req.body.id,{$set:body}).then((data)=>{
        res.send(data);
    }).catch((e)=>{
        console.log(e)
    })
})


// EMP.......................................

app.post('/emp',(req,res)=>{
    let date=new Date(req.body.dob);
    var newEmp=new Emp({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        contact:req.body.contact,
        dob:date,
        photo:req.body.photo,
        did:req.body.did
    });
    newEmp.save().then((data)=>{
        let token=newEmp.generateAuth();
        token.then((t)=>{
            res.header('x-auth',t).send(data)
        })
        console.log("data:",data)
       // res.send(data);

    }).catch((e)=>{
        res.send(e)
        console.log("data:",e)
    })
})

app.get('/emp',(req,res)=>{

    Emp.find({flag:true}).sort({name:1}).then((data)=>{
        res.send(data);
    }).catch((e)=>{
        console.log(e)
    })
})

app.delete('/emp',(req,res)=>{

    Emp.findByIdAndUpdate(req.body.id,{$set:{flag:false}}).then((data)=>{
        res.send(data);
    }).catch((e)=>{
        console.log(e)
    })
})

app.put('/emp',(req,res)=>{
    let id=req.body.id;
   // let dob=new Date(req.body.dob);
    let body=_.pick(req.body,['name','contact','email','did','photo'])
    Emp.findByIdAndUpdate(id,{$set:body}).then((data)=>{
        res.send(data);
    }).catch((e)=>{
        console.log(e)
    })
})


app.listen('5005');