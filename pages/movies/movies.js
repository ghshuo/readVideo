const util = require('../../utils/util.js');

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        searchResult: {},
        containerShow: true,
        searchPnelShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     * 豆瓣api地址  https://developers.douban.com/wiki/?title=guide
     *  start表示第几页 count每页几条数据
     */
    onLoad: function(event) {
        var inTheatersUrl = app.globalDate.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3"; //
        var comingSoonUrl = app.globalDate.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3"; // 即将上映
        var top250Url = app.globalDate.doubanBase + "/v2/movie/top250" + "?start=0&count=3"; // 豆瓣Top250
        this.getMovieListData(inTheatersUrl, "inTheaters");
        this.getMovieListData(comingSoonUrl, "comingSoon");
        this.getMovieListData(top250Url, "top250");
    },
    /**
     * 搜索
     */
    // 关闭搜索页面
    onCancelImg: function(enent){
        this.setData({
            containerShow: true,
            searchPnelShow: false
        })
    },
    // 打开搜索的页面
    onBindFocus: function(event) {
        this.setData({
            containerShow: false,
            searchPnelShow: true
        })
    },
    onBindChange: function(event) {
        // 获取输入框中的内容
        let text = event.detail.value;
        let searchUrl = app.globalDate.doubanBase + "/v2/movie/search?q="+ text;
        this.getMovieListData(searchUrl,"searchResult" , "");
    },
    /**`                
     * 更多页面跳转
     */
    onMoreTap: function(event) {
        let category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category
        })
    },
    /**
     * 接口请求 
     * url 地址
     * title 名称
     */
    getMovieListData: function(url, title) {
        var that = this;
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            header: {
                'content-type': 'application/xml'
            },
            success: function(res) {
                that.processDoubanData(res.data, title);
            },
            fail: function() {},
            complete: function() {

            }
        })
    },
    // 统一处理返回的数据
    processDoubanData: function(moviesDouban, settedKey) {
        // 定义一个空数组作为处理完数据的容器
        let movies = [];

        for (let index in moviesDouban.subjects) {
            let subjects = moviesDouban.subjects[index];
            // console.log(subjects);
            let title = subjects.title;
            // 处理名称 
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            // 循环数据
            var temp = {
                stars: util.convertToStarsArray(subjects.rating.stars),
                title: title,
                average: subjects.rating.average,
                coverageUrl: subjects.images.large,
                movieId: subjects.id
            }
            movies.push(temp);
        }
        // 动态赋值
        let readyData = {};
        readyData[settedKey] = {
            cateTitle: moviesDouban.title,
            movies: movies
        }
        this.setData(readyData);
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