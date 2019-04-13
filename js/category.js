$(function () {
    //页面加载就渲染大家电数据
    $.ajax({
        type: 'get',
        url: 'getcategorytitle',
        dataTyep: 'json',
        success: function (result) {
            console.log(result);
            var html = template('cgallTemp', result)
            $('.mui-table-view').html(html)
        }
    })
})
//点击的时候渲染数据大家电列表中的数据 
$('.content').on('tap', '.cata', function (e) {
    //点击的时候获取自定义属性存储的id值
    e.preventDefault()
    //获取到存储的自定义id
    var titleID = $(this).data('id')
    $.ajax({
        type: 'get',
        url: 'getcategory',
        dataTyep: 'json',
        data: { titleid: titleID },
        success: function (result) {
            console.log(result);
            var html = template('cgNameTemp1', result)
            $('.cglist').html(html)
        }
    })
})