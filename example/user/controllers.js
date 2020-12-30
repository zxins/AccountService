const {BaseCtrl} = require('../../lib/controller');
const {getDatetime} = require('../../lib/utils');
const {AccountCtrl} = require('../../services/account/controllers');
const {initBlogUserModel} = require('./models');

class BlogUserCtrl extends BaseCtrl {
    constructor(db) {
        super(db, initBlogUserModel);
    }

    async register(registerInfo) {
        // 创建账号 TODO: 这里需要模拟成调用rpc接口的形式
        const accountCtrl = new AccountCtrl(this.db)
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
        const account = await accountCtrl.createOne(createAccountInfo);

        // 创建用户信息
        const createUserInfo = {
            uid: account._id,
            nickname: registerInfo.nickname || registerInfo.phone || registerInfo.email,
            avatar: registerInfo.avatar,
            gender: registerInfo.gender,
            status: 1,
            createAt: getDatetime().unix(),
            updateAt: getDatetime().unix(),
        }
        return await this.createOne(createUserInfo);
    }

    async createOne(createInfo, t = null) {
        const user = await this._create(createInfo, t);
        return user.detailInfo;
    }
}

module.exports = {
    BlogUserCtrl
}