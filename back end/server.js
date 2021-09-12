const express = require('express')

const { db } = require('./data')
db.init()

const app = express()

// 跨域
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

// 静态资源
app.use('/static', express.static(__dirname + '/static'))

// 数据接口
app.get('/user/login', (req, res) => {
    const uid = db.insert('/user', req.query)
    res.send(db.data.user[uid])
})

app.get('/get', (req, res) => {
    const { path, type } = req.query
    let data = db.get(path)
    switch (type) {
        case 'layer':
            /*
            let arr = []
            for (let attr in data)
                arr.push(attr)
            data = arr
            */
            break
        default:
            break
    }
    res.send(data)
})

app.get('/set', (req, res) => {
    const { path, val } = req.query
    res.send(db.set(path, JSON.parse(val)))
})

app.get('/insert', (req, res) => {
    const { path, val } = req.query
    res.send('' + db.insert(path, JSON.parse(val)))
})

// 管理
app.get('/manage', (req, res) => {
    res.redirect('/static/manage/index.html')
})


app.all('/manage/init', (req, res) => {
    db.init()
    res.end()
})
app.all('/manage/save', (req, res) => {
    db.save()
    res.end()
})

//
app.listen(8080, () => {
    const f = () => console.log('i am listening!', ' :', (new Date()).toString().slice(0, 24))
    f()
    setInterval(f, 60000)
})