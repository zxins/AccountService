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

}

module.exports = {
    BaseCtrl
}