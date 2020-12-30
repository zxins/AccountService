const {newDB} = require('../../plugins/sequelize-db-connector');
const {AccountCtrl} = require('../account/controllers');
const {initBlogUserModel} = require('./models');
const moment = require('moment');

class UserCtrl {
    constructor(db) {
        this.db = db;
        this.model = initBlogUserModel(this.db);
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
                    createAt: moment().clone().unix(),
                    createIpAt: registerInfo.ip,
                    lastLoginAt: moment().clone().unix(),
                    lastLoginIpAt: registerInfo.ip,
                }
                const account = await this.accountCtrl.createOne(createAccountInfo, t);

                const createUserInfo = {
                    uid: account._id,
                    nickname: registerInfo.email || registerInfo.phone,
                    avatar: registerInfo.avatar,
                    gender: registerInfo.gender,
                    status: 1,
                    createAt: moment().clone().unix(),
                    updateAt: moment().clone().unix(),
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
        let model;
        await this.model.create(createInfo, {transaction: t}).then(result => {
            model = result;
        })
        return model.detailInfo;
    }
}

const userCtrl = new UserCtrl(newDB())
userCtrl.register({
    email: 'local@localhost.com',
    username: 'zhangsan',
    password: '123456',
    ip: '127.0.0.1'
}).then(data => {
    console.log(data)
})