const Sequelize = require('sequelize');
const {newDB} = require('../../plugins/sequelize-db-connector');

const AccountTableName = "account_user";
const AccountAttributes = {
    email: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
    },
    phone: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: true
    },
    username: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING(32),
        allowNull: false
    },
    createAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    createIpAt: {
        type: Sequelize.DataTypes.STRING(12),
        allowNull: false
    },
    lastLoginAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    lastLoginIpAt: {
        type: Sequelize.DataTypes.STRING(12),
        allowNull: false
    },
    loginTimes: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
}

function initAccountUserModel(sequelize) {
    return sequelize.define(AccountTableName, AccountAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo() {
                return {
                    email: this.email,
                    phone: this.phone,
                    username: this.username,
                    password: this.password,
                    createAt: this.createAt,
                    createIpAt: this.createAt,
                    lastLoginAt: this.lastLoginAt,
                    lastLoginIpAt: this.lastLoginIpAt,
                    loginTimes: this.loginTimes
                }
            },
        },
        comment: '账户表',
        indexes: [
            {
                name: 'idx_email',
                unique: true,
                fields: ['email']
            },
            {
                name: 'idx_username',
                unique: true,
                fields: ['username']
            }
        ]
    })
}

// 执行同步表结构
const accountModel = initAccountUserModel(newDB())
accountModel.sync()

const AccountPlatformTableName = "account_platform";
const AccountPlatformAttributes = {
    uid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    platformToken: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false
    },
    platformId: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false,
    },
    type: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false
    },
    nickname: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: true
    },
    avatar: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
    },
    createAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    updateAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
}

function initAccountPlatformModel(sequelize) {
    return sequelize.define(AccountPlatformTableName, AccountPlatformAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo() {
                return {
                    uid: this.uid,
                    platformToken: this.platformToken,
                    platformId: this.platformId,
                    type: this.type,
                    nickname: this.nickname,
                    avatar: this.avatar,
                    createAt: this.createAt,
                    updateAt: this.updateAt
                }
            }
        },
        comment: '第三方用户登录表',
        indexes:[
            {
                name: 'idx_uid',
                unique: true,
                fields:['uid']
            },
            {
                name: 'idx_platformId',
                unique: true,
                fields: ['platformId']
            }
        ]
    });
}

// 同步第三方登录表
const platformModel = initAccountPlatformModel(newDB());
platformModel.sync()

module.exports = {
    AccountTableName,
    AccountAttributes,
    initAccountUserModel,
    AccountPlatformTableName,
    AccountPlatformAttributes,
    initAccountPlatformModel,
}