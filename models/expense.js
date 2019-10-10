var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    description: {
        type: String,
        required: true
    },
    amountPaidBy:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        amountLent:Number
    },
    totalAmountPaid: {
        type: Number,
    },
    splitBetween:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        amountDebt:Number
    }]
})

var Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense;