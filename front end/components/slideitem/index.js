Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    thumb: {
      type: String,
      value: "../../images/unknown.jpg",
    },
    title: {
      type: String,
      value: 'unknown',
    },
    price: {
      type: String,
      value: 'unknown',
    },
    distinct: {
      type: String,
      value: 'unknown',
    },
    sale: {
      type: String,
      value: 'unknown',
    },
    score: {
      type: String,
      value: 'unknown',
    },
    tag1: {
      type: String,
      value: '',
    },
    tag2: {
      type: String,
      value: '',
    },
    tag3: {
      type: String,
      value: '',
    },
    tag4: {
      type: String,
      value: '',
    },
    order: {
      type: Boolean,
      value: false,
    },
    starPress: {
      type: Boolean,
      value: false,
    },
    isStared: {
      type: Boolean,
      value: false,
    },
    index: {
      type: Number,
      value: 0,
    }
  },
  data: {
    visible: true,
  },
  methods: {
    onClick(e) {
      console.log('onClick', e.detail)
    },
    onStar: function(e) {
      var status = this.data.isStared;
      var title = this.data.title;
      if (status != true) {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 800,
          mask: true
        });
        this.setData({
          isStared: true,
        })
      }
      if (status != false) {
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 800,
          mask: true
        });
        this.setData({
          isStared: false
        })
      }
      this.triggerEvent('handlePress', {
        title
      }, {})
    },
    onClose(e) {
      console.log('onClose', e)
    },
    onChange(e) {
      console.log('onChange', e)
      if (!e.detail.value) {
        wx.showModal({
          title: 'Sure to delete?',
          success: (res) => {
            if (res.confirm) {
              this.setData({
                visible: e.detail.value,
              })
            }
          },
        })
      }
    },
    onToggle() {
      this.setData({
        visible: !this.data.visible,
      })
    },

    disappear() {
      var title = this.data.title;
      this.setData({
        starPress: true,
      })
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 800,
        mask: true
      })
      this.triggerEvent('handlePress', {
        title
      }, {})
    },
    onTap() {
      var title = this.data.title;
      this.triggerEvent('handleTap', {
        title
      }, {})
    },
  },
})