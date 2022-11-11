const express = require('express')  //express 모듈 가져옴
const app = express()           //앱 생성
const port = 5000   

const {User} = require("./models/User"); 
const { auth } = require("./middleware/auth");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const config = require('./config/key');

//application x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//application/json
app.use(bodyParser.json())
app.use(cookieParser())


app.get('/', (req, res) => {        //루트 디렉터리에 hello world 출력
  res.send('Hello World!')
})


app.get('/api/hello', (req,res)=>{
  res.send("hi~~~")
})


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI , {
    useNewUrlParser:true
    // , useUnifiedTopologe: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('Mongodb connected ...'))
    .catch(err => console.log(err))

// mongodb+srv://boilerplate:<password>@boilerplate.5o8pl.mongodb.net/?retryWrites=true&w=majority


app.post('/api/users/register', (req,res) => {
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


app.post('/api/users/login', (req, res) => {
  //요청된 이메일이 DB에 있는지 찾기
  User.findOne({email: req.body.email}, (err, user) =>{
    
    if(!user) {
       return res.json({
         loginSuccess: false,
         message: "입력한 이메일을 찾을 수 없습니다."
       })
     }

     // 있으면 비밀번호 일치 확인
     user.comparePassword(req.body.password, (err, isMatch) =>{
      if(!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        })  

  //비밀번호 일치 -> 토큰 생성 user변수에 토큰 받아옴
        user.generateToken((err, user) =>{

          if(err) return res.status(400).send(err);

          //토큰을 저장한다.(저장 위치는 쿠키나 로컬스토리지 등에 저장할 수 있다)
          //여기서는 쿠키에 저장함
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id})          

        })


     } )



   })


})


app.get('/api/users/auth', auth, (req, res) => {

  // 이 라인 까지 미들웨어가 통과하면 authentication이 true 값을 가짐

  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image
  })

})

app.get('/api/users/logout', auth , (req, res) => {

  User.findOneAndUpdate({ _id: req.user._id }, 
    {token: ""}
    , (err, user) => {
      if(err) return res.json({success: false, err});
      return res.status(200).send({
        success: true,

      })
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})