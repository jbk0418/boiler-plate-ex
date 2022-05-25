const express = require('express')  //express 모듈 가져옴
const app = express()           //앱 생성
const port = 5000   

const { User } = require("./models/User"); 
const bodyParser = require('body-parser')

const config = require('./config/key')

//application x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {        //루트 디렉터리에 hello world 출력
  res.send('Hello World!')
})

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI , {
    useNewUrlParser:true
    // , useUnifiedTopologe: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('Mongodb connected ...'))
    .catch(err => console.log(err))

// mongodb+srv://boilerplate:<password>@boilerplate.5o8pl.mongodb.net/?retryWrites=true&w=majority


app.post('/register', (req,res) => {
  //회원가입시 필요한 정보들
  // => DB에 삽입
//register route
  const user = new User(req.body)
  user.save((err,userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})


app.post('/login', (res, req)=>{
  //요청된 이메일이 DB에 있는지 찾기
   User.findOne({ email: req.body.email }, (err, user) =>{
     if(!user) {
       return res.json({
         loginSuccess: false,
         message: "입력한 이메일을 찾을 수 없습니다."
       })
     }
  // 있으면 비밀번호 일치 확인
     user.comparePassword( req.body.password , (err, isMatch) =>{
      if(!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        })

  //비밀번호 일치 -> 토큰 생성
        user.generateToken((err, user) =>{
          
        })


     } )



   })


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})