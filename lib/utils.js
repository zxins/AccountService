const moment = require('moment');

const getDatetime = (dateString) => {
    const time = dateString ? moment(dateString) : moment();
    return time.clone();
}


module.exports = {
    getDatetime
}