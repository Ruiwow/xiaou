let init = () => {
    getFirst()

}

let fn = () => {
    $("#first").on("click", "li", cli);
}

let cli = function() {
    console.log(1);
}
fn()

// 一级接口
let getFirst = async() => {
    let res = await myAjax({ url: "http://www.ujiuye.tech:3000/api/category/first" });
    let html = template('firstTemp', { res })
    $("#first").html(html);

    // 一级标题点击改变二级标题
    firstBtnClick()
}


// 渲染二级标题
let getSecond = async function(id) {
    let res2 = await myAjax({ url: "http://www.ujiuye.tech:3000/api/category/second", data: { id } });
    let html2 = template('secondTemp', { res2 })
    $("#second").html(html2);
    secondBtnClick()
}

// 渲染三级级标题
let getThird = async function(id) {
    let res3 = await myAjax({ url: "http://www.ujiuye.tech:3000/api/category/third", data: { id } });
    let html3 = template('thirdTemp', { res3 })
    $("#third").html(html3)
    ThirdBtnClick()
}

let getGoods = async function(thirdid) {
    let res4 = await myAjax({ url: "http://www.ujiuye.tech:3000/api/category/goodslist", data: { thirdid } });
    let html4 = template('goodslistTemp', { res4 })
    $("#goodslist").html(html4)
}

// 点击一级标题二级标题改变
let firstBtnClick = function() {
    let firstBtn = $("#first li a");
    getSecond(firstBtn[0].id)
    $(firstBtn[0]).addClass('active');
    firstBtn.click(function() {
        let id = this.id;
        getSecond(id)
        firstBtn.removeClass('active');
        $(this).addClass('active');
    })
}

// 点击二级标题改变三级标题
let secondBtnClick = function() {
    let secondBtn = $("#second li a");
    $(secondBtn[0]).addClass('active');
    getThird(secondBtn[0].id)
    secondBtn.click(function() {
        let id = this.id;
        getThird(id)
        secondBtn.removeClass('active');
        $(this).addClass('active');
    })
}

// 点击三级标题该表图片
let ThirdBtnClick = function() {
    let thirdBtn = $("#third li a");
    $(thirdBtn[0]).addClass('active');
    getGoods(thirdBtn[0].id)
    thirdBtn.click(function() {
        let id = this.id;
        getGoods(id)
        thirdBtn.removeClass('active');
        $(this).addClass('active');
    })
}



init()