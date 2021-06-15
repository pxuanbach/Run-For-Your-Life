
const express = require("express")
const  router = express.Router()
const { User } = require("../models/user")
const jwt = require('jsonwebtoken')

const verifyToken = require ('../middlewares/verifyToken')

//Hash Pass bảo mật
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


router.get('/', verifyToken, (request, response) => {
  User.find({}).exec(function (err, users) {
      response.send(users);
  });
});




router.post("/login", async function(req,res){
    let user = await User.findOne({username : req.body.username})
    if (!req.body.username) {
        return res.status(400).send("Vui lòng nhập tài khoản");
      }  
      if (!req.body.password) {
        return res.status(400).send("Vui lòng nhập mật khẩu");
    }
    if (!user) {
        return res.status(400).send("Tài khoản không hợp lệ");
      }
   
    if (!bcrypt.compareSync(req.body.password , user.password)){
        return res.status(422).send("Rất tiếc, mật khẩu của bạn không đúng. Vui lòng kiểm tra lại mật khẩu.")
    }  

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    res.header('auth-token', token).send(token);
    
})


//Change Password
router.post("/changePass", async function(req,res){
let user = await User.findOne({username : req.body.username})
if (!bcrypt.compareSync(req.body.currentPassword , user.newPassword)){
  return res.status(422).send("Rất tiếc, mật khẩu của bạn không đúng. Vui lòng kiểm tra lại mật khẩu.")
}
User.findOneAndUpdate({username : req.body.username},{password:bcrypt.hashSync(req.body.newPassword, salt)},{new : true},(error,data) => {
    if(error){
      return res.status(422).send(error);
    }else{
      return res.status(200).send(data);
    }
  })
})

//register
router.post('/register', async function(req,res){
    let user = User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        phone: req.body.phone,
        sex: req.body.sex,
        address: req.body.address,
        fullname: req.body.fullname,
             
      });
      user
        .save()
        .then((createdUser) => {   
          res.send({username:createdUser.username,password:createdUser.password});
          console.log("Đăng ký thành công ^^")
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
            success: false,
          });
        });
})
module.exports = router;
