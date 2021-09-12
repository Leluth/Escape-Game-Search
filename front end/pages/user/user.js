// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    pageTop: 0,
    pentaval: ['逃脱', '推理', '团队', '先锋', '多面'].map((name, i) => ({
      val: i / 10 + 0.5,
      name
    })),
    summary: [233, 56.6, '82.0%', 0.0],
    friends: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  setFriends: function(fs) {
    for (let uid of fs) {
      wx.request({
        url: app.globalData.server + `/get?path=/user/${uid}`,
        success: (res => {
          const friends = this.data.friends
          friends.push({
            icon: res.data.avatarUrl,
            name: res.data.nickName,
            id: res.data.id
          })
          this.setData({
            friends
          })
        }).bind(this)
      })
    }
  },
  onLoad: function(options) {
    if (!options.id && app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: app.globalData.userInfo
      })
      this.setData({
        friends: app.globalData.friends
      })
    } else {
      wx.request({
        url: app.globalData.server + `/get?path=/user/${options.id}`,
        success: (res => {
          this.setData({
            hasUserInfo: true,
            userInfo: res.data
          })
          this.setFriends(res.data.friends)
        }).bind(this)
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      hasUserInfo: true,
      userInfo: e.detail.userInfo
    })
  },
  onPageScroll: function(e) {
    this.setData({
      pageTop: e.scrollTop
    })
  },
  /************************************** */
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})