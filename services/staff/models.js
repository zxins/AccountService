const Sequelize = require('sequelize');
// const {newDB} = require('../../plugins/sequelize-db-connector');

const StaffInfoTableName = 'staff_info';
const StaffInfoAttributes = {
    uid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '账号id',
        defaultValue: 0
    },
    email: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        comment: '员工邮箱',
        defaultValue: ''
    },
    phone: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
        comment: '员工手机号',
        defaultValue: ''
    },
    name: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        comment: '员工姓名',
        defaultValue: ''
    },
    nickname: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        comment: '员工昵称',
        defaultValue: ''
    },
    avatar: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: '员工头像(相对路径)',
        defaultValue: ''
    },
    gender: {
        type: Sequelize.DataTypes.ENUM('male', 'female', 'unknown'),
        allowNull: false,
        comment: '员工性别',
        defaultValue: 'unknown'
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

function initStaffInfoModel(sequelize) {
    return sequelize.define(StaffInfoTableName, StaffInfoAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo() {
                return {
                    uid: this.uid,
                    nickname: this.nickname,
                    avatar: this.avatar,
                    gender: this.gender,
                    role: this.role,
                    createAt: this.createAt,
                    updateAt: this.updateAt
                }
            },
        },
        comment: '员工表',
        indexes: [
            {
                name: 'idx_uid',
                unique: true,
                fields: ['uid']
            },
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
        ]
    });
}

// const blogMemberModel = initStaffInfoModel(newDB());
// blogMemberModel.sync();


module.exports = {
    StaffInfoTableName,
    StaffInfoAttributes,
    initStaffInfoModel
}