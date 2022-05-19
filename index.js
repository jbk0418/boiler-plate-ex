const express = require('express')  //express 모듈 가져옴
const app = express()           //앱 생성
const port = 5000   

const { User } = require("./models/User"); 
const bodyParser = require('body-parser')

//application x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {        //루트 디렉터리에 hello world 출력
  res.send('Hello World!')
})

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://boilerplate:12345@boilerplate.5o8pl.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true
    // , useUnifiedTopologe: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('Mongodb connected ...'))
    .catch(err => console.log(err))

// mongodb+srv://boilerplate:<password>@boilerplate.5o8pl.mongodb.net/?retryWrites=true&w=majority


app.post('/register', (req,res) => {
  //회원가입시 필요한 정보들
  // => DB에 삽입

  const user = new User(req.body)
  user.save((err,userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})