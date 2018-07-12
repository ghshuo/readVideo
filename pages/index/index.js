//index.js
const postsDate = require('../../data/posts-data.js');

//获取应用实例
const app = getApp()

Page({

    /**
     * 页面的初始数据
     * 小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A,
     * 而这个动作A的执行，是在onload 事件执行之后发生的。
     */
    data: {
        indicatorDots: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        this.setData({
            posts_key: postsDate.postList
        });
    },
    onPostTap: function(event) {
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: "post-detail/post-detail?id=" + postId
        })
    },
    /**
     *  swiper轮播图文章跳转
     */
    onSwiperTap: function(event) {
        // target指的是当前点击的组件 currentTarget 指的是事件捕获的组件
        var postId = event.target.dataset.postid;
        wx.navigateTo({
            url: "post-detail/post-detail?id=" + postId
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

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