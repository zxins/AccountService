const Sequelize = require('sequelize');
const {newDB} = require('../../plugins/sequelize-db-connector');

const StaffInfoTableName = 'staff_info';
const StaffInfoAttributes = {
    uid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
    },
    phone: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false
    },
    name: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: true
    },
    nickname: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: true,
    },
    avatar: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
    },
    gender: {
        type: Sequelize.DataTypes.ENUM('male', 'female'),
        defaultValue: 'male'
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

const blogMemberModel = initStaffInfoModel(newDB());
blogMemberModel.sync();


module.exports = {
    StaffInfoTableName,
    StaffInfoAttributes,
    initStaffInfoModel
}