const express =require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const jwt = require("jsonwebtoken")
const salt = 10
const SECRET_CODE ="abwhertdsae"
const {user} = require("../Schemas/user-schema");

//findOne used to check if the userExist or not 

router.post("/signup", async (req, res) => {
  //create user in db
  //we are getting username password email mobile
  //encrypt then store
  bcrypt.genSalt(salt, (saltErr, saltValue) => {
    if (saltErr) {
      res.status(401).send("Unable to process");
    } else {
      bcrypt.hash(req.body.password, saltValue, (hashErr, hashValue) => {
        if (hashErr) {
          res.status(401).send("Unable to process");
        } else {
          user
            .create({
              username: req.body.username,password: hashValue,
              email: req.body.email | "",
              mobile: req.body.mobile | "",
            })
            .then((user) => {
            //   res.status(200).send(user);
              res.status(200).send(user.username +" created Successfully");
            })
            .catch((err) => {
              res.status(400).send(err.message);
            });
        }
      });
    }
  });
  //   user.create({});
});


router.post("/signin", async(req, res)=>{
    //read a user in db
    //we getting username and password
    //user exist or not 
    //verify password and genreate jwt

    user.findOne({username: req.body.username}).then((user)=>{
        if(!user){
            res.status(401).send("User not Exist!");
        }else{
            if(!bcrypt.compareSync(req.body.password, user.password)){
                res.status(401).send("Invalid Password")
            }else{
                const token = jwt.sign({id: user._id, username: user.username}, SECRET_CODE);
                res.status(200).send({message: "User loggedIn Successfully", token: token});
            }
        }
    }).catch(()=>{

    });
});

module.exports =router;