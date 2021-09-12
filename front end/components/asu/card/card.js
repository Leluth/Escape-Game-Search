Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: String,
    src: String,
    val: String,
    val1: String,
    substyle: String,
    subclass: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoCtx: null,
  },

  lifetimes: {
    ready: function() {
      // console.log(this, 123)
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleVideoPlay: function() {
      let ctx = this.data.videoCtx
      ctx || ((ctx = wx.createVideoContext('vdo', this)) && this.setData({
        videoCtx: ctx
      }))
      this.triggerEvent('card-play', ctx)
    }
  }
})
