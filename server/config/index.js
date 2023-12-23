const path = require('path')

module.exports = {
    db: {
        database: process.env.DATABASE || 'moive',
        username: 'movie',
        password: 'movie',
        options: {
            host: 'localhost',
            dialect: 'sqlite',
            storage: path.resolve(__dirname, '../db/movie.sqlite'), // 存到根目录的db中
            define: {
                undersored: true,
                paranoid: true
            }
        }
    }
}