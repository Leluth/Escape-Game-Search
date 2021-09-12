const fs = require('fs')
const http = require('http')
const events = require('events')

const cheer = require('cheerio')


let data = []

const url = 'http://www.dianping.com/search/keyword/16/0_%E5%AF%86%E5%AE%A4'
const options = {
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Cookie': 'cy=16; cye=wuhan; _lx_utm=utm_source%3Dgoogle%26utm_medium%3Dorganic; _lxsdk_cuid=16bbb10229bc8-01b42135391408-e343166-161012-16bbb10229b99; _lxsdk=16bbb10229bc8-01b42135391408-e343166-161012-16bbb10229b99; _hc.v=387767d3-f7c3-99d3-0382-093794554f15.1562211525; s_ViewType=10; _lxsdk_s=16bbbd29226-682-6ab-b09%7C%7C242',
        'Host': 'www.dianping.com',
        'Referer': 'https://www.dianping.com/search/keyword/16/0_base',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
    }
}

const grabInfo = (page, $) => {
    $ || ($ = cheer.load(page))
    const lis = $('#shop-all-list > ul > li')
    const infos = []
    for (let i = 0; i < lis.length; ++i) {
        const li = lis[i]
        infos.push({
            name: $('div.txt > div.tit > a:nth-child(1) > h4', li).text(),
            star: $('div.txt > div.comment > span', li).attr().title,
            discount: $('div.svr-info > div > a:nth-child(2)', li).text().replace(/^\s+|\s+$/g),
            img: $('div.pic > a > img', li).attr().src
        })
    }
    return infos
}

const emitter = new events.EventEmitter()

http.get(url, options, res => {
    let html = ''
    res.on('data', chunk => html += chunk)
    res.on('end', () => {
        const $ = cheer.load(html)
        lastPage = +$('body > div.section.Fix.J-shop-search > div.content-wrap > div.shop-wrap > div.page > a:nth-child(11)').text()
        data = data.concat(grabInfo(null, $))
        emitter.emit('grab-start')
    })
})

emitter.on('grab-start', () => {
    for (let i = 0; i < lastPage;)
        http.get(`${url}/p${++i}`, options, res => {
            let html = ''
            res.on('data', chunk => html += chunk)
            res.on('end', () => {
                data = data.concat(grabInfo(html))
                i === lastPage && emitter.emit('grab-over')
            })
        })
})

emitter.on('grab-over', () => {
    fs.writeFile('🐛.json', JSON.stringify(data), console.log)
})