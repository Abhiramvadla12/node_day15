//bcrypt chesthuna mama
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const fs = require("fs")
const exp = require("constants");
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hi this is abhiram, and this is home page");
})
app.post("/products",async(req,res)=>{
    console.log(req.body);
    let salt = 10;
    let hash_pas = await bcrypt.hash(req.body.password,salt);
    console.log(hash_pas);
    let dataa = {
        username:req.body.username,
        password:hash_pas
    }
    fs.writeFile("data_store_cheskune_file.json",JSON.stringify(dataa),"utf-8",(err)=>{
        if(err){
            res.status(400).send({
                status:400,
                message:"file la data store kale mama"
            })
        }
        else{
            res.status(200).send({
                status:200,
                message:"file la data store ayindhi mama",
                data:dataa
            })
        }
    })
    res.status(200).send({
        status:200,
        message:"hash chesina mama password ni",
        data:dataa
    });
});
app.post("/login",async(req,res)=>{
    var stored_data = fs.readFileSync("./data_store_cheskune_file.json","utf-8");
    console.log(stored_data);
    console.log(JSON.parse(stored_data));
    let temp = JSON.parse(stored_data);
    let {username,password} = temp;
    console.log(username,password);
    let userpass = req.body.password;
    console.log(userpass);
    let match = await bcrypt.compare(userpass,password);
    console.log(match);
    if(match){
        res.send("login ayinav mama");
    }
    else{
        res.send("ni details levu mama degara");
    }
    
})
let port = 3000;
app.listen(port,()=>{
    console.log(`server has started at http://localhost:${port}`);

});