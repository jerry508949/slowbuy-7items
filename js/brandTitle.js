$(function () {
    //实现区域滑动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: false
    })
    //渲染页面
    $.ajax({
        type: 'get',
        url: 'getbrandtitle',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = template('brandListTemp',result)
            // console.log(html);
            $('.branlist').html(html)
        }
    })
})