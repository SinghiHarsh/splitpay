var Friend = require('../models/friends')
var User = require('../models/users')

exports.acceptRequest = (req,res,next) =>{
    // This is whose request the app user is accepting
    var {reqSentId} = req.body 
    User.findOne({_id:{$eq:req.user_id}})
    .exec((err,db)=>{
        if(err){
            return res.json({msg:err.message})
        }
        if(db){
            Friend.findOneAndDelete({
                $and:[
                    {request_sent: reqSentId},
                    {request_receive: db._id}
                ]
            })
            .exec((err,db1)=>{
                if(err)
                    return res.json({msg: err.message})
                if(db1){
                    User.find({
                        $or:[
                            {_id:{$eq:db1.request_receive}},
                            {_id:{$eq:db1.request_sent}}
                        ]
                    },{password:0})
                    .exec((err,db2)=>{
                        // console.log(db2)
                        if(err)
                            return res.json({msg:err.message})
                        if(db2){
                            // console.log(db2)
                            // console.log("&&&&&&")
                            db2.map((el)=>{
                                console.log(el._id)
                                console.log("%%%%%%")
                                if(el._id == req.user_id){
                                    // console.log("check this id",el._id)
                                    // console.log("YASHs ID this id must be added in ADI",reqSentId)
                                    // console.log("push this id",req.user_id)
                                    User.findOneAndUpdate(
                                        {_id:{$eq:el._id}},
                                        {$push:{friends: reqSentId}},
                                        {safe: true, upsert: true},
                                        (err,db3)=>{
                                            if(err)
                                            return res.json({msg: err.message})
                                            // if(db3){
                                            //     console.log("friend added") 
                                            // }
                                        }
                                    )
                                }
                                else {
                                    // console.log("check id",el._id)
                                    // console.log("find this",reqSentId)
                                    // console.log("token wala id",req.user_id)
                                    // console.log("add this id in friends array")
                                    User.findOneAndUpdate(
                                        {_id:{$eq:el._id}},
                                        {$push:{friends: req.user_id}},
                                        {safe: true, upsert: true},
                                        (err,db3)=>{
                                            if(err)
                                            return res.json({msg: err.message})
                                            // if(db3){
                                            //     console.log("friend added")                                                 
                                            // }
                                        }
                                    )
                                }
                            })
                            return res.json({msg:'Friend added'})
                        }
                    })
                }
            })
        }
        else {
            return res.json({msg:'No db found'})
        }
    })
}