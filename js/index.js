let init = () => {
    banner()
    getPop()
    getHome()
    getLove()
    getHot()
    getFirst()
    getRanking()
}






// 轮播图

let banner = async() => {
    let res = await myAjax({ url: "http://www.ujiuye.tech:3000/api/banner" })
    let html = template('bannerTemp', { res })
    $(".slider_banner").html(html);
    move()
}

// 人气好货

let getPop = async() => {
    let res = await myAjax({ url: "http://www.ujiuye.tech:3000/api/popularity" });
    let html = template('popTemp', { res })
    $(".ranking_list_content_right ul").html(html)
}

// 底部各大板块
let getHome = async() => {
        let res = await myAjax({ url: "http://www.ujiuye.tech:3000/api/home" })
        let html = template("homeTemp", { res });
        $("#home").html(html)
    }
    // c猜你喜欢
let getLove = async() => {
    let res = await myAjax({ url: "http://www.ujiuye.tech:3000/api/love" })
    let html = template("loveTemp", { res });
    $("#love").html(html)
}

// 热词搜索
let getHot = async() => {

    let res = await myAjax({ url: "http://www.ujiuye.tech:3000/api/hot" })
    let html = template("hotTemp", { res });
    $("#hot").html(html)

}

// 全部商品分类
let getFirst = async() => {
    let res = await myAjax({ url: "http://www.ujiuye.tech:3000/api/category/first" })
    let html = template("firstTemp", { res });
    $("#first").html(html)
}


// 排行榜
let getRanking = async() => {
    let res = await myAjax({ url: "http://www.ujiuye.tech:3000/api/ranking" })
    let html = template("rankingTemp", { res });
    let html2 = template("rankingConTemp", { res });
    $("#ranking_tit").html(html)
    $("#ranking_Con").html(html2);

    tab('#ranking_tit li', '#ranking_Con ul');
}


//轮播图

let move = () => {
    var box = $('.slider_wrap');
    var ul = box.find('.slider_banner');
    var li = ul.find('li');
    var leftBtn = box.find('.arrow_left');
    var rightBtn = box.find('.arrow_right');
    var span = box.find('.slider_nav li');
    var slider_cont = document.querySelector('.slider_cont')
        // li.eq(0).clone().appendTo(ul); // 第一张图复制一份添加到ul中
    var imgW = li.width(); // 一张图的宽度
    ul.css({
        'width': imgW * (li.length),
        'margin-left': slider_cont.offsetLeft + 190
    }); // 给ul设置宽度
    var count = 0;
    var timer = null
    timer = setInterval(auto, 2000); // 一打开就执行
    // 滑上停止，滑离开启
    box.hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(auto, 2000);
    });

    // 上一张
    leftBtn.click(function() {
        count--;
        if (count < 0) {
            count = li.length - 1;
            // ul.css('left', -count * imgW);
        }
        change();
    });

    // 下一张
    rightBtn.click(function() {
        auto();
    });

    // 滑上分页
    span.hover(function() {
        count = $(this).index();
        change();
    });

    function auto() {
        count++;
        if (count >= li.length) {
            count = 0;
            // ul.css('left', 0);
        }

        change();
    }

    function change() {
        ul.stop().animate({
            left: -count * imgW
        });
        if (count >= li.length) {
            span.eq(0).addClass('active').siblings().removeClass('active');
        } else {
            span.eq(count).addClass('active').siblings().removeClass('active');
        }
    }
}
init()