$(function(){
    $.ajax({
        type:'get',
        url:'getdiscountproduct',
        data:$.getParameter(location.search),
        dataType:'json',
        success:function(result){
           console.log(result);
           console.log(result.result[0].productComment);

           var html=template('discountgoodsTemp',result.result[0]);
           $('.slow_content').html(html);
        }
    })
    
})