const {newDB} = require('../plugins/sequelize-db-connector');
const {
    initAccountModel,
    initAccountPlatformModel
} = require('../services/account/models');

const {
    initAuthSystemModel,
    initAuthSystemMenuModel,
    initAuthItemModel,
    initAuthRoleModel,
    initAuthRoleStaffModel,
} = require('../services/auth/models');

const {initStaffInfoModel} = require('../services/staff/models');
const {initBlogUserModel} = require('../example/user/models');

// 创建db
const sequelize = newDB();

// define数据表
// 账户
initAccountModel(sequelize);
initAccountPlatformModel(sequelize);
// 系统和权限
initAuthSystemModel(sequelize);
initAuthSystemMenuModel(sequelize);
initAuthItemModel(sequelize);
initAuthRoleModel(sequelize);
initAuthRoleStaffModel(sequelize);
// 员工
initStaffInfoModel(sequelize);
// application - blog 用户
initBlogUserModel(sequelize);

// 批量同步数据表
sequelize.sync()