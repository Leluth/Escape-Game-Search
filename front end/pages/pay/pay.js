import {
  $wuxCalendar
} from '../../components/index'
import {
  $wuxCountDown
} from '../../components/index'
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)

Page({
  data: {
    current: 0,
    shopName: "X先生密室",
    src: "../../images/base01.jpg",
    location: "江汉路循礼门船舶广场老楼",
    locationDetail: "地铁循礼门站E口步行210米",
    order:[],
    value: [],
    time: '',
    date: "",
    people: [1],
    peopleName: "",
    phone: "",
    number: '',
    qrcode: 'https://github.com/skyvow/wux',
    fgColor: 'black',
    options: {
      number: true,
      color: 'white',
      onValid() {
      },
      onInvalid() {
      },
      onSuccess() {
      },
      onError() {
      },
    },
  },

  next() {
    const current = this.data.current + 1
    if (current == 1) {
      if (this.data.value.length == 0 || this.data.time == "") {
        wx.showToast({
          title: '请填写完整',
          image: '../../images/close.png',
          duration: 1000,
          mask: true
        });
      } else {
        this.setData({
          current,
        })
      }
    }
    if (current == 2) {
      if (this.data.peopleName == "" || this.data.phone == "") {
        wx.showToast({
          title: '请填写完整',
          image: '../../images/close.png',
          duration: 1000,
          mask: true
        });
      } else {
        this.setData({
          current,
        })
      }
    }
    if (current == 3) {
      const tempImg = this.data.order.img
      const tempTitle = this.data.order.title
      const tempLocation = this.data.order.location
      const tempLocationDetail = this.data.order.locationDetail
      const tempLongitude = this.data.order.longitude
      const tempLatitude = this.data.order.latitude
      const tempPrice = this.data.order.price
      const tempDistinct = this.data.order.distinct
      const tempSale = this.data.order.sale
      const tempScore = this.data.order.score
      const tempSrc = this.data.order.src
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 1000,
        mask: true
      });
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/img&val=' + JSON.stringify(tempImg),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/title&val=' + JSON.stringify(tempTitle),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/location&val=' + JSON.stringify(tempLocation),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/longitude&val=' + JSON.stringify(tempLongitude),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/latitude&val=' + JSON.stringify(tempLatitude),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/locationDetail&val=' + JSON.stringify(tempLocationDetail),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/locationDetail&val=' + JSON.stringify(tempPrice),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/locationDetail&val=' + JSON.stringify(tempDistinct),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/locationDetail&val=' + JSON.stringify(tempSale),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/locationDetail&val=' + JSON.stringify(tempScore),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/src&val=' + JSON.stringify(tempSrc),
      })
      wx.request({
        url: 'http://localhost:8080/set?path=/order/0/status&val=true',
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../../pages/orderLists/orderLists',
        })
      }, 600)
    }
  },

  last() {
    if (this.data.current == 0) {
      wx.redirectTo({
        url: '../../pages/shop/shop',
      })
    }
    const current = this.data.current - 1 < 0 ? 0 : this.data.current - 1
    this.setData({
      current,
    })
  },
  openCalendar() {
    $wuxCalendar().open({
      value: this.data.value,
      onChange: (values, displayValues) => {
        this.setData({
          value: displayValues,
        })
        this.setData({ //不能同时set
          date: this.data.value[0] + " " + this.data.time,
        })
      },
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value,
    })
    this.setData({ //不能同时set
      date: this.data.value[0] + " " + this.data.time,
    })
  },
  onSlide(e) {
    this.setData({
      people: e.detail.value
    })
  },
  afterChange(e) {
    this.setData({
      people: e.detail.value
    })
  },
  onChange(e) {
    this.setData({
      error: isTel(e.detail.value),
      phone: e.detail.value,
    })
  },
  onFocus(e) {
    this.setData({
      error: isTel(e.detail.value),
    })
  },
  onBlur(e) {
    this.setData({
      error: isTel(e.detail.value),
    })
  },
  onConfirm(e) {
  },
  onClear(e) {
    this.setData({
      error: true,
      value: '',
    })
  },
  onError() {
    wx.showModal({
      title: 'Please enter 11 digits',
      showCancel: !1,
    })
  },
  getName(e) {
    this.setData({
      peopleName: e.detail.value
    })
  },
  vcode() {
    if (this.c2 && this.c2.interval) return !1
    this.c2 = new $wuxCountDown({
      date: +(new Date) + 60000,
      onEnd() {
        this.setData({
          c2: '重新获取验证码',
        })
      },
      render(date) {
        const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
        date.sec !== 0 && this.setData({
          c2: sec,
        })
      },
    })
  },
  bindinput(e) {
    this.setData({
      number: e.detail.value,
    })
  },
  previewImage() {
    const that = this.selectComponent('#qrcode')
    wx.canvasToTempFilePath({
      canvasId: 'wux-qrcode',
      success: (res) => {
        wx.previewImage({
          urls: [res.tempFilePath]
        })
      }
    }, that)
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
          order:res.data,
          shopName: res.data.title,
          src: res.data.img,
          location: res.data.location,
          locationDetail: res.data.locationDetail,
        })
      }
    })
  },
})