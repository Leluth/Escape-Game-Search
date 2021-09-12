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
      type: String,
      value: "",
    },
    src: {
      type: String,
      value: "",
    },
    value: {
      type: String,
      value: "",
    },
  },
  data: {
  },
  methods: {
    toShop(e) {
      const id = this.data.value
      wx.navigateTo({
        url: '../../pages/shop/shop?id=' + id
      })
    },
    toComment(e) {
      const id = this.data.value
      wx.navigateTo({
        url: '../../pages/comment/comment?id=' + id
      })
    },
  }
})