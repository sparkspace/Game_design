// JavaScript Document

//倒计时

function getCode(val) {
    var countdown = 30;
    var val = val;
    var mobile = $("#phone-number").val();
    if (checkMobile(mobile)) {
        var yzm = MathRand();//验证码
        var phone = $("#phone-number").val();

        $.ajax({
            url: '/Game/Fuweng/sendCode',
            type: "POST",
            dataType: 'json',
            data: {
                phone: phone,
                sms_id: 351,
                code: yzm
            },
            success: function (data) {
                ;
                console.log(data);
                console.log(typeof(data));

                var aa = data;
                if (data.status == 200) {
                    $("#getyzm").next().empty().append(data.message).show();
                } else if (data.status == 203) {
                    $("#getyzm").next().empty().append(data.message).show();
                } else {
                    $("#getyzm").next().empty().append(data.message).show();
                }
            },
            error: function (data) {

                console.log(data);
                console.log(typeof(data));
                if (data.status == 200) {
                    $("#getyzm").next().empty().append(data.message).show();
                } else if (data.status == 203) {
                    $("#getyzm").next().empty().append(data.message).show();
                } else {
                    $("#getyzm").next().empty().append(data.message).show();
                }

            }
        })
        settime(countdown, val);//倒计时
    }
}
//30s倒计时
function settime(countdown, val) {
    if (countdown == 0) {
        $(".reg_btn_mask").hide();
        $("#reg_btn_getcode").removeClass("reg_btn_gray");
        $(val).html("获取验证码");
        countdown = 30;
        MathRand();
        return false;
    } else {
        $(".reg_btn_mask").show();
        $("#reg_btn_getcode").addClass("reg_btn_gray");
        $(val).html("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function () {
        settime(countdown, val)
    }, 1000)
}

function validateForm() {
    if (check_Verification_Code()) {
        with (document.getElementById("regForm")) {
            method = "post";
            action = "Wwwww";
            submit();
        }
    }
}
//手机号码的验证
function checkMobile(mobile) {
    var phoneReg = /^1[35847][0-9][0-9]{8}$/;
    if (!phoneReg.test(mobile)) {
        $(".reg_tips_phone").text('*请确认输入的是手机号').show();
        return false;
    }
    else {
        $(".reg_tips_phone").text('').hide();
        return true;
    }
}
//验证码生成
function MathRand() {
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    document.getElementById("code_random").innerText = Num;
    return Num;
}


//手机验证码验证
function check_Verification_Code() {



    if ($("#phone-number").val() == "") {
        $(".reg_tips_code").text('*手机号不能为空').show();
        return false;
    }
    else{
        $(".reg_tips_code").text('').show();
        return true;
    }

    if(checkMobile( $("#phone-number").val())){
        $(".reg_tips_code").text('*请输入正确的手机号').show();

    }
    else{
        $(".reg_tips_code").text('').show();


    }




}
function check_Verification_Number() {
    if ($("#reg_vercode").val() == "") {
        $(".reg_tips_number").text('*验证码不能为空').show();
        return false;
    }
    else{
        $(".reg_tips_number").text('').show();
        return true;
    }
}