const User = require('../models/users');
const Group = require('../models/groups');
const Expense = require('../models/expense');

exports.addGroupExpense = (req,res,next) => {
    var {
        groupId,
        description,
        amountPaidBy,
        totalAmountPaid,
        splitBetween
    } = req.body

    User.findOne({_id:{$eq:req.user_id}})
    .exec((err,db)=>{
        if(err)
            return res.json({msg: err.message})
        if(db){
            Group.findOne({_id:{$eq: groupId}})
            .exec((err,db1)=>{
                if(err)
                    return res.json({msg: err.message})
                if(db1){
                    // var amountDebt = totalAmountPaid / splitBetween.length;
                    // var amountLent = totalAmountPaid - (amountDebt * splitBetween.length);
                    // console.log("debt", amountDebt)
                    // console.log("lent", amountLent) 
                    
                    var expense = new Expense({
                        groupId: db1._id,
                        description,
                        amountPaidBy,
                        totalAmountPaid,
                        splitBetween
                    });
                    console.log("expense", JSON.stringify(expense))
                    expense.save((err,data)=>{
                        if(err)
                            return res.json({msg: err.message})
                        return res.json({msg:"Expense Added", data})
                    })
                }
            })
        }
    })
}
























