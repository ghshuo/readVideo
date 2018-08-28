## 前言
阅读与电影是在学习小程序过程中写的一个demo，该项是由文章阅读和电影简介两部分组成。我写的有什么不足的地方希望大家指正一下，大家一起学习一起进步。
## 阅读
阅读文章中能够查看详细信息，文章收藏，音乐播放，分享等功能。
    
    //  提取request发送请求
    function http(url, callBack, methods) {
    wx.request({
        url: url,
        data: {},
        method: methods,
        header: {
            'content-type': 'application/xml'
        },
        success: function(res) {
            callBack(res.data);
        },
        fail: function(error) {
            console.log(error);
        }
    })
}

## 电影
   电影调用的接口是 豆瓣公共电影api :  https://developers.douban.com/wiki/?title=movie_v2
   电影中实现了搜索、更多、下拉分页、电影详情等功能。
   
   
   
    // 星级评价图标 提取成公共样式 
    function convertToStarsArray(stars) {
        var num = stars.toString().substring(0, 1);
        var array = [];
        for (var i = 1; i <= 5; i++) {
            if (i <= num) {
                array.push(1);
            } else {
                array.push(0);
            }
        }
        return array;
    }
    
## 项目浏览
   ![项目浏览地址](http://p9mrpjx2c.bkt.clouddn.com/video1.png)
   ![项目浏览地址](http://p9mrpjx2c.bkt.clouddn.com/video2.png)
    

