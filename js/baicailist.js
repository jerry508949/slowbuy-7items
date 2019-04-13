$(function () {
  

  $.ajax({
    type:'get',
    url:'http://193.112.55.79:9090/api/getbaicaijiaproduct',
    data: {titleid:1},
    dataType:'json',
    success:function (result) {
      console.log(result)
      var html = template('listTemp',result)
      // console.log(html)
      $('.good_list').html(html)
    }
  })
})

