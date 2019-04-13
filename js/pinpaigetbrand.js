$(function () {
     //实现区域滑动
     mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: false
    })
    //渲染页面结构
    var pagenum = $.getParameter(location.search).pageid || 1
    function init(params) {
        $.ajax({
            type: 'get',
            url: 'getbrandproductlist',
            data: {
                brandtitleid: $.getParameter(location.search).categoryId || 0,
                pageid: pagenum || 0
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var html = template('productListTemp',result)
                // console.log(html);
                $('.tvBrand_list').html(html)
                
            }   
        })
    }
    init()
    //向上翻页
    $('.mui-previous').on('tap',function () {
       pagenum --
       console.log();
       if(pagenum < 1) {
           pagenum = 1 
       }
       init()
    })
    //向下翻页
    $('.mui-next').on('tap',function () {
        pagenum ++
        console.log();
        init()
     })
    
})