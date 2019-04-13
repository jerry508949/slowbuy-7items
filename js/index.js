$(function () {
  $.ajax({
    type:'get',
    url:'http://193.112.55.79:9090/api/getindexmenu',
    dataType:'json',
    success:function (result) {
      console.log(result)
      var html = template('navTemp', result)
      // console.log(html);
      
      $('.mmm_nav').html(html)
    }
  })
  // console.log(123);
  

  $.ajax({
    type: 'get',
    url: 'http://193.112.55.79:9090/api/getmoneyctrl',
    dataType: 'json',
    success: function (result) {
      console.log(result)
      console.log(result.result[0].productComCount)
      var html = template('goodslistTemp', result)
      // console.log(html);
      // console.log(html);
      $('.goods_list').html(html)
    }
  })
})