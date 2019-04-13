$(function(){
    $.ajax({
        type:'get',
        url:'getinlanddiscount',
        dataType:'json',
        success:function(result){
          console.log(result);
          var html=template('goodsListTemp',{list:result.result});
          $('.goodsList').html(html);
        }
    })
    
})