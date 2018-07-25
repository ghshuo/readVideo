// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigateTitle: '',
        movies: {},
        totalCount: 0,
        requestUrl: '',
        isEmpty: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 获取movie 跳转页面 的类型名称
        let category = options.category;
        this.data.navigateTitle = category;
        let methods = 'GET';
        let dataUrl = '';
        switch (category) {
            case "正在上映的电影-北京":
                dataUrl = app.globalDate.doubanBase + "/v2/movie/in_theaters";
                break;
            case "即将上映的电影":
                dataUrl = app.globalDate.doubanBase + "/v2/movie/coming_soon";
                break;
            case "豆瓣电影Top250":
                dataUrl = app.globalDate.doubanBase + "/v2/movie/top250";
                break;
        }
        this.data.requestUrl = dataUrl;
        console.log(this.data.requestUrl);
        util.http(dataUrl, this.processDoubanData);
    },
    /**
     * 下拉加载更多
     * */
    onScrolltolower: function(event) {
        let nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
        console.log(nextUrl);
        util.http(nextUrl, this.processDoubanData);
        // 设置loading
        wx.showNavigationBarLoading();
    },

    // 回调函数
    // callBack: function(data){
    //     console.log(data);
    // },
    processDoubanData: function(moviesDouban) {
        var movies = [];
        for (var idx in moviesDouban.subjects) {
            var subjects = moviesDouban.subjects[idx];
            var title = subjects.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            // [1,1,1,1,1] [1,1,1,0,0]
            var temp = {
                stars: util.convertToStarsArray(subjects.rating.stars),
                title: title,
                average: subjects.rating.average,
                coverageUrl: subjects.images.large,
                movieId: subjects.id
            }
            movies.push(temp)
        }
        var totalMovies = {};
        // 如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
        if (!this.data.isEmpty) { // 不是空值  说明不是第一次加载数据
            totalMovies = this.data.movies.concat(movies);
            if (movies != "") {
                this.data.totalCount += 20;
            }
        } else {
            totalMovies = movies;
            this.data.isEmpty = false;
        }
        this.setData({
            movies: totalMovies
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        //   动态设定导航栏标题
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        let requestUrl = this.data.requestUrl + "?start=0&count=20";
        this.data.movies = {};
        this.data.isEmpty = true;
        this.data.totalCount = 20;
        util.http(requestUrl, this.processDoubanData);
        // 设置loading
        wx.showNavigationBarLoading();
    }
})