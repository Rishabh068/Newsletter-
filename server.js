//jshint esverion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    console.log(fname);
    console.log(email);

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname,
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url= "https://us9.api.mailchimp.com/3.0/lists/207572fc24";

    const options={
        method:"POST",
        auth:"Rishabh:467c302931e7b9999afc2e27297df916-us9"
    };
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();


});

app.listen(process.env.PORT||3000,function(){
    console.log("server started on port 3000");
});






//apikey:467c302931e7b9999afc2e27297df916-us9
//audid:207572fc24