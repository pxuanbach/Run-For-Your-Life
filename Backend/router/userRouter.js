
const express = require("express")
const  router = express.Router()
const { User } = require("../models/user")
const {userInfo} = require("../models/user")
const jwt = require('jsonwebtoken')




const verifyToken = require ('../middlewares/verifyToken')

//Hash Pass bảo mật
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


router.get('/', verifyToken, (request, response) => {
  User.find({}).select("-password").exec(function (err, users) {
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

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, { expiresIn: 2*60*60 });
    res.header('auth-token', token).send(token);
    
})


//Change Password
router.post("/changePass", async function(req,res){
let user = await User.findOne({username : req.body.username})
if(!user) return res.status(400).send('Tài khoản của bạn không tồn tại')
if (!bcrypt.compareSync(req.body.currentPassword , user.password)){
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
//Info 
router.get('/getInfo/:id',async function(req,res){
  if (!req.params.id) {
    return res.status(400).send('Error')
  } 
  let info = await userInfo.findOne({user: req.params.id})
  if (!info) { 
    return res.status(422).send('Info not found')
 }else return res.status(200).send(info)

})




//Update lastest version 
router.post("/Infov2",async function(req, res){
  const user = await User.findById(req.body.UserID)
  if (!user) {
    return res.status(400).send("Invalid User");
  }
  let info = new userInfo({
    user: req.body.UserID,
    mail: req.body.mail,
    phone: req.body.phone,
    address: req.body.address,
    fullname: req.body.fullname,
    image: req.body.image,
    gender: req.body.gender,
    note: req.body.note,
    height: req.body.height,
    weight: req.body.weight,
    description: req.body.description,
    job: req.body.job,
    birthday: req.body.birthday,
  })

  info
  .save()
  .then((newInfo) => {
    console.log(newInfo)
    return res.status(201).send(newInfo)
  })
  .catch(()=> {
    userInfo.findOneAndUpdate({user: req.body.UserID},
      {
      mail: req.body.mail,
      phone: req.body.phone,
      address: req.body.address,
      fullname: req.body.fullname,
      image: req.body.image,
      gender: req.body.gender,
      note: req.body.note,
      height: req.body.height,
      weight: req.body.weight,
      description: req.body.description,
      job: req.body.job,
      birthday: req.body.birthday,
    }
      
      ,{new: true},(error,data) => {
      if(error){
        return res.status(422).send('Lỗi roài');
      }else{
        return res.status(200).send(data);
      }
    })
 
  })

})


//register
router.post('/register', async function(req,res){
    let user = User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
      });
      user
        .save()
        .then((createdUser) => {   
          let info = new userInfo({
            user: createdUser._id,
            mail: req.body.mail,
          })   
          console.log(info)       
          info
          .save()
          .then((newInfo) => {
            console.log("Đăng ký thành công ^^",newInfo)
            return res.status(201).json({User:createdUser,
            mail: newInfo.mail
            })
            
          }).catch((error)=> {
            return res.status(404).send(error)
          })
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
            success: false,
          });
        });
})
module.exports = router;
