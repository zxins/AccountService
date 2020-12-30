const Sequelize = require('sequelize');
// const {newDB} = require('../../plugins/sequelize-db-connector');

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
                    _id: this.id,
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

// const authSystemModel = initAuthSystemModel(newDB());
// authSystemModel.sync()


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
                    _id: this.id,
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

// const authSystemMenuModel = initAuthSystemMenuModel(newDB());
// authSystemMenuModel.sync()


// 后台系统权限
const AuthItemTableName = 'auth_item';
const AuthItemAttributes = {
    systemId: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        comment: '系统id',
        defaultValue: 0
    },
    menuId: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        comment: '菜单id',
        defaultValue: 0
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

function initAuthItemModel(sequelize) {
    return sequelize.define(AuthItemTableName, AuthItemAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo() {
                return {
                    _id: this.id,
                    systemId: this.systemId,
                    menuId: this.systemId,
                    status: this.status,
                    createAt: this.createAt,
                    createBy: this.createBy,
                    updateAt: this.updateAt,
                    updateBy: this.updateBy,
                }
            }

        },
        comment: '系统权限',
        indexes: [
            {
                name: 'idx_system_menu',
                unique: true,
                fields: ['systemId', 'menuId']
            }
        ]
    })
}


// 角色
const AuthRoleTableName = 'auth_role';
const AuthRoleAttributes = {
    name: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: '角色名称',
        defaultValue: ''
    },
    desc: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: '角色描述',
        defaultValue: ''
    },
    authItemSet: {
        type: Sequelize.DataTypes.TEXT,
        comment: '权限集合,多个值用逗号(,)隔开',
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

function initAuthRoleModel(sequelize) {
    return sequelize.define(AuthRoleTableName, AuthRoleAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo() {
                return {
                    _id: this.id,
                    name: this.name,
                    desc: this.desc,
                    authItemSet: this.authItemSet,
                    status: this.status,
                    createAt: this.createAt,
                    createBy: this.createBy,
                    updateAt: this.updateAt,
                    updateBy: this.updateBy,
                }
            },
        },
        comment: '员工角色'
    });
}


// 角色与员工
const AuthRoleStaffTableName = 'auth_role_staff';
const AuthRoleStaffAttributes = {
    staffId: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        comment: '员工id',
        defaultValue: 0
    },
    roleSet: {
        type: Sequelize.DataTypes.SMALLINT,
        comment: '角色集合, 多个值用逗号(,)隔开',
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

function initAuthRoleStaffModel(sequelize) {
    return sequelize.define(AuthRoleStaffTableName, AuthRoleStaffAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo() {
                return {
                    _id: this.id,
                    staffId: this.staffId,
                    roleSet: this.roleSet,
                    status: this.status,
                    createAt: this.createAt,
                    createBy: this.createBy,
                    updateAt: this.updateAt,
                    updateBy: this.updateBy,
                }
            },
        },
        comment: '权限角色与员工关系',
        indexes: [
            {
                name: 'idx_staffId',
                unique: true,
                fields: ['staffId']
            }
        ]
    });
}


module.exports = {
    AuthSystemTableName,
    AuthSystemAttributes,
    initAuthSystemModel,
    AuthSystemMenuTableName,
    AuthSystemMenuAttributes,
    initAuthSystemMenuModel,
    AuthItemTableName,
    AuthItemAttributes,
    initAuthItemModel,
    AuthRoleTableName,
    AuthRoleAttributes,
    initAuthRoleModel,
    AuthRoleStaffTableName,
    AuthRoleStaffAttributes,
    initAuthRoleStaffModel,
}