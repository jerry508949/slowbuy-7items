$(function () {
  $.ajax({
    type:'get',
    url:'http://193.112.55.79:9090/api/getcoupon',
    dataType:'json',
    success:function (result) {
      console.log(result)
      var html = template('couponTemp',result)
      $('.couponlist').html(html)
    }
  })
})