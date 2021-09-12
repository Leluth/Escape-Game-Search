Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    src: {
      type: String,
      value: "../../res/img/00.png",
    },
    name: {
      type: String,
      value: "暗黑佟大为",
    },
    score: {
      type: String,
      value: "3.7",
    },
    comment: {
      type: String,
      value: "早就听说这家密室逃脱店铺很值得一去,趁放假和朋友一起去打了卡,游戏体验感非常棒!这家店的密室类别多,类别也是丰富多彩,有悬疑的,治愈的,解密的等等,总有一款适合你。场景布置的特别真实,细节很到位,让人真正身临其境",
    },
    urls: {
      type: Array,
      value: [
        '../../images/tongdawei.jpg',
        '../../images/base01.jpg',
        '../../images/base02.jpg',
        '/res/img/03.png',
      ],
    },
  },
  data: {},
  methods: {
    previewImage(e) {
      const {
        current
      } = e.currentTarget.dataset
      const {
        urls
      } = this.data
      wx.previewImage({
        current,
        urls,
      })
    },
  }
})