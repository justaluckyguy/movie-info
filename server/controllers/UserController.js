const {User} = require('../models')
const config = require('../config')
const Jwt = require('jsonwebtoken')

function tokenSign({id, email}) {
    try {
        return Jwt.sign({id, email}, config.token.secretOrPrivateKey, config.token.options)
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body) 
            res.status(201).send({
                user,
                token: tokenSign(user)
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({
                code: 400,
                error: '该邮箱已经注册'
            })
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.id)
            res.status(200).send({
                user
            })
        } catch (error) {
            res.status(500).send({
                code: 400,
                error: "没有找到对应的数据"
            })
        }
    },
    async update(req, res) {
        try {
            const user = await User.update(
                req.body,
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            res.status(200).send({
                message: "数据更新成功"
            })
        } catch (error) {
            res.status(500).send({
                code: 500,
                error: "数据更新失败"
            })
        }
    },
    async delete(req, res) {
        try {
            await User.destroy(
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            res.status(200).send({
                message: "数据删除成功"
            })
        } catch (err) {
            console.error(err)
            res.status(500).send({
                code: 500,
                error: "数据删除失败"
            })
        }
    },
    async login (req, res) {
        try {
            // 1. 先根据账号检索
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (user) {
                // 2. 在对密码进行校验
                let isValidPassword = user.comparePassword(req.body.password)
                if (isValidPassword)
                    res.send({
                        user: user.toJSON(),
                        token: tokenSign(user)
                    })
            }
        } catch (err) {
            res.status(403).send({
                code: 403,
                error: "用户名或密码错误"
            })
        }
    }
}