const Sequelize = require('sequelize');
// const {newDB} = require('../../plugins/sequelize-db-connector');

const BlogUserTableName = 'blog_user';
const BlogUserAttributes = {
    uid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment: '账号id',
        defaultValue: 0
    },
    nickname: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        comment: '昵称',
        defaultValue: ''
    },
    avatar: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        comment: '头像(相对路径)',
        defaultValue: ''
    },
    gender: {
        type: Sequelize.DataTypes.ENUM('male', 'female', 'unknown'),
        allowNull: false,
        comment: '性别',
        defaultValue: 'unknown'
    },
    role: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        comment: '角色',
        defaultValue: 0     // 0:普通用户, 1:VIP
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

function initBlogUserModel(sequelize){
    return sequelize.define(BlogUserTableName, BlogUserAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo(){
                return {
                    _id: this.id,
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
        comment: 'Blog用户表',
        indexes: [
            {
                name: 'idx_uid',
                unique: true,
                fields: ['uid']
            }
        ]
    });
}

// const blogUserModel = initBlogUserModel(newDB());
// blogUserModel.sync();


module.exports = {
    BlogUserTableName,
    BlogUserAttributes,
    initBlogUserModel
}