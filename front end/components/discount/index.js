Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    tag: {
      type: String,
      value: "券",
    },
    src: {
      type: String,
      value: "../../images/base01.jpg",
    },
    title: {
      type: String,
      value: '【团购】满650减20',
    },
    newPrice: {
      type: String,
      value: '630',
    },
    oldPrice: {
      type: String,
      value: '650',
    },
    tagColor:{
      type:String,
      value:'#2b86c5'
    },
  },
  data: {
    gotTickets: false,
  },
  methods: {
    getTickets(e) {
      this.setData({
        gotTickets: true
      })
    },
  }
})