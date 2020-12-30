const {BaseCtrl} = require('../../lib/controller');
const {initAccountModel} = require('./models');

class AccountCtrl extends BaseCtrl {
    constructor(db) {
        super(db, initAccountModel);
    }

    async createOne(createInfo, t = null) {
        if (createInfo.username){
            const isExistUsername = await this._getCountByFilter({username: createInfo.username});
            if (isExistUsername) throw new Error('该用户名已被占用');
        }
        if (createInfo.email){
            const isExistEmail = await this._getCountByFilter({email: createInfo.email});
            if (isExistEmail) throw new Error('该邮箱已存在');
        }
        if (createInfo.phone){
            const isExistPhone = await this._getCountByFilter({phone: createInfo.phone});
            if (isExistPhone) throw new Error('该手机号已存在');
        }
        const account = await this._create(createInfo, t);
        return account.detailInfo;
    }
}

module.exports = {
    AccountCtrl
}