const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = Schema({
    lentUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    debtUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        default: 0
    }
})

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;