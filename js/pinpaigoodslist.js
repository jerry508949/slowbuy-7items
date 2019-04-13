$(function () {
     //实现区域滑动
     mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: false
    })

    // console.log($.getParameter(location.search));
    
    //渲染页面
    $.ajax({
        type: 'get',
        url: 'getbrand',
        data: {brandtitleid: $.getParameter(location.search).brandTitleId || 1},
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = template('brandListTemp',result)
            // console.log(html);
            $('.tvBrand_list').html(html)
        }
    })

    
})
