import {
  $wuxDialog
} from '../../components/index'

Page({
  data: {
    tabs: [{
        key: 'tab1',
        title: '订单信息',
      },
      {
        key: 'tab2',
        title: '收藏密室',
      },
    ],
    bases: [],
    histories: [],
    current: {
      classNames: 'wux-animate--fadeInRight',
      enter: true,
      exit: true,
      in: false,
    },
    history: {
      classNames: 'wux-animate--fadeInLeft',
      enter: true,
      exit: true,
      in: false,
    },
    star: {
      classNames: 'wux-animate--zoom',
      enter: true,
      exit: true,
      in: false,
    },
    starList: false,
    starRes: 0,
    currentOrder: true,
    mapShow: false,
  },

  onTabsChange(e) {
    const {
      key
    } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)
    this.setData({
      key,
      index,
      starList: !this.data.starList,
    })
    if (key == "tab1") {
      const temp1 = "current.in"
      const temp2 = "history.in"
      const temp3 = "star.in"
      this.setData({
        [temp3]: false,
      })
      var that = this
      setTimeout(function() {
        that.setData({
          [temp1]: true,
          [temp2]: true,
        })
      }, 200)
      setTimeout(function() {
        that.setData({
          mapShow: !that.data.mapShow
        })
      }, 600)
    }
    if (key == "tab2") {
      var arry_length = this.data.bases.length
      var tempStar = 0
      for (var i =
        0; i < arry_length; i++) {
        if (this.data.bases[i].starPress == false) {
          tempStar = tempStar + 1;
        }
      }
      const temp1 = "current.in"
      const temp2 = "history.in"
      const temp3 = "star.in"
      this.setData({
        [temp1]: false,
        [temp2]: false,
        starRes:tempStar,
      })
      var that = this
      if (this.data.starRes == 0) {
        setTimeout(function() {
          that.setData({
            [temp3]: true,
          })
        }, 200)
      } else {
        that.setData({
          [temp3]: false,
        })
      }
      that.setData({
        mapShow: !that.data.mapShow
      })
    }
  },

  starPress(e) {
    const value = e.detail.title
    var arry_length = this.data.bases.length
    var that = this
    var temp3
    var starPress
    for (var i =
        0; i < arry_length; i++) {
      const temp1 = "bases[" + i + "].title";
      const temp2 = "bases[" + i + "].starPress";
      if (that.data.bases[i].title == value) {
        that.setData({
          [temp2]: !that.data.bases[i].starPress,
          starRes: that.data.starRes - 1,
        })
        temp3 = that.data.bases[i].id;
        starPress = that.data.bases[i].starPress;
      }
    }
    wx.request({
      url: 'http://localhost:8080/set?path=/bases/' + JSON.stringify(temp3) + '/starPress&val=' + JSON.stringify(starPress),
    })
    const temp4 = "star.in"
    if (this.data.starRes == 0) {
      var that = this
      setTimeout(function() {
        that.setData({
          [temp4]: true,
        })
      }, 400)
    }
  },

  deleteOrder(e) {
    var that = this
    that.setData({
      mapShow: !that.data.mapShow
    })
    $wuxDialog().confirm({
      resetOnClose: true,
      title: '取消预订',
      content: '你确定要取消本次预定吗？',
      onConfirm(e) {
        const temp1 = "current.in"
        setTimeout(function() {
          that.setData({
            [temp1]: false,
            mapShow: !that.data.mapShow
          })
        }, 200)
        that.setData({
          currentOrder: false,
        })
        wx.request({
          url: 'http://localhost:8080/set?path=/order/0/status&val=false',
        })
      },
      onCancel(e) {
        that.setData({
          mapShow: !that.data.mapShow
        })
      },
    })
  },

  toShop(e) {
    const value = e.detail.title
    var arry_length = this.data.bases.length
    var that = this
    var temp3
    for (var i =
      0; i < arry_length; i++) {
      const temp1 = "bases[" + i + "].title";
      const temp2 = "bases[" + i + "].id";
      if (that.data.bases[i].title == value) {
        temp3 = that.data.bases[i].id;
      }
    }
    wx.navigateTo({
      url: '../../pages/shop/shop?id=' + JSON.stringify(temp3)
    })
  },

  toHome(e) {
    wx.redirectTo({
      url: '../../pages/home/home'
    })
  },

  onShow: function() {
    var that = this
    wx.request({
      url: 'http://localhost:8080/get?path=/order/0/',
      data: {
        order: []
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          currentOrder: res.data.status,
        })
      }
    });
    const history0 = 4
    const history1 = 5
    const tempHistory0Title = 'histories[0].title'
    const tempHistory0Time = 'histories[0].time'
    const tempHistory0Id = 'histories[0].id'
    const tempHistory0Img = 'histories[0].img'
    const tempHistory1Title = 'histories[1].title'
    const tempHistory1Time = 'histories[1].time'
    const tempHistory1Id = 'histories[1].id'
    const tempHistory1Img = 'histories[1].img'
    wx.request({
      url: 'http://localhost:8080/get?path=/bases',
      data: {
        bases: []
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          bases: res.data,
          [tempHistory0Title]: res.data[history0].title,
          [tempHistory0Time]: res.data[history0].time,
          [tempHistory0Id]: res.data[history0].id,
          [tempHistory0Img]: res.data[history0].img,
          [tempHistory1Title]: res.data[history1].title,
          [tempHistory1Time]: res.data[history1].time,
          [tempHistory1Id]: res.data[history1].id,
          [tempHistory1Img]: res.data[history1].img,
        })
      }
    });
    const temp1 = "current.in"
    const temp2 = "history.in"
    const temp3 = "star.in"
    this.setData({
      [temp3]: false,
    })
    setTimeout(function() {
      that.setData({
        [temp1]: true,
        [temp2]: true,
      })
    }, 300)
    setTimeout(function() {
      that.setData({
        mapShow: !that.data.mapShow,
      })
    }, 800)
  },

  onHide: function() {
    const temp1 = "current.in"
    const temp2 = "history.in"
    const temp3 = "star.in"
    var that = this
    setTimeout(function() {
      that.setData({
        [temp1]: false,
        [temp2]: false,
        [temp2]: false,
      })
    }, 200)
    var that = this
    that.setData({
      mapShow: !that.data.mapShow
    })
  },

  switchChange(e) {
    const {
      model
    } = e.currentTarget.dataset
    const temp1 = "current.in"

    this.setData({
      [model]: e.detail.value,
    })
  },
})