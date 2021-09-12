const app = getApp()

Page({
  data: {
    value: '',
    bases: [],
    items: [{
      type: 'text',
      label: '距离',
      value: 'distinct',
      groups: ['001'],
    },
    {
      type: 'text',
      label: '订单量',
      value: 'sale',
      groups: ['002'],
    },
    {
      type: 'text',
      label: '评分',
      value: 'score',
      groups: ['003'],
    },
    {
      type: 'filter',
      label: '筛选',
      value: 'filter',
      children: [{
        type: 'radio',
        label: '消费区间',
        value: 'consumer',
        children: [{
          label: '$5以下',
          value: '0',
        },
        {
          label: '$5-$15',
          value: '1',
        },
        {
          label: '$15以上',
          value: '2',
        },
        ],
      },
      {
        type: 'checkbox',
        label: '密室描述',
        value: 'tags',
        children: [{
          label: '恐怖密室',
          value: '恐怖密室',
        },
        {
          label: '烧脑',
          value: '烧脑',
        },
        {
          label: '真人npc',
          value: '真人npc',
        },
        {
          label: '定妆照',
          value: '定妆照',
        },
        {
          label: '剧情密室',
          value: '剧情密室',
        },
        {
          label: '桌游',
          value: '桌游',
        },
        {
          label: '付费停车',
          value: '付费停车',
        },
        {
          label: '角色扮演',
          value: '角色扮演',
        },
        ]
      }
      ],
      groups: ['004'],
    },
    ],
    /**************************************** */
    pageNum: 0,
    pageTop: 0,
    slideVdoCtx: [],
    showTalk: false,
    showTalking: false,
    talking: null,
    talkers: null,
    talks: []
  },
  handleShowSearch() {
    this.setData({
      pageTop: 0,
    })
  },
  handleBarNavi(e) {
    this.data.pageNum !== e.detail && this.setData({
      pageNum: e.detail
    })
    if (e.detail === 1)
      wx.redirectTo({
        url: '/pages/orderLists/orderLists',
      })
  },
  handleShowTalk(e) {
    this.setData({
      showTalk: !this.data.showTalk,
    })
  },
  handleTalking(e) {
    wx.request({
      url: app.globalData.server + `/get?path=user/${this.data.userInfo.id}/messages/${e.target.id}`,
      success: res => {
        if (res.data)
          this.setData({
            talks: res.data.map(v => ({
              flag: !v.indexOf('__self__'),
              val: !v.indexOf('__self__') ? v.slice(8) : v
            }))
          })
        else
          this.setData({
            talks: []
          })
      }
    })
    this.setData({
      showTalking: true,
      talking: e.target.id,
      [`talkers[${e.target.id}].tags`]: 0
    })
  },
  handleSendTalk(e) {
    let input
    switch (e.type) {
      case 'input':
        this.setData({
          talkInput: e.detail.value
        })
        return
      case 'confirm':
        input = e.detail.value
        break
      case 'touchstart':
        input = this.data.talkInput
        break
    }
    const talks = this.data.talks
    talks.push({
      flag: true,
      val: input
    })
    this.setData({
      talks,
      talkInput: null
    })
    wx.request({
      url: app.globalData.server + `/insert?path=/user/${this.data.talking}/messages/${this.data.userInfo.id}&val="${input}"`,
    })
    wx.request({
      url: app.globalData.server + `/insert?path=/user/${this.data.userInfo.id}/messages/${this.data.talking}&val="__self__${input}"`,
    })
  },
  handleCloseTalking(e) {
    if (this.touch) {
      e.touches[0].clientY < this.touch.clientY && this.setData({
        showTalking: false
      })
      this.touch = null
    } else
      this.touch = e.touches[0]
  },
  onPageScroll(e) {
    this.setData({
      pageTop: e.scrollTop
    })
  },
  handleVideoCtx: function (e) {
    const cs = this.data.slideVdoCtx
    if (cs[e.target.id]) return
    e.detail && e.target.id != '0' && e.detail.pause()
    cs[e.target.id] = e.detail
    this.setData({
      slideVdoCtx: cs
    })
  },
  handleSlideChange(e) {
    const cs = this.data.slideVdoCtx
    cs[e.detail[0]] && cs[e.detail[0]].pause()
    cs[e.detail[1]] && cs[e.detail[1]].play()
  },

  /************************* */
  onLoad(options) {
    setTimeout(() => this.setData({
      userInfo: app.globalData.userInfo,
      talkers: app.globalData.friends.map(v => Object.assign(v, {
        tags: app.globalData.userInfo.messages[v.id] && app.globalData.userInfo.messages[v.id].reduce(
          (acc, val, i) => acc - ('' + val).indexOf('__self__'), 0)
      }))
    }), 1000)

    var that = this
    wx.request({
      url: 'http://localhost:8080/get?path=/bases',
      data: {
        bases: []
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          bases: res.data,
        })
      }
    })
    that.setData({
      userInfo: app.globalData.userInfo
    })
  },

  onChange(e) {
    const {
      index
    } = e.detail
    if (index == 0) {
      var arry_length = this.data.bases.length
      for (var i =
        0; i < arry_length; i++) {
        for (var j =
          0; j < arry_length - i -
          1; j++) {
          let arry_jiage1 =
            this.data.bases[j].distinct
          let arry_jiage2 =
            this.data.bases[j + 1].distinct
          let arry_index1 =
            this.data.bases[j]
          let arry_index2 =
            this.data.bases[j + 1]
          if (arry_jiage1 > arry_jiage2) {
            let zhongjie1 = arry_index2.distinct
            let zhongjie2 = arry_index2.img
            let zhongjie3 = arry_index2.title
            let zhongjie4 = arry_index2.price
            let zhongjie5 = arry_index2.sale
            let zhongjie6 = arry_index2.score
            let zhongjie7 = arry_index2.tag1
            let zhongjie8 = arry_index2.tag2
            let zhongjie9 = arry_index2.tag3
            let zhongjie10 = arry_index2.tag4
            let zhongjie11 = arry_index2.starPress
            let zhongjie12 = arry_index2.id
            let zhongjie13 = arry_index2.radioShow
            let zhongjie14 = arry_index2.checkShow
            arry_index2.distinct = arry_index1.distinct
            arry_index2.img = arry_index1.img
            arry_index2.title = arry_index1.title
            arry_index2.price = arry_index1.price
            arry_index2.sale = arry_index1.sale
            arry_index2.score = arry_index1.score
            arry_index2.tag1 = arry_index1.tag1
            arry_index2.tag2 = arry_index1.tag2
            arry_index2.tag3 = arry_index1.tag3
            arry_index2.tag4 = arry_index1.tag4
            arry_index2.starPress = arry_index1.starPress
            arry_index2.id = arry_index1.id
            arry_index2.radiohow = arry_index1.radiohow
            arry_index2.checkShow = arry_index1.checkShow
            arry_index1.distinct = zhongjie1
            arry_index1.img = zhongjie2
            arry_index1.title = zhongjie3
            arry_index1.price = zhongjie4
            arry_index1.sale = zhongjie5
            arry_index1.score = zhongjie6
            arry_index1.tag1 = zhongjie7
            arry_index1.tag2 = zhongjie8
            arry_index1.tag3 = zhongjie9
            arry_index1.tag4 = zhongjie10
            arry_index1.starPress = zhongjie11
            arry_index1.id = zhongjie12
            arry_index1.radioShow = zhongjie13
            arry_index1.checkShow = zhongjie14
          }
        }
      }
      this.setData({
        bases: this.data.bases,
      })
    }
    if (index == 1) {
      var arry_length = this.data.bases.length
      for (var i =
        0; i < arry_length; i++) {
        for (var j =
          0; j < arry_length - i -
          1; j++) {
          let arry_jiage1 =
            this.data.bases[j].sale
          let arry_jiage2 =
            this.data.bases[j + 1].sale
          let arry_index1 =
            this.data.bases[j]
          let arry_index2 =
            this.data.bases[j + 1]
          if (arry_jiage1 < arry_jiage2) {
            let zhongjie1 = arry_index2.distinct
            let zhongjie2 = arry_index2.img
            let zhongjie3 = arry_index2.title
            let zhongjie4 = arry_index2.price
            let zhongjie5 = arry_index2.sale
            let zhongjie6 = arry_index2.score
            let zhongjie7 = arry_index2.tag1
            let zhongjie8 = arry_index2.tag2
            let zhongjie9 = arry_index2.tag3
            let zhongjie10 = arry_index2.tag4
            let zhongjie11 = arry_index2.starPress
            let zhongjie12 = arry_index2.id
            let zhongjie13 = arry_index2.radioShow
            let zhongjie14 = arry_index2.checkShow
            arry_index2.distinct = arry_index1.distinct
            arry_index2.img = arry_index1.img
            arry_index2.title = arry_index1.title
            arry_index2.price = arry_index1.price
            arry_index2.sale = arry_index1.sale
            arry_index2.score = arry_index1.score
            arry_index2.tag1 = arry_index1.tag1
            arry_index2.tag2 = arry_index1.tag2
            arry_index2.tag3 = arry_index1.tag3
            arry_index2.tag4 = arry_index1.tag4
            arry_index2.starPress = arry_index1.starPress
            arry_index2.id = arry_index1.id
            arry_index2.radioShow = arry_index1.radioShow
            arry_index2.checkShow = arry_index1.checkShow
            arry_index1.distinct = zhongjie1
            arry_index1.img = zhongjie2
            arry_index1.title = zhongjie3
            arry_index1.price = zhongjie4
            arry_index1.sale = zhongjie5
            arry_index1.score = zhongjie6
            arry_index1.tag1 = zhongjie7
            arry_index1.tag2 = zhongjie8
            arry_index1.tag3 = zhongjie9
            arry_index1.tag4 = zhongjie10
            arry_index1.starPress = zhongjie11
            arry_index1.id = zhongjie12
            arry_index1.radioShow = zhongjie13
            arry_index1.checkShow = zhongjie14
          }
        }
      }
      this.setData({
        bases: this.data.bases,
      })
    }
    if (index == 2) {
      var arry_length = this.data.bases.length
      for (var i =
        0; i < arry_length; i++) {
        for (var j =
          0; j < arry_length - i -
          1; j++) {
          let arry_jiage1 =
            this.data.bases[j].score
          let arry_jiage2 =
            this.data.bases[j + 1].score
          let arry_index1 =
            this.data.bases[j]
          let arry_index2 =
            this.data.bases[j + 1]
          if (arry_jiage1 < arry_jiage2) {
            let zhongjie1 = arry_index2.distinct
            let zhongjie2 = arry_index2.img
            let zhongjie3 = arry_index2.title
            let zhongjie4 = arry_index2.price
            let zhongjie5 = arry_index2.sale
            let zhongjie6 = arry_index2.score
            let zhongjie7 = arry_index2.tag1
            let zhongjie8 = arry_index2.tag2
            let zhongjie9 = arry_index2.tag3
            let zhongjie10 = arry_index2.tag4
            let zhongjie11 = arry_index2.starPress
            let zhongjie12 = arry_index2.id
            let zhongjie13 = arry_index2.radioShow
            let zhongjie14 = arry_index2.checkShow
            arry_index2.distinct = arry_index1.distinct
            arry_index2.img = arry_index1.img
            arry_index2.title = arry_index1.title
            arry_index2.price = arry_index1.price
            arry_index2.sale = arry_index1.sale
            arry_index2.score = arry_index1.score
            arry_index2.tag1 = arry_index1.tag1
            arry_index2.tag2 = arry_index1.tag2
            arry_index2.tag3 = arry_index1.tag3
            arry_index2.tag4 = arry_index1.tag4
            arry_index2.starPress = arry_index1.starPress
            arry_index2.id = arry_index1.id
            arry_index2.radioShow = arry_index1.radioShow
            arry_index2.checkShow = arry_index1.checkShow
            arry_index1.distinct = zhongjie1
            arry_index1.img = zhongjie2
            arry_index1.title = zhongjie3
            arry_index1.price = zhongjie4
            arry_index1.sale = zhongjie5
            arry_index1.score = zhongjie6
            arry_index1.tag1 = zhongjie7
            arry_index1.tag2 = zhongjie8
            arry_index1.tag3 = zhongjie9
            arry_index1.tag4 = zhongjie10
            arry_index1.starPress = zhongjie11
            arry_index1.id = zhongjie12
            arry_index1.radioShow = zhongjie13
            arry_index1.checkShow = zhongjie14
          }
        }
      }
      this.setData({
        bases: this.data.bases,
      })
    }
  },
  radioChange(e) {
    const {
      value
    } = e.detail
    if (value == 0) {
      var arry_length = this.data.bases.length
      for (var i =
        0; i < arry_length; i++) {
        let arry_price = this.data.bases[i].price
        const temp = "bases[" + i + "].radioShow";
        if (arry_price <= 5) {
          this.setData({
            [temp]: true,
          })
        } else {
          this.setData({
            [temp]: false,
          })
        }
      }
    }
    if (value == 1) {
      var arry_length = this.data.bases.length
      for (var i =
        0; i < arry_length; i++) {
        let arry_price = this.data.bases[i].price
        const temp = "bases[" + i + "].radioShow";
        if (arry_price >= 5 && arry_price <= 15) {
          this.setData({
            [temp]: true,
          })
        } else {
          this.setData({
            [temp]: false,
          })
        }
      }
    }
    if (value == 2) {
      var arry_length = this.data.bases.length
      for (var i =
        0; i < arry_length; i++) {
        let arry_price = this.data.bases[i].price
        const temp = "bases[" + i + "].radioShow";
        if (arry_price >= 15) {
          this.setData({
            [temp]: true,
          })
        } else {
          this.setData({
            [temp]: false,
          })
        }
      }
    }
  },
  resetChange(e) {
    var arry_length = this.data.bases.length
    for (var i =
      0; i < arry_length; i++) {
      const temp1 = "bases[" + i + "].radioShow";
      const temp2 = "bases[" + i + "].checkShow";
      this.setData({
        [temp1]: true,
        [temp2]: true,
        tagfilter: [],
      })
    }
    var that = this
    wx.request({
      url: 'http://localhost:8080/get?path=/bases',
      data: {
        bases: []
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          bases: res.data,
        })
      }
    })
  },
  checkChange(e) {
    this.setData({
      tagfilter: e.detail.value,
    })
  },
  confirmChange(e) {
    var tag_length = this.data.tagfilter.length
    var arr_length = this.data.bases.length
    if (tag_length == 0) {
      for (var j =
        0; j < arr_length; j++) {
        const temp = "bases[" + j + "].checkShow";
        this.setData({
          [temp]: true,
        })
      }
    } else {
      for (var i =
        0; i < tag_length; i++) {
        let tag = this.data.tagfilter[i]
        for (var j =
          0; j < arr_length; j++) {
          const temp = "bases[" + j + "].checkShow";
          if (this.data.bases[j].tag1 != tag && this.data.bases[j].tag2 != tag && this.data.bases[j].tag3 != tag && this.data.bases[j].tag4 != tag) {
            this.setData({
              [temp]: false,
            })
          } else {
            this.setData({
              [temp]: true,
            })
          }
        }
      }
    }
  },
  toShop(e) {
    const value = e.detail.title
    var arry_length = this.data.bases.length
    var that = this
    var temp3
    for (var i =
      0; i < arry_length; i++) {
      const temp1 = "bases[" + i + "].title";
      const temp2 = "bases[" + i + "].id";
      if (that.data.bases[i].title == value) {
        temp3 = that.data.bases[i].id;
      }
    }
    wx.navigateTo({
      url: '../../pages/shop/shop?id=' + JSON.stringify(temp3)
    })
  },
  onOpen(e) { },
  onClose(e) { },
  onFocus(e) {
    console.log('onFocus', e)
  },
  onBlur(e) {
    console.log('onBlur', e)
  },
  onConfirm(e) {
    console.log('onConfirm', e)
  },
  onClear(e) {
    console.log('onClear', e)
    this.setData({
      value: '',
    })
  },
  onCancel(e) {
    console.log('onCancel', e)
  },
  toHome(e) {
    wx.redirectTo({
      url: '../../pages/home/home'
    })
  },
  starPress(e) {
    const value = e.detail.title
    var arry_length = this.data.bases.length
    var that = this
    var temp3
    var starPress
    for (var i =
      0; i < arry_length; i++) {
      const temp1 = "bases[" + i + "].title";
      const temp2 = "bases[" + i + "].starPress";
      if (that.data.bases[i].title == value) {
        that.setData({
          [temp2]: !that.data.bases[i].starPress,
        })
        temp3 = that.data.bases[i].id;
        starPress = that.data.bases[i].starPress;
      }
    }
    wx.request({
      url: 'http://localhost:8080/set?path=/bases/' + JSON.stringify(temp3) + '/starPress&val=' + JSON.stringify(starPress),
    })
  },
})