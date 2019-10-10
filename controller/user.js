const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.user = (req,res,next) =>{
    const token = req.body.token
    console.log(token)
    if(!token){
        return res.json({msg: 'No token, authorization denied'})
    }
    try {
        const decode = jwt.verify(token,'secret')
        User.findOne({_id:decode.id})
        .populate('friends')
        .populate('groups')
        .exec((err,data)=>{
            if(err)
                return res.json({msg:err.message})
            return res.json(data)
        })
    } catch (err) {
        res.json({msg: 'Token is invalid'})
    }
}