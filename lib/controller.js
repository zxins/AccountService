
class BaseCtrl {
    constructor(db, initModelFunction) {
        this.db = db;
        this.model = initModelFunction(db);
    }

    async _create(createInfo, transaction) {
        const options = transaction ? {transaction: transaction} : null;
        return await this.model.create(createInfo, options).then(result => {
            return result
        })
    }

    async _getCountByFilter(filters) {
        const count = await this.model.count({where: filters});
        return count > 0 ? count : 0;
    }

}

module.exports = {
    BaseCtrl
}