const fs = require('fs')

const parsePath = path => {
    path = path.split('/')
    !path[0].length && (path = path.slice(1, path.length))
    path.length && !path[path.length - 1].length && (path = path.slice(0, path.length - 1))
    return path
}

const _hash = obj => JSON.stringify(obj)

const db = new (function () {
    this.data = ['user', 'bases', 'order'].reduce((acc, name, i) => {
        const arr = []
        arr.info = new Map()
        arr.push = val => {
            const hash = _hash(val)
            let i = arr.info.get(hash)
            if (!i) {
                i = arr.length + 1
                switch (name) {
                    case 'user':
                        records = []
                        for (let i = 0; i < 10; ++i)
                            records.push({
                                time: (new Date()).getTime(),
                                team: [i % 2],
                                mvp: i % 2,
                                scores: [99 - i, 66 + i],
                                win: true
                            })
                        val = Object.assign({
                            friends: [0, 1],
                            messages: [],
                            records
                        }, val)
                    default:
                        val = Object.assign({ id: i - 1 }, val)
                        break
                }
                Array.prototype.push.call(arr, val)
                arr.info.set(hash, i)
            }
            return i
        }
        acc[name] = arr
        return acc
    }, {})

    //
    const _get = (pathArr = []) => {
        let data = this.data
        for (let name of pathArr) {
            if (data[name])
                data = data[name]
            else
                throw { data, name }
        }
        return data
    }
    this.get = path => {
        let data = null
        try {
            data = _get(parsePath(path))
        } catch (e) {

        }
        return JSON.stringify(data)
    }
    this.set = (path, val) => {
        pathArr = parsePath(path)
        let obj = _get(pathArr.slice(0, pathArr.length - 1))
        obj[pathArr[pathArr.length - 1]] = val
    }
    this.insert = (path, val) => {
        let arr
        try {
            arr = _get(parsePath(path))
        } catch (e) {
            e.data[e.name] = [val]
            return 0
        }
        return arr.push(val) - 1
    }


    // 
    this.init = () => {
        fs.readFile('data.json', 'utf8', (e, data) => {
            const json = JSON.parse(data)
            for (let attr in json) {
                for (let val of json[attr]) {
                    this.data[attr].push(val)
                }
            }
        })
    }

    this.save = () => {
        fs.writeFile('data.json', JSON.stringify(this.data), console.log)
    }

})()

module.exports = {
    db: db
}