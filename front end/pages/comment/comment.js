Page({
  data: {
    rate: 1,
    index:"",
    comment:'',
    shopName: "X先生密室",
    src: "../../images/base01.jpg",
    location: "江汉路循礼门船舶广场老楼",
    locationDetail: "地铁循礼门站E口步行210米",
    uploadUrl: "https://www.skyvow.cn/api/common/file",
    fileList: [{
        uid: 0,
        status: 'uploading',
        url: '../../images/base01.jpg',
      },
      {
        uid: 1,
        status: 'uploading',
        url: '../../images/base02.jpg',
      },
    ],
    bases:[],
  },

  onChange(e) {
    console.log('onChange', e)
    const {
      file
    } = e.detail
    if (file.status === 'uploading') {
      this.setData({
        progress: 0,
      })
      wx.showLoading()
    } else if (file.status === 'done') {
      this.setData({
        imageUrl: file.url,
      })
    }
  },
  onSuccess(e) {
    console.log('onSuccess', e)
  },
  onFail(e) {
    console.log('onFail', e)
  },
  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  onProgress(e) {
    console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  onPreview(e) {
    console.log('onPreview', e)
    const {
      file,
      fileList
    } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },

  onSlide(e) {
    this.setData({
      rate: e.detail.value
    })
  },

  onComment(e) {
    this.setData({
      comment: e.detail.value
    })
  },

  next() {
    wx.showToast({
      title: '评价成功',
      icon: 'success',
      duration: 800,
      mask: true
    });
    const tempRate = this.data.rate
    const index = this.data.index
    const tempComment = this.data.comment
    wx.request({
      url: 'http://localhost:8080/set?path=/bases/' + index + '/userScore&val=' + JSON.stringify(tempRate),
    })
    wx.request({
      url: 'http://localhost:8080/set?path=/bases/' + index + '/userComment&val=' + JSON.stringify(tempComment),
    })
    setTimeout(function () {
      wx.redirectTo({
        url: '../../pages/orderLists/orderLists',
      })
    }, 400)
  },

  last() {
    wx.redirectTo({
      url: '../../pages/orderLists/orderLists',
    })
  },

  onLoad: function(option) {
    const id = option.id
    var that = this
    wx.request({
      url: 'http://localhost:8080/get?path=/bases/' + id,
      data: {
        bases: []
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          shopName: res.data.title,
          src: res.data.img,
          location: res.data.location,
          locationDetail: res.data.locationDetail,
          index: res.data.id,
        })
      }
    })
  },
})