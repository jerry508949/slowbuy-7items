$(function () {
    // 动态渲染商品列表
    //定义页码值默认为1
    var pagenum = 1;
    //发送ajax渲染列表，渲染下拉框函数
    function init(){
        $.ajax({
            type: 'get',
            url: 'getmoneyctrl',
            data: { pageid: pagenum },
            dataType: 'json',
            success: function (result) {
                //渲染列表模板
                var html = template('goodsListTemp', result);
                $('.productlist').html(html);
                console.log(result);
                var pagecount=Math.ceil(result.totalCount/result.pagesize);
                console.log(pagecount);//15
                //通过构造函数创建数组。设定数组的长度
                var arr=new Array(pagecount);
                for(i=0;i<arr.length;i++){
                    arr[i]=pagecount;
                }
                // 渲染下拉框模板
                var optionHtml=template('optionTemp',{list:arr});
                $('.pageoption').html(optionHtml);

                
            }
        })
    }
    init();
      //发送ajax只渲染渲染列表
      function initOnlyGoods(){
        $.ajax({
            type: 'get',
            url: 'getmoneyctrl',
            data: { pageid: pagenum },
            dataType: 'json',
            success: function (result) {
                //渲染列表模板
                var html = template('goodsListTemp', result);
                $('.productlist').html(html); 
            }
        })
    }
    // 分页功能
    // 1注册点击事件，每次点击，获取当前的页码id.
    // 2点击前一页，当前的页码id-1，点击下一页，当前的页码id+1
    // 3 将新的页码id传给后台，发起ajax请求
    $('.pre').on('tap', function () {
        pagenum--;
        console.log (pagenum);
        if (!pagenum) {
            //重置为1
            pagenum=1;
            return;
        } else {
            // 排他事件
            for (var i=0;i<$('option').length;i++){
                $('option')[i].removeAttribute('selected');
            }
            $('option')[pagenum-1].setAttribute('selected','selected');           
            initOnlyGoods();
        }

    })
    $('.next').on('tap',function(){
        pagenum++;
        console.log (pagenum);
        if(pagenum<=$('option').length){
             // 排他事件
         for (var i=0;i<$('option').length;i++){
            $('option')[i].removeAttribute('selected');
        }
          // 获取接下来要跳转到的js对象option
          console.log( $('option')[pagenum-1]);
        //添加属性
        $('option')[pagenum-1].setAttribute('selected','selected');
        
        initOnlyGoods();
        }else {
            pagenum=$('option').length;
            return;
        }
        
    })
    var optionsnum
    // 点击下拉框跳到相应的页面
    $('.pageoption').change(function(){
        
        // 获取到页码id
        optionsnum=$(this).val(); //option不是select的子元素，不能用children方法
        //赋值给pagenum
        pagenum=optionsnum;
        initOnlyGoods();

    })


})