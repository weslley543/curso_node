var express = require('express');
var app = express();

let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//mongodb://admin:node123456@ds135797.mlab.com:35797/curso_node_weslley

let mongoose = require('mongoose');
mongoose.connect("mongodb://admin:node123456@ds135797.mlab.com:35797/curso_node_weslley",{
    useNewUrlParser:true}
);

let ToDo = require("./models/todo");

app.get('/', function(req,res){
    res.send('Hello World !! Travis');
});

app.get('/todo', function(req,res){
    ToDo
        .find()
        .exec((err,todos)=>{
            if(!err){
                res.json({sucess:true, 
                message :"ToDos buscados com sucesso",
                todos
            });
            }else{
                res.json({success:false, message : err.message, todos:[]});
            }
        })
});

app.post('/todo', async(req,res)=>{
    try{
        let title = req.body.title;
        let newTodo = new ToDo({
            title:title
        });
        let savedTodo = await newTodo.save();
        res.json({success : true, message : "Sucesso!!!", todo: savedTodo});
    }catch(err){
        res.json({success:false, message:err.message});
    }
})

let port = process.env.PORT || 5000;
app.listen(port,function(){
    console.log('Example app listening on port'+port);
});

module.exports=app;