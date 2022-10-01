const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER

router.post('/register', async (req,res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC
            ).toString(),
        img : req.body.img,
        country: req.body.country,
        address: req.body.address    
    }); 

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN 

router.post('/login', async (req, res) =>{
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json('Wrong credentials!');
        
        const hashedpassword = CryptoJS.AES.decrypt(
            user.password, process.env.PASS_SEC);
            const OriginalPassword = hashedpassword.toString(CryptoJS.enc.Utf8);
            OriginalPassword !== req.body.password && 
            res.status(401).json('Wrong credentials!');

//generating the secret token (access token) after logging in with the right credentials         

            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            }, process.env.JWT_SEC,
            {expiresIn: '1d'}
            );

            const { password, ...others } = user._doc;
            res.status(200).json({...others, accessToken})
            
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;
