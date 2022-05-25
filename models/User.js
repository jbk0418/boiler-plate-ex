const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;      //salt 이용해서 비밀번호 암호화

const userSchema  = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,  //이메일 사이 공백 제거
        unique: 1
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
userSchema.pre('save', function(next){
    var user = this; 
    //비밀 번호 암호화

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
        if(err) return cb(err),
            cb(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }