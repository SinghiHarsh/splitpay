// var jwt = require('jsonwebtoken')

var User = require('../models/users')

exports.searchUser = (req,res,next) =>{
    let {search_user} = req.body
    User.findOne({username:search_user}).select("-password")
    .exec((err,db)=>{
        if(err)
            return res.json({err})
        return res.json(db)
    })
}