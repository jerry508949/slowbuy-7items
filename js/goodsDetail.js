$(function () {
    //1获取getcategorybyid 头部的nav 商品名字渲染
     $.ajax({
         type: 'get',
         url: 'getcategorybyid',
         data:{categoryid:$.getParameter(location.search).categoryId},
         dataTyep: 'json',
         success: function (result) {
            //  console.log(result);
             var html = template('cateNameTemp', result)
             $('.cateName').html(html)
         }
     })
     //截取&符号后面的数据
    console.log( $.getParameter(location.search).productId);
 
        //2获取详情页的数据
         $.ajax({
            type: 'get',
            url: 'getproduct',
            data:{productid:$.getParameter(location.search).productId},
            dataTyep: 'json',
            success: function (result) {
                // console.log(result);
                var bjShopHtml = template('bjShopTemp', result)
                var titleHtml = template('titleTemp', result)
                var imgTempHtml = template('product_imgTemp', result)
                $('.bjShop').html(bjShopHtml)
                $('.goodsDetail_title').html(titleHtml)
                $('.product_img').html(imgTempHtml)
                
            }
        })
    

         //3获取详情页的网友评论
         $.ajax({
            type: 'get',
            url: 'getproductcom',
            data:{productid:$.getParameter(location.search).productId},
            dataTyep: 'json',
            success: function (result) {
                console.log(result);
                var user_productHtml = template('user_productTemp', result)
                $('.user_product').html(user_productHtml)
                
            }
        })
    
 
 })
 