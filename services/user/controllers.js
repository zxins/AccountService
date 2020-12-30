const {BaseCtrl} = require('../../lib/controller');
const {getDatetime} = require('../../lib/utils');
const {AccountCtrl} = require('../account/controllers');
const {initBlogUserModel} = require('./models');

class UserCtrl extends BaseCtrl {
    constructor(db) {
        super(db, initBlogUserModel);
        this.accountCtrl = new AccountCtrl(this.db);
    }

    async register(registerInfo) {
        try {
            const result = await this.db.transaction(async (t) => {
                const createAccountInfo = {
                    email: registerInfo.email,
                    phone: registerInfo.phone,
                    username: registerInfo.username,
                    password: registerInfo.password,
                    status: 1,
                    createAt: getDatetime().unix(),
                    createIpAt: registerInfo.ip,
                    lastLoginAt: getDatetime().unix(),
                    lastLoginIpAt: registerInfo.ip,
                }
                const account = await this.accountCtrl.createOne(createAccountInfo, t);

                const createUserInfo = {
                    uid: account._id,
                    nickname: registerInfo.email || registerInfo.phone,
                    avatar: registerInfo.avatar,
                    gender: registerInfo.gender,
                    status: 1,
                    createAt: getDatetime().unix(),
                    updateAt: getDatetime().unix(),
                }
                const user = await this.createOne(createUserInfo, t);
                return user
            })
            return result
        } catch (err) {
            throw new Error(err)
        }
    }

    async createOne(createInfo, t) {
        const user = await this._create(createInfo, t);
        return user.detailInfo;
    }
}

module.exports = {
    UserCtrl
}