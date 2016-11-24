/**
 * Created by Yangyue on 2016/10/25.
 */

$(function(){

    //-------------点击任何地方蒙版消失-------------
    $(document).click(function(){
       $(".mask").fadeOut();
    });
    //-------------点击任何地方蒙版消失-------------

    //-------------点击分享按钮弹出分享朋友圈蒙版-------------
    $(".btn_share").click(function(e){
        e.stopPropagation();
        $(".mask_share").fadeIn();
    });
    //-------------点击分享按钮弹出分享朋友圈蒙版-------------

});