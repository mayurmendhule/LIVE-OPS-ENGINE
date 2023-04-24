const express =require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const SECRET_CODE ="abwhertdsae"
const {offer} = require("../Schemas/offer-schema");

const getUserByToken =(token) =>{
   return new Promise((resolve, reject) =>{
        if(token){ 
            let userData
            try{
                const userData =jwt.verify(token, SECRET_CODE);
                resolve(userData)

            }catch(err){
                reject("Invalid Token")
            }
        }
        else{
            reject("Token Not Found")
        }
    })
}

router.post("/list", async(req, res)=>{
    const validOffers = [];
    offer.find().then((offers) =>{
        console.log(offers, "offer List")
        offers.filter((offer) =>{
            const rules = offer.target.split("and")
            //['age > 30', 'installed_days < 5']
            // console.log(rule);
            rules.forEach((rule) => {
                let ruleKey ={}
                if(rule.includes(">")){
                    ruleKey = {key: rule.trim().split(">")[0].trim(), value: parseInt(rule.trim().split(">")[1])}
                    if(req.body[ruleKey.key] > ruleKey.value){
                        validOffers.push(offer)
                    }
                }else{
                    ruleKey = {key: rule.trim().split("<")[0], value: rule.trim().split("<")[1]}
                    if(req.body[ruleKey.key] < ruleKey.value){
                        validOffers.push(offer)
                    }
                }
            })
            
        //     if(rule[0].contain(">")){

        //     }else{

        //     }
        //     const validAge = rule[0].split(">")[]
        //     const validInstalledDays = 
        // })
        res.status(200).send(validOffers);
    }).catch(()=>{
        res.status(500).send("Internal Server Error")
    })
});

router.post("/create", async(req, res)=>{
   //find user by token 
   getUserByToken(req.headers.authorization).then((user)=>{
        // res.status(200).send(user) //to find data
        //create offer base on user
        offer.create({...req.body, username: user.username}).then((offer)=>{
            res.status(200).send(offer)
        }).catch((err)=>{
            res.status(400).send({message: err.message})
        })

   }).catch((err)=>{
        res.status(400).send(err)
   });
});


router.put("/update", async()=>{
    offer.upadeteOne("identifier data", "newData");
});
router.delete("/delete", async()=>{
    offer.deleteOne({id: req.body.id})
})


module.exports =router;