// components/asu/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    from: {
      type: String,
      value: 'bottom: 100%;left:0;'
    },
    to: {
      type: String,
      value: 'transform: translateY(100%);'
    },
    fab:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  lifetimes: {},

  /**
   * 组件的方法列表
   */
  methods: {}
})