const Sequelize = require('sequelize');
const {newDB} = require('../../plugins/sequelize-db-connector');

// 后台系统
const AuthSystemTableName = 'auth_system';
const AuthSystemAttributes = {
    name: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: '系统名称',
        defaultValue: ''
    },
    desc: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: '系统该描述',
        defaultValue: ''
    },
    domain: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: '系统域名',
        defaultValue: ''
    },
    status: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        comment: '状态',
        defaultValue: 0     // 1:enable, 0:disable, -1:deleted'
    },
    createAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '创建时间',
        defaultValue: 0
    },
    createBy: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '创建人staff_id',
        defaultValue: 0
    },
    updateAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '更新时间',
        defaultValue: 0
    },
    updateBy: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '修改人staff_id',
        defaultValue: 0
    },
}

function initAuthSystemModel(sequelize) {
    return sequelize.define(AuthSystemTableName, AuthSystemAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo() {
                return {
                    name: this.name,
                    desc: this.desc,
                    domain: this.domain,
                    status: this.status,
                    createAt: this.createAt,
                    createBy: this.createBy,
                    updateAt: this.updateAt,
                    updateBy: this.updateBy
                }
            }
        },
        comment: '登记目前存在的后台系统信息',
        indexes: [
            {
                name: 'idx_domain',
                unique: true,
                fields: ['domain']
            }
        ]
    })
}

const authSystemModel = initAuthSystemModel(newDB());
authSystemModel.sync()


// 后台系统菜单
const AuthSystemMenuTableName = 'auth_system_menu';
const AuthSystemMenuAttributes = {
    systemId: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        comment: '系统id',
        defaultValue: 0
    },
    parentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '父菜单id',
        defaultValue: 0
    },
    name: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        comment: '菜单名称',
        defaultValue: 0
    },
    desc: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: '菜单描述',
        defaultValue: ''
    },
    uri: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: '菜单uri',
        defaultValue: ''
    },
    isShow: {
        type: Sequelize.DataTypes.ENUM('yes', 'no'),
        allowNull: false,
        comment: '是否展示菜单',
        defaultValue: 'no'
    },
    status: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        comment: '状态',
        defaultValue: 0     // 1:enable, 0:disable, -1:deleted'
    },
    createAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '创建时间',
        defaultValue: 0
    },
    createBy: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '创建人staff_id',
        defaultValue: 0
    },
    updateAt: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '更新时间',
        defaultValue: 0
    },
    updateBy: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '修改人staff_id',
        defaultValue: 0
    },
}

function initAuthSystemMenuModel(sequelize) {
    return sequelize.define(AuthSystemMenuTableName, AuthSystemMenuAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo() {
                return {
                    systemId: this.systemId,
                    parentId: this.parentId,
                    name: this.name,
                    desc: this.desc,
                    uri: this.uri,
                    isShow: this.isShow,
                    status: this.status,
                    createAt: this.createAt,
                    createBy: this.createBy,
                    updateAt: this.updateAt,
                    updateBy: this.updateBy
                }
            }
        },
        comment: '系统菜单',
        indexes: [
            {
                name: 'idx_systemId',
                unique: true,
                fields: ['systemId']
            },
            {
                name: 'idx_parentId',
                unique: true,
                fields: ['parentId']
            },
        ]
    })
}

const authSystemMenuModel = initAuthSystemMenuModel(newDB());
authSystemMenuModel.sync()


// 后台系统权限

module.exports = {
    AuthSystemTableName,
    AuthSystemAttributes,
    initAuthSystemModel,
    AuthSystemMenuTableName,
    AuthSystemMenuAttributes,
    initAuthSystemMenuModel
}