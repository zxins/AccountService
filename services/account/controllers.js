const {initAccountModel} = require('./models');

class AccountCtrl {
    constructor(db) {
        this.db = db;
        this.model = initAccountModel(db);
    }

    /**
     * query all rows
     * @param filters
     * @param orders
     * @param limit
     * @return {Promise<[]>}
     */
    async getAll(filters, orders, limit) {
        let models = await this.model.findAll({where: filters, orders: orders, limit: limit});
        let infoList = [];
        models.forEach(item => {
            infoList.push(item.detailInfo)
        })
        return infoList;
    }

    /**
     * create an account
     * @param {object} createInfo
     * @param {transaction} t
     * @return {Promise<*>}
     */
    async createOne(createInfo, t) {
        let model;
        await this.model.create(createInfo, {transaction: t}).then(result => {
            model = result;
        })
        return model.detailInfo;
    }

    /**
     * get an account
     * @param pk
     * @return {Promise<{}|*>}
     */
    async getOne(pk) {
        const model = await this.model.findByPk(pk);
        if (!model) return {};
        return await model.detailInfo;
    }
}

module.exports = {
    AccountCtrl
}