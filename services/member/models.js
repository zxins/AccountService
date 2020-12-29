const Sequelize = require('sequelize');
const {newDB} = require('../../plugins/sequelize-db-connector');

const BlogMemberTableName = 'blog_member';
const BlogMemberAttributes = {
    uid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    nickname: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
    },
    avatar: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
    },
    gender: {
        type: Sequelize.DataTypes.ENUM('male', 'female'),
        defaultValue: 'male'
    },
    role: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
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

function initBlogMemberModel(sequelize){
    return sequelize.define(BlogMemberTableName, BlogMemberAttributes, {
        freezeTableName: true,
        timestamps: false,
        getterMethods: {
            detailInfo(){
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

const blogMemberModel = initBlogMemberModel(newDB());
blogMemberModel.sync();


module.exports = {
    BlogMemberTableName,
    BlogMemberAttributes,
    initBlogMemberModel
}