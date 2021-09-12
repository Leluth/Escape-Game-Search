const util = require('../../../utils/util.js')

const urls = ['home', 'orderLists', 'user'].map(v => '/pages/' + v + '/' + v)
const icons = ['01', '02', '03'].map(v => '/res/img/' + v + '.png')

Component({
  properties: {
    on: Number,
  },
  data: {
    navis: icons.map((val, i) => ({
      i: i,
      icon: val,
      name: ['Home', 'Order', 'Me!'][i]
    }))
  },

  methods: {
    tapNavi: function(e) {
      const data = e.target.dataset
      this.setData({
        on: data.i
      })
      this.triggerEvent('bar-navi', data.i)
      wx.redirectTo({
        url: urls[data.i],
      })
    }
  }
})