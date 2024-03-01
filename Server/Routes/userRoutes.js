const express = require("express")

const router = express.Router()

const bcrypt = require("bcryptjs")
const User = require("../model/usermodel")

const jwt = require("jsonwebtoken")
const authenticate = require("../middleware/authenticat")

// REGISTER


router.post("/register", async (req, res) => {

    try {

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashpassword
       
        const Userexist = await User.findOne({ email: req.body.email })
       
        if (Userexist) {

            return res.send({
                sucess: false,
                message: "User Already Exist"
            })
        }

        const saveuser = await new User(req.body)
        await saveuser.save()

        res.send({
            sucess: true,
            message: "User Register Sucessfully"
        })


    } catch (err) {
        console.log("Errrrrr", err);

    }


})


// LOGIN


router.post("/login", async (req, res) => {


    try {

        let loginuser = await User.findOne({ email: req.body.email })

        if (!loginuser) {
            return res.send({
                sucess: false,
                message: "User does not Exist"
            })
        }


        const isvalidpass = await bcrypt.compare(req.body.password, loginuser.password)

        if (!isvalidpass) {
            return res.send({
                sucess: false,
                message: "invalid Password"
            })
        }

        const token = jwt.sign({ userid: loginuser._id }, process.env.jwt_Secretekey, {
            expiresIn: "1d"
        })

        console.log(token, "dshsha");

        res.send({
            sucess: true,
            message: "Logged In Sucessfully",
            data: token
        })
    }


    catch (e) {

        res.send({
            sucess: false,
            message: "Can't able to log in try later",

        })
        console.log(e, "bot re");
    }

})



// get users id


router.get("/get-currentuser", authenticate, async (req, res) => {

    try {

        const getuser = await User.findById(req.body.userid).select("-password")

        res.send({
            sucess: true,
            message: "User de fetched",
            data: getuser
        })
    } catch (error) {
        res.send({
            sucess: false,
            message: "User detail is error",

        })
    }



})

module.exports = router

