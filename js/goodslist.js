$(function () {
    //获取getcategorybyid
    //1打开页面渲染数据
    $.ajax({
        type: 'get',
        url: 'getcategorybyid',//1.1传后台要求的id值
        data: { categoryid: $.getParameter(location.search).categoryId },
        dataTyep: 'json',
        success: function (result) {
            console.log(result);
            //1.2渲染数据到页面
            var html = template('cateNameTemp', result)
            $('.cateName').html(html)
        }
    })


    var num = 1   //初始化页面值为1
    var numCount  //总条数30
    var pagesize  ////一页显示10条
    var firstNum  // 总条数除以一页显示10条 的值
    //2发起ajax请求获取商品数据
    function init(num) {
        $.ajax({
            type: 'get',
            url: 'getproductlist',
            //2.1获取url地址栏的id
            data: {//2.2传入两个数据,一个是分类id,一个是页面数值,默认为1
                categoryid: $.getParameter(location.search).categoryId,
                pageid: num
            },
            dataTyep: 'json',
            success: function (result) {
                console.log(result);//输出的结果
                //2.3获取商品是数据的总条数,还有一页需要显示几条数据
                numCount = result.totalCount//总条数30
                pagesize = result.pagesize//一页显示10条
                firstNum = Math.ceil(numCount / pagesize) //2.4(总数/显示数)=页数,为防止有小数值,取天花板函数
                console.log(numCount);//输出总条数为30
                console.log(pagesize);//输出一页显示10
                // console.log("一共" + firstNum + "页");
                //2.5渲染数据
                var html = template('goodsTemp', result) 
                $('.goods_listAll').html(html)
                //2.6分页思路
                //2.7首先,需要获取总页数,总条数,(总条数/一页显示几条)=总页数
                //需要动态渲染页数,这里发现只能拿到总页数,但是需要作为参数传递到template 动态渲染html结构
                //想到渲染模板只能传递数据或者对象,那么创建数组才能获取到长度值,这里的页码数为3.
                //所以只能new 一个数组为arr,  将数组arr封装成对象{"list": arr}作为参数进行传递过去渲染,
                //firstNum: firstNum 为总页数,作为第二个对象进行传递,作为渲染总页数 如: 1/3 ,2/3 ,3/3... 后面这个3这个字
                var arr = new Array(firstNum) 
                // console.log(arr);
                var pageHtml = template('pageTemp', { "list": arr, firstNum: firstNum })
                // console.log(pageHtml);
                //2.8渲染分页器
                $('.turning').html(pageHtml)
            }
        })
    }
    //2.8自调用一次,写入默认值为1
    init(1)
    setTimeout(() => {
        $('.pgs').text("共" + firstNum + "页")
    }, 500);
    //3点击上一页
    $('.first').on('tap', function () {
        if (num == 1) {//3.1如果页面num==1 那么不再执行后面的代码
            return false;
        }
        num--//3.2num每次-1
        // console.log('上' + num);
        init(num)  //3.3调用ajax发起请求渲染数据
        $('.pgs').text("第" + num + "页") //3.4将获取到的内容写入总页码数的内容中间
        $('body').addClass('eleToggle')//5.7当点击的时候合并上其他的页码,并设为true
        flag = true
    })
    //4点击下一页
    $('.last').on('tap', function () {
        if (num < firstNum) {
            num++
            init(num)
            console.log(firstNum);
            $('.pgs').text("第" + num + "页")
            $('body').addClass('eleToggle')//5.7当点击的时候合并上其他的页码,并设为true
            flag = true
            console.log('下' + num);
        } else {
            mui.toast('世界的尽头...')
            return false;
        }
    })

    //5点击中间共几页,选择点击需要跳转页的时候
    var flag = true  //5.1定义标记
    $('.pagerTatal').on('tap', function (e) {
        //5.2点击的时候获取所有动态生成的页数,这里返回的是一个数组
        var pgArr = $('.pager').find('.pagers') //记住动态渲染的数据不能直接获取,只能通过在结构页面上存在的父级元素上查找
        // console.log(pgArr);
        //5.3循环遍历获取到的数据,遍历pgArr[i]的时候是dom对象,需要转换成$jquery对象,但凡是从dom,html页面上获取到的对象都是dom对象,通过循环遍历都是需要转换成jquery对象才能使用jq方法
        for (var i = 0; i < pgArr.length; i++) {
            $(pgArr[i]).on('tap',function () {//5.4当里面的任何一个总页码数被点击的时候
                index=$(this).index()//5.5获取索引值,+1 作为参数进行传递,调用ajax发起请求,渲染需要跳转到的页
                var index
                // console.log("索引"+index);
                init(index+1)
                $('.pgs').text($(this).text()) //5.6页码数的内容更新为当前被点击的页面数的内容
                $('body').addClass('eleToggle')//5.7当点击的时候合并上其他的页码,并设为true
                flag = true
                //5.8当点击页码数的时候跳到顶部
                // $(window).scrollTop(0);
                // $('body').scrollTop(0);
                // $('html').scrollTop(0);
                // $('body').animate( {scrollTop: 0}, 500);

            })
        }
        // e.preventDefault()//阻止默认行为
        if (flag) {//5.9如果为true则添加显示的类,再设为false,方便下次还可以点击,如果不设为false则不可以点击
            $('body').removeClass('eleToggle')
            flag = false
        } else {
            $('body').addClass('eleToggle')
            flag = true
        }
    })

})

