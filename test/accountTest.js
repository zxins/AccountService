const {AccountCtrl} = require('../services/account/controllers');
const {newDB} = require('../plugins/sequelize-db-connector');
const {getDatetime} = require('../lib/utils');

const createAccountTest = async () => {
    const db = newDB();
    try {
        const accountCtrl = new AccountCtrl(db);
        return await accountCtrl.createOne({
            email: 'test@test.com',
            phone: '18888888888',
            username: 'test',
            password: '123456',
            status: 1,
            createAt: getDatetime().unix(),
            createIpAt: '127.0.0.1',
            lastLoginAt: getDatetime().unix(),
            lastLoginIpAt: '127.0.0.1'
        })
    }finally {
        db.close()
    }
}

createAccountTest().then(data => {
    console.log(data)
})