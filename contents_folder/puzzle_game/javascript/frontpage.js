/**
 * Created by hmmoshang on 16/11/8.
 */
$(function () {
    $(".activity").click(function () {
        $(".mask_black").show();
        $(".rule-box").show();
    });
    $(".mask_black").click(function () {
        $(".mask_black").hide();
        $(".rule-box").hide();
        $(".rank_list").hide();
    });
    $(".start").click(function () {
        $(".vision1").css("animation-name","rotate1,rotate4");
        $(".vision1").css("animation-duration","1s,2s");
        $(".vision1").css("animation-iteration-count","3,1");
        $(".vision1").css("animation-delay","0s,3s");
        $(".vision2").css("animation","rotate2 1s 3");
        $(".vision3").css("animation","rotate3 1s 3");

        if($(".text").text() == "0"){

            setTimeout(function () {
                    $(".vision").hide();
                    $(".start").hide();
                    $(".modal_block").show();
                    $(".refer_ranklist").show();

                },5000)
        }

    });
    $(".share_friends").click(function () {

        $(".share").show();
    });
    $(".share").click(function () {
        $(".share").hide();
    });
    $(".refer_ranklist").click(function () {
        $(".mask-black").show();
        $(".rank_list").show();
        $("html,body").addClass("stop_hua");
    });
    $(".close_button").click(function () {
        $(".mask-black").hide();
        $(".rank_list").hide();
        $("html,body").removeClass("stop_hua");

    })



});