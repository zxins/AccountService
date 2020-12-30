const {BlogUserCtrl} = require('../example/user/controllers');
const {newDB} = require('../plugins/sequelize-db-connector');

const registerTest = async () => {
    const db = newDB()
    try {
        const blogUserCtrl = new BlogUserCtrl(db);
        return await blogUserCtrl.register({
            email: '1233@blog.com',
            phone: '18888888888',
            username: 'author',
            password: '123456',
            ip: '127.0.0.1',
            nickname: '会飞的企鹅',
            avatar: 'https://xx.com/xx.png',
            gender: 'male',
        })
    }finally {
        db.close()
    }
}

registerTest().then(data=>{
    console.log(data)
}).catch(e=>{
    console.log(e.message)
})