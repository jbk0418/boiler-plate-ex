const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;      //salt 이용해서 비밀번호 암호화
const jwt = require('jsonwebtoken');

const userSchema  = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,  //이메일 사이 공백 제거
        unique: 1    //중복 제거
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

//저장 전 실행 되는 함수

//next 함수는 현재 라우터에서 판단하지 않고 다음 라우터로 넘기겠다는 뜻이다 여기서는 save로 넘어감

userSchema.pre('save', function(next){          
    var user = this; 
    //비밀 번호 암호화(여기서는 salt 사용)

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
                if(err) return next(err)
                bcrypt.hash(user.password , salt, function(err, hash){
                    if(err) return next(err)
                    user.password = hash  //hash로 변경
                    next()
                })
            })
    }
    else{
        next()
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainPassword 와 암호화된 비번 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        

        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    
    var user = this;

    //jsonwebToken을 사용해서 webtoken 생성

    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    /*
        user.id + secretToken => token 생성

        이 token으로 유저 구별

    */

    user.token = token
    user.save(function(err,user){

        if(err) return cb(err)
        cb(null,user)

    })

}


userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 복호화 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾고
        //클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치 하는지 확인

        user.findOne({ _id: decoded, token: token }, function(err, user){
            if(err) return cb(err);
            cb(null, user)

        })
    })

}


const User = mongoose.model('User', userSchema)

module.exports = { User }