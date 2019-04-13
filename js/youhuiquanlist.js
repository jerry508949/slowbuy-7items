$(function () {
  $.ajax({
    type: 'get',
    url: 'http://193.112.55.79:9090/api/getcouponproduct',
    dataType: 'json',
    data: { couponid:0},
    success: function (result) {
      console.log(result)
      var html = template('couponlistTemp', result)
      $('.couponlist').html(html)
    }
  })
})

