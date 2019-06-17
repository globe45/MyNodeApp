//importing modules
//require function is used to import the module
var express=require("express");
var mongodb=require("mongodb");
var cors= require("cors");
var jwt=require("jwt-simple");
var bodyparse=require("body-parser");

//create the rest object
var app =express();

//set the json as mime type
app.use(bodyparse.json());

//read the Post parameter
app.use(bodyparse.urlencoded({extended:false}));

//unable the cors
app.use(cors());

//create the client 
var client=mongodb.MongoClient;

//create the rest api

app.post("/login",(req,res)=>{
    //reading the clent data
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var obj={'uname':uname,'upwd':upwd};

    client.connect("mongodb://localhost:27017/mern",(err,db)=>{
        db.collection("login_details").find().toArray((err,array)=>{
            if(err)
                throw err;
            else{
                        var newArray=array.filter((element,index)=>{
                        return (element.uname==obj.uname) && (element.upwd==obj.upwd);

                         })
                            if(newArray.length>0){
                            var token=jwt.encode(obj,'sangam@45');
                            res.send({
                            login :'success',
                            token:token
                            });
                        }
                        else{
                         res.send({
                         login:'fail'
                         }); 
                        }
            
            }


        })
        
    })
   

})
 app.listen(3030);
 console.log("server is listening the port number 3030");
