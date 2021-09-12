Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    shopName: {
      type: String,
      value: "",
    },
    time: {
      type: Number,
      value: 7,
    },
    src: {
      type: String,
      value: "",
    },
    location: {
      type: String,
      value: '',
    },
    mapShow: {
      type: Boolean,
      value: false,
    },
    longitude: {
      type: Number,
      value: 113.324520,
    },
    latitude: {
      type: Number,
      value: 23.099994,
    },
  },
  data: {
    markers: [{
      iconPath: "../../images/base01.jpg",
      id: 0,
      longitude: 113.324520,
      latitude: 23.099994,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 114.441328,
        latitude: 30.516797
      }, {
        longitude: 113.324520,
        latitude: 23.21329
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: "../../images/base01.jpg",
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  ready() {
    var that = this
    const tempMLO = "markers[0].longitude"
    const tempMLA = "markers[0].latitude"
    const tempMI = "markers[0].iconPath"
    const tempPLO = "polyline[0].points[1].longitude"
    const tempPLA = "polyline[0].points[1].latitude"
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
          shopName: res.data[0].title,
          src: res.data[0].img,
          location: res.data[0].location,
          longitude: res.data[0].longitude,
          latitude: res.data[0].latitude,
          [tempMLO]: res.data[0].longitude,
          [tempMLA]: res.data[0].latitude,
          [tempPLO]: res.data[0].longitude,
          [tempPLA]: res.data[0].latitude,
          [tempMI]: res.data[0].img,
        })
      }
    })
  },
  methods: {
    toShop(e) {
      wx.navigateTo({
        url: '../../pages/shop/shop?order=true'
      })
    },
    routeMap() {
      const latitude = this.data.latitude
      const longitude = this.data.longitude
      const name = this.data.shopName
      const address = this.data.location
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
    regionchange(e) {},
    markertap(e) {},
    controltap(e) {},
    cancelOrder(e) {
      this.triggerEvent('handleEvent', {}, {})
    },
  }
})