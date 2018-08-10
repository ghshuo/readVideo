const postsDate = require('../../../data/posts-data.js')
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlagyingMusic: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(option) {
        // let globalDate = app.globalDate;
        // console.log(globalDate);
        let postId = option.id; //
        this.data.currentPostId = postId;
        let postData = postsDate.postList[postId];
        this.setData({
            postData: postData
        })
        var postsCollected = wx.getStorageSync('posts_collected')
        if (postsCollected) {
            var postCollected = postsCollected[postId]
            this.setData({
                collected: postCollected
            })
            console.log(postCollected)
        } else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }
        // 在app.js中设置全局变量 ，  isPlagyingMusic初始化时false   音乐在播放把isPlagyingMusic 变成true  而没有播放就不需要改变
        if (app.globalDate.g_isPlagyingMusic && app.globalDate.g_currentMusicPostId == postId) { //  如果是true说明音乐正在播放
            this.setData({
                isPlagyingMusic: true
            }) 
        }

        this.setMusicMonitor();
    },

    /**
     * 监听音乐播放状态
     */
    setMusicMonitor: function() {
        var that = this;
        // 监听播放
        wx.onBackgroundAudioPlay(function() {
            that.setData({
                isPlagyingMusic: true
            })
            app.globalDate.g_isPlagyingMusic = true;
            app.globalDate.g_currentMusicPostId = that.data.currentPostId;
        })
        // 监听停止
        wx.onBackgroundAudioStop(function() {
            that.setData({
                isPlagyingMusic: false
            })
            app.globalDate.g_isPlagyingMusic = false;
            app.globalDate.g_currentMusicPostId = null;
        })

        wx.onBackgroundAudioStop(function() {
            that.setData({
                isPlagyingMusic: false
            })
            app.globalDate.g_isPlagyingMusic = false;
            app.globalDate.g_currentMusicPostId = null;
        })
    },
    // 音乐播放
    onMusicTap: function() {
        // 音乐播放isPlagyingMusic =true 是播放  false 是关闭 
        var currentPostId = this.data.currentPostId;
        var isPlagyingMusic = this.data.isPlagyingMusic;
        if (isPlagyingMusic) {
            // 停止播放
            wx.pauseBackgroundAudio();
            this.setData({
                isPlagyingMusic: false
            })
        } else {
            // 播放音乐
            wx.playBackgroundAudio({
                dataUrl: postsDate.postList[currentPostId].music.url,
                title: postsDate.postList[currentPostId].music.title,
                coverImgUrl: postsDate.postList[currentPostId].music.coverImg
            })
            this.setData({
                isPlagyingMusic: true
            })
        }
    },
    /**
     * 阅读 收藏
     */
    onColletionTap: function(event) {
        var postsCollected = wx.getStorageSync('posts_collected');
        var postCollected = postsCollected[this.data.currentPostId];
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected;
        // 更新文章是否的缓存值
        wx.setStorageSync('posts_collected', postsCollected);
        // 更新数据绑定变量，从而实现切换图片
        this.setData({
            collected: postCollected
        })

        // 提示信息
        wx.showToast({
            title: postCollected ? '收藏成功' : '取消成功',
            duration: 1000,
            icon: 'none'
        })
    },

    /**
     * 分享
     */
    onShareTap: function() {
        let itemList = [
            '分享给微信好友',
            '分享到朋友圈',
            '分享到qq',
            '分享到微博'
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: '#405f80',
            success: function(res) {
                console.log(res.cancel);
                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    content: '内容'
                })

            }
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