// components/asu/talk-bar/talk-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: String,
    name: String,
    val: String,
    tags: {
      type: Number,
      value: 0
    },
    divided: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTapTalk: function(e) {
      //
    }
  }
})