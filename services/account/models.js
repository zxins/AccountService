const Sequelize = require('sequelize');
// const {newDB} = require('../../plugins/sequelize-db-connector');

const AccountTableName = "account";
const AccountAttributes = {
    email: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        comment: '邮箱',
        defaultValue: '',
    },
    phone: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
        comment: '手机号',
        defaultValue: '',
    },
    username: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        comment: '用户名',
        defaultValue: '',
    },
    password: {
        type: Sequelize.DataTypes.STRING(32),
        allowNull: false,
        comment: '密码',
        defaultValue: ''
    },
    createAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '创建时间',
        defaultValue: 0
    },
    createIpAt: {
        type: Sequelize.DataTypes.STRING(12),
        allowNull: false,
        comment: '创建IP',
        defaultValue: '',
    },
    lastLoginAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '最后登录时间',
        defaultValue: 0
    },
    lastLoginIpAt: {
        type: Sequelize.DataTypes.STRING(12),
        allowNull: false,
        comment: '最后登录IP',
        defaultValue: ''
    },
    loginTimes: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '登录次数',
        defaultValue: 0
    },
    status: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        comment: '状态',
        defaultValue: '',   //  1:enable, 0:disable, -1:deleted',
    }
}

function initAccountModel(sequelize) {
    return sequelize.define(AccountTableName, AccountAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo() {
                return {
                    _id: this.id,
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
                name: 'idx_phone',
                unique: true,
                fields: ['phone']
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
// const accountModel = initAccountModel(newDB())
// accountModel.sync()

const AccountPlatformTableName = "account_platform";
const AccountPlatformAttributes = {
    uid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '账号id',
        defaultValue: 0
    },
    platformToken: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false,
        comment: '平台access_token',
        defaultValue: ''
    },
    platformId: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false,
        comment: '平台id',
        defaultValue: ''
    },
    type: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        comment: '平台类型',    // 0:未知, 1:wechat, 2:qq, 3:weibo ...
        defaultValue: 0
    },
    nickname: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false,
        comment: '昵称',
        defaultValue: ''
    },
    avatar: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: '头像',
        defaultValue: ''
    },
    createAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '创建时间',
        defaultValue: 0
    },
    updateAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '更新时间',
        defaultValue: 0
    }
}

function initAccountPlatformModel(sequelize) {
    return sequelize.define(AccountPlatformTableName, AccountPlatformAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo() {
                return {
                    _id: this.id,
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
        comment: '第三方用户信息表',
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
// const platformModel = initAccountPlatformModel(newDB());
// platformModel.sync()

module.exports = {
    AccountTableName,
    AccountAttributes,
    initAccountModel,
    AccountPlatformTableName,
    AccountPlatformAttributes,
    initAccountPlatformModel,
}