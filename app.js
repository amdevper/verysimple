const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const path = require('path')
app.get('/',(req,res)=>{
    res.sendFile("index.html",{
        root:path.join(__dirname,'./views')
    })
})
    //res.send("<h1>Hello app</h1>")


app.listen(PORT)