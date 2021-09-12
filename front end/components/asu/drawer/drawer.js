// components/asu/drawer/drawer.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    uid: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    mvp_icon: null,
    mates: [],
    datas: [],
    on: -1,
  },

  lifetimes: {
    ready: function() {
      wx.request({
        url: app.globalData.server + `/get?path=/user/${this.properties.uid}/records`,
        success: res => {
          const time = (new Date).getTime()
          res.data.forEach(d => {
            let t
            d.time = (t = Math.floor((time - d.time) / 1000 / 3600 / 24)) && `${t}天前` || '今天'
            for (let v of d.team) {
              if (!this.data.mates[v])
                wx.request({
                  url: app.globalData.server + `/get?path=/user/${v}`,
                  success: res => this.setData({
                    [`mates[${v}]`]: res.data
                  })
                })
            }
          })
          this.setData({
            datas: res.data,
          })
        }
      })
      this.setData({
        mvp_icon: app.globalData.server + '/static/img/mvp.png'
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTapCard: function(e) {
      const id = +e.currentTarget.id
      this.setData({
        on: this.data.on === id ? -1 : id
      })
    }
  }
})