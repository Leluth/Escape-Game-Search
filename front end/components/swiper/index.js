Page({
  data: {
    "bnrUrl": [{
      "url": "../../images/banana.jpg"
    }, {
      "url": "../../images/tongdawei.jpg"
    }],
  },
  onLoad() {
    this.getRepos()
  },
  onChange(e) {
  },
  onOpen(e) {
    this.setData({
      pageStyle: 'height: 100%; overflow: hidden',
    })
  },
  onClose(e) {
    this.setData({
      pageStyle: '',
    })
  },
})
