const {newDB} = require('../plugins/sequelize-db-connector');
const {
    initAccountModel,
    initAccountPlatformModel
} = require('../services/account/models');

const {
    initAuthSystemModel,
    initAuthSystemMenuModel
} = require('../services/auth/models');

const {initStaffInfoModel} = require('../services/staff/models');
const {initBlogUserModel} = require('../services/user/models');

// 创建db
const sequelize = newDB();

// define数据表
// 账户
initAccountModel(sequelize);
initAccountPlatformModel(sequelize);
// 系统
initAuthSystemModel(sequelize);
initAuthSystemMenuModel(sequelize);
// 员工
initStaffInfoModel(sequelize);
// application - blog 用户
initBlogUserModel(sequelize);

// 批量同步数据表
sequelize.sync()