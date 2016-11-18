
$(function () {
    //搜索栏的搜索AJAX
      $(".searchID").on("click",function (event) {
              event.preventDefault();
              /* Act on the event */
              $.ajax({
                  url: 'http://datainfo.duapp.com/shopdata/selectGoodes.php',
                  type: 'GET',  //'default GET (Other values: POST)',
                  dataType: 'jsonp', //'default: Intelligent Guess (Other values: xml, json, script, or html)',
                  data: {
                      selectText: encodeURI($(".search-content").val()),
                      pageCode: 0  ,
                      linenumber: 10
                  }
              }).done(function (data) {
                  if(data==0){
                      alert('暂无该商品');
                  }
                 else{
                      console.log(data);
                      $("#page6").empty();
                      for(var i=0;i<data.length;i++){
                          addGoods(data[i],$("#page6"));
                      }
                      window.location.href="#page6";
                  }
              }).fail(function () {
                  console.log("error");
              }).always(function () {
                  console.log("complete");
              });
          });
    // var goodsArr=[];
    //获取热推商品列表
    $.ajax({
        url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
        type: 'GET',  //'default GET (Other values: POST)',
        dataType: 'jsonp', //'default: Intelligent Guess (Other values: xml, json, script, or html)',
        // data: {
        //      pageCode:0
        // }
    }).done(function (data) {
        if(data==0){
            alert('暂无该商品');
        }
        else{
            console.log(data);
            for(var i=0;i<data.length;i++) {
                addGoods(data[i],$("#goods-container"));
            }
        }
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });
   // var Goods=$("#goods-container");
    //将AjAX中获取到的商品信息动态添加到goods内；
    function addGoods(goods,content) {
        var div=document.createElement("div");
       div.style.width="100%";
        div.style.height="100px";
        div.style.marginTop="10px";
        // div.style.backgroundColor="black";
        // console.log(goods[3]);
        div.style.backgroundPosition="10px 0px";
        div.style.backgroundRepeat="no-repeat";
        div.style.backgroundSize="auto 90%";
        div.style.backgroundImage="url("+goods[3]+")";
        div.onclick=function (e) {
            window.location.href="#page7";
            $("#page7-images").css("backgroundImage","url("+goods[3]+")");
            localStorage.setItem("goodsID",goods[0]);
            $("#page7-goodsId").text(goods[2]);
            console.log(localStorage.getItem("goodID"));
        }
        // div.style.backgroundImage=goods[6];
        var p1=document.createElement("p");
        p1.innerHTML=goods[2];
        p1.style.fontSize="12px";
        p1.style.marginLeft="30%";
        var p2=document.createElement("p");
        p2.innerHTML="$"+goods[4];
        p2.style.fontSize="20px";
        p2.style.color="red";
        p2.style.marginLeft="30%";
        var a1=document.createElement("a");
        a1.innerHTML=goods[5]+"折";
        a1.style.fontSize="16px";
        a1.style.color="red";
        a1.style.marginLeft="30%";
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(a1);
        content.append(div);
    }
    //获取商品类别列表
    $.ajax({
        url: 'http://datainfo.duapp.com/shopdata/getclass.php',
        type: 'GET',  //'default GET (Other values: POST)',
        dataType: 'json' //'default: Intelligent Guess (Other values: xml, json, script, or html)',
        // data: {
        //      pageCode:0
        // }
    }).done(function (data) {
        if(data==0){
            alert('暂无数据');
        }
        else {
            console.log(data);
            for(var i=0;i<data.length;i++){
                addMenu(data[i]);
            }

        }
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });
    var menu=document.getElementById("menu");
    console.log(menu);
    function addMenu(list) {
        var li=document.createElement("li");
        li.onclick=function (e) {
           $("#page6").empty();
            localStorage.setItem("search",list.className);
            window.location.href="#page6";
            $.ajax({
                url: 'http://datainfo.duapp.com/shopdata/selectGoodes.php',
                type: 'GET',  //'default GET (Other values: POST)',
                dataType: 'jsonp', //'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: {
                    selectText: encodeURI(localStorage.getItem("search")),
                    pageCode: 0  ,
                    linenumber: 10
                }
            }).done(function (data) {
                if(data==0){
                    alert('暂无该商品');
                }
                else{
                    console.log(data);
                    for(var i=0;i<data.length;i++){
                        addGoods(data[i],$("#page6"));
                    }
                }
            }).fail(function () {
                console.log("error");
            }).always(function () {
                console.log("complete");
            });
        };
        menu.appendChild(li);
        var a=document.createElement("a");
        a.innerHTML=list[1];
        a.className="ui-btn ui-btn-icon-right ui-icon-carat-r a1";
        li.appendChild(a);
        // a.addClass("ui-btn ui-btn-icon-right ui-icon-carat-r");
        // a.attr("class", "a1");
        

    }
    //page7 中设置加减数量,提交到购物车；
    $("#jia").on("click",function (e) {
       $("#number").text(parseInt($("#number").html())+1);
    });
    $("#shao").on("click",function (e) {
        $("#number").text(parseInt($("#number").html())-1);
    });
    $("#goShop").on("click",function (event) {
        event.preventDefault();
        /* Act on the event */
        $.ajax({
        url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
        type: 'GET',  //'default GET (Other values: POST)',
        //dataType: 'jsonp', //'default: Intelligent Guess (Other values: xml, json, script, or html)',
        data: {
            userID: localStorage.getItem("userID"),
            goodsID: localStorage.getItem("goodsID")  ,
            number: $("#number").html()
        }
    }).done(function (data) {
        if(data==0){
            alert('添加失败');
        }
        else{
            alert('添加成功');
        }
    }).fail(function () {
        console.log("error");
    }).always(function () {
        console.log("complete");
    });
});
    //获取购物车列表
    $("#shopCar").on("click",function (event) {

        /* Act on the event */
        window.location.href="#page3";
        $.ajax({
            url: 'http://datainfo.duapp.com/shopdata/getCar.php',
            type: 'GET',  //'default GET (Other values: POST)',
            dataType: 'jsonp', //'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {
                userID: localStorage.getItem("userID")
            }
        }).done(function (data) {
            if(data==0){
                $("#page3").empty();
                alert('购物车为空')  ;
            }
            else{
                $("#page3").empty();
                console.log(data);
                for(var i=0;i<data.length;i++) {
                    addShopCartContent(data[i]);
                }
            }
        }).fail(function () {
            console.log("error");
        }).always(function () {
            console.log("complete");
        });
    });

    //购物车div 添加函数
    function addShopCartContent(list) {
        var div=document.createElement("div");
        div.style.width="100%";
        div.style.height="100px";
        div.style.backgroundColor="lightgrey";
        div.style.marginTop="10px";
        var img=document.createElement("img");
        img.style.width="100px";
        img.style.height="80px";
       img.style.marginTop="10px";
        img.style.position="absolute";
        img.src=list[3];
        var p1=document.createElement("h4");
        p1.style.position="absolute";
        p1.style.marginLeft="120px";
        p1.style.marginTop="10px";
        p1.innerHTML=list[2];
        var p2=document.createElement("h2");
        p2.style.position="absolute";
        p2.style.marginLeft="120px";
        p2.style.marginTop="50px";
        p2.innerHTML=list[4]+"元";
        var p3=document.createElement("h4");
        p3.style.position="absolute";
        p3.style.marginLeft="220px";
        p3.style.marginTop="55px";
        p3.innerHTML="数量:"+list[6];
        var button=document.createElement("button");
        button.innerHTML="删除";
        //删除购物车某样商品函数
        button.onclick=function (e) {
            $.ajax({
                url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
                type: 'GET',  //'default GET (Other values: POST)',
                //dataType: 'jsonp', //'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: {
                    userID: localStorage.getItem("userID"),
                    goodsID: list[0] ,
                    number: 0
                }
            }).done(function (data) {
                if(data==0){
                    alert('删除失败');
                }
                else{
                    alert('删除成功,请刷新页面');

                }
            }).fail(function () {
                console.log("error");
            }).always(function () {
                console.log("complete");
            });
        }
        button.style.position="absolute";
        button.style.marginLeft="90%";
        button.style.marginTop="20%";
        div.appendChild(button);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(img);
        $("#page3").append(div);
    }
});

