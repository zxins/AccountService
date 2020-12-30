const {BaseCtrl} = require('../../lib/controller');
const {initAccountModel} = require('./models');

class AccountCtrl extends BaseCtrl {
    constructor(db) {
        super(db, initAccountModel);
    }

    async createOne(createInfo, t = null) {
        const account = await this._create(createInfo, t);
        return account.detailInfo;
    }
}

module.exports = {
    AccountCtrl
}