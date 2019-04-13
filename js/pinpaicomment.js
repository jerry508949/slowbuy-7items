$(function () {
    //实现区域滑动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: false

    })
    //渲染评论页面
    $.ajax({
        type: 'get',
        url: 'getproductcom',
        data: {productid: $.getParameter(location.search).productId || 1},
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = template('commentListTemp',result)
            // console.log(html);
            $('.commentList').html(html)
        }
    })

    //渲染产品页面
    $.ajax({
        type: 'get',
        url: 'getproduct',
        data: {productid: $.getParameter(location.search).productId},
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = template('productTemp',result)
            console.log(html);
            $('.mmm_product').html(html)
            
        }   
    })

    
    $('.mui-scroll').on('touchmove',function (e) {
        var str = ($(this).css('transform'));
        // console.log(str);
        var strArr = str.substring(str.indexOf('(')+1,str.indexOf(')'))
        // console.log(strArr);
        var arr = strArr.split(',')
        console.log( $('.mmm_search').css('tranform','translateY(300px)'));
       
    })
})