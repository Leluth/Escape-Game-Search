const app = getApp()

Page({
  data: {
    bases: [],
    tmpData: ['tongdawei', 'baojialiya', 'banana', ].map(v => '/images/' + v + '.jpg'),
    preViewData: ['cxk', 'tongdawei', 'baojialiya', 'banana', 'black', 'black', ].map(v => '/images/' + v + '.jpg'),
    focus: 0,
    videoCtx: {},
    slideLeft: 0,
    scrollLeft: 0,
    show: true,
    showTalk: false,
    isStared: false,
    gotTickets: false,
    labelShow: false,
    score: "",
    rateShow: false,
    status:"",
    index:"",
    src:"",
    userName:"",
    useruserAvatarUrl:"",
    userScore:"none",
    userComment: 'none',
    onComment: false,
    buttons: [{
        label: '收藏',
        icon: '../../images/star.png',
      },
      {
        label: '预定',
        icon: '../../images/Dollar.png',
      },
      {
        openType: 'share',
        label: '分享',
        icon: '../../images/man.png',
      },
    ],
  },
  scrollBack: function(e) {
    if (this.data.slideLeft < 352) {
      this.setData({
        slideLeft: 0
      })
    }
    if (this.data.slideLeft > 352 && this.data.slideLeft < 704) {
      this.setData({
        slideLeft: 354
      })
    }
    if (this.data.slideLeft > 704 && this.data.slideLeft < 1056) {
      this.setData({
        slideLeft: 708
      })
    }
    if (this.data.slideLeft > 1056) {
      this.setData({
        slideLeft: 1062
      })
    }
    if (this.data.slideLeft > 353) {
      this.setData({
        show: false,
        slideLeft: this.data.slideLeft - 354,
        scrollLeft: this.data.scrollLeft - 100
      })
    }
    if (this.data.slideLeft < 353) {
      this.setData({
        show: true,
      })
    }
    if (this.data.slideLeft > 353) {
      this.setData({
        show: false,
      })
    }
  },
  scrollForward: function(e) {
    if (this.data.slideLeft < 352) {
      this.setData({
        slideLeft: 0
      })
    }
    if (this.data.slideLeft > 352 && this.data.slideLeft < 704) {
      this.setData({
        slideLeft: 354
      })
    }
    if (this.data.slideLeft > 704 && this.data.slideLeft < 1056) {
      this.setData({
        slideLeft: 708
      })
    }
    if (this.data.slideLeft > 1056) {
      this.setData({
        slideLeft: 1062
      })
    }
    if (this.data.slideLeft < 1062) {
      this.setData({
        slideLeft: this.data.slideLeft + 354,
        scrollLeft: this.data.scrollLeft + 100
      })
    }
    if (this.data.slideLeft < 353) {
      this.setData({
        show: true,
      })
    }
    if (this.data.slideLeft > 353) {
      this.setData({
        show: false,
      })
    }
  },
  scrollJump: function(e) {
    if (e.detail.scrollLeft < 352) {
      this.setData({
        show: true,
        scrollLeft: 0
      })
    }
    if (e.detail.scrollLeft > 352 && e.detail.scrollLeft < 704) {
      this.setData({
        show: false,
        scrollLeft: 100
      })
    }
    if (e.detail.scrollLeft > 704 && e.detail.scrollLeft < 1056) {
      this.setData({
        show: false,
        scrollLeft: 200
      })
    }
    if (e.detail.scrollLeft > 1056) {
      this.setData({
        show: false,
        scrollLeft: 300
      })
    }
  },
  callOut() {
    this.setData({
      showTalk: !this.data.showTalk
    })
  },
  routeMap() {
    const latitude = this.data.bases.latitude
    const longitude = this.data.bases.longitude
    const name = this.data.bases.title
    const address = this.data.bases.location
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        const speed = res.speed
        const accuracy = res.accuracy
        wx.openLocation({
          latitude,
          longitude,
          name,
          address,
          scale: 18
        })
      }
    })
  },
  handleVideoCtx: function(e) {
    const cs = this.data.videoCtx
    cs[e.target.id] = e.detail
    this.setData({
      videoCtx: cs
    })
  },
  onClick(e) {
    var temp = "buttons[" + 0 + "].icon";
    if (e.detail.index === 0) {
      if (e.detail.buttons[0].icon == '../../images/star.png') {
        this.setData({
          isStared: true
        })
        if (this.data.status == "shop") { 
          const tempIndex = this.data.index
          const tempStarPress = !this.data.isStared
          wx.request({
            url: 'http://localhost:8080/set?path=/bases/' + tempIndex + '/starPress&val=' + tempStarPress,
          })
        }
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1000,
          mask: true
        });
      } else if (e.detail.buttons[0].icon == '../../images/stared.png') {
        this.setData({
          isStared: false
        })
        if (this.data.status == "shop") {
          const tempIndex = this.data.index
          const tempStarPress = !this.data.isStared
          wx.request({
            url: 'http://localhost:8080/set?path=/bases/' + tempIndex + '/starPress&val=' + tempStarPress,
          })
        }
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 1000,
          mask: true
        });
      }
    }
    if (e.detail.index === 1) {
      if(this.data.status == "shop"){
        const tempIndex = this.data.index
        wx.navigateTo({
          url: '../../pages/pay/pay?id=' + tempIndex
        })
      }
      if (this.data.status == "order") {
        wx.showToast({
          title: '已预定',
          image: '../../images/close.png',
          duration: 1000,
          mask: true
        });
      }
    }
  },
  onChange(e) {
    var temp = "buttons[" + 0 + "].icon";
    if (this.data.isStared == true) {
      this.setData({
        [temp]: '../../images/stared.png'
      })
    } else if (this.data.isStared == false) {
      this.setData({
        [temp]: '../../images/star.png'
      })
    }
    this.setData({
      labelShow: !this.data.labelShow
    })
  },
  onLoad: function(option) {
    const id = option.id
    this.setData({
      index:id,
    })
    const order = option.order
    if (order == "true") {
      var that = this
      wx.request({
        url: 'http://localhost:8080/get?path=/order',
        data: {
          order: []
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          that.setData({
            bases: res.data[0],
            score: res.data[0].score,
            rateShow: true,
            isStared: !res.data[0].starPress,
            status:"order",
            src: res.data[0].src,
          })
        }
      })
    } else {
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
            bases: res.data,
            score: res.data.score,
            rateShow: true,
            isStared: !res.data.starPress,
            status: "shop",
            src: res.data.src,
            userName: app.globalData.userInfo.nickName,
            userAvatarUrl: app.globalData.userInfo.avatarUrl,
            userScore: res.data.userScore,
            userComment: res.data.userComment,
          })
          if (that.data.userComment!=""){
            that.setData({
              onComment:true,
            })
          }
        }
      })
    }
  },
  scroll: (() => {
    const interval = (414 * 92 / 100)
    return function(e) {
      const left = e.detail.scrollLeft
      const n = parseInt((left + 207) / interval)
      if (n === this.data.focus) return
      else {
        const videoCtx = this.data.videoCtx
        videoCtx[this.data.focus] && videoCtx[this.data.focus].pause()
        videoCtx[n] && videoCtx[n].play() || (videoCtx[n] = wx.createVideoContext('' + n, this))
        this.setData({
          focus: n
        })
      }
    }
  })(),
})