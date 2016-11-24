/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/6/14>
 // +--------------------------------------------------------------------------*/
// JavaScript Document
$(function () {

//---------------------提示信息动态插入------------------
    function regTipsInsert(box, tips) {
        $(".reg_tips").remove();
        $(".reg_tips_new").eq(0).clone(true).text(tips).addClass("reg_tips").removeClass("reg_tips_new")
            .insertAfter(box).show();
    }

    var openid = $(".openid").text();


//验证手机号是否正确
    function check_code_phone(phone, code) {
        var pass = 0;
        var md5_code = 0;
        var appid = 0;
        //获取appid
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: "/mobile_api.php/Key/getappid",
            async: false,
            data: {
                key: "jyzx"
            },
            success: function (data) {
                appid = data;
            },
            error: function () {
                console.log("error");
            }
        });
        console.log(appid);
        //获取md5
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: "/mobile_api.php/Key/getMD5API",
            async: false,
            data: {
                appid: appid,
                key: "jyzx"
            },
            success: function (data) {
                md5_code = data;

            },
            error: function () {

            }
        });
        console.log(md5_code);
        var send_data = {
            sms_tels: phone,
            sms_code: code,
            sms_time: 60//秒,默认为60秒，如有修改可以直接值参数值，单位为秒
        };
        console.log(send_data);
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: '/mobile_api.php/SmsApi/systemSmsSendCheckAPI',
            async: false,
            data: {
                md5_code: md5_code,
                key: "jyzx",
                data: send_data
            },
            success: function (data) {
                console.log(data);
                pass = data;

            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
        return pass;

    }

//确认手机号和验证码是否正确
//        $('.universal_register_form').delegate('.hide_btn_submit',"click",function(){
//            var mobile = $.trim($(".modal_phone_number:visible").val());
//            var vercode = $.trim($(".modal_vercode:visible").val());
//            if(vercode == ""){
//                $(".modal_tips_vercode").text('*验证码不能为空').show();
//                return false;
//            }
//        });
    //-----------------------30s倒计时------------------------
    function countDown(countdown) {
        if (countdown == 0) {
            $(".reg_btn_mask").hide();
            $(".reg_btn_getcode").removeClass("reg_btn_gray").html("获取验证码");
            countdown = 40;
            return false;
        } else {
            $(".reg_btn_mask").show();
            $(".reg_btn_getcode").addClass("reg_btn_gray").html("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function () {
            countDown(countdown)
        }, 1000)
    }


    //-------------------------获取验证码按钮点击----------------------
    $(".reg_box").delegate(".reg_btn_getcode", "click", function () {
        var md5_code = 0;
        var appid = 0;
        //获取appid

        var countdown = 40;
        var phone = $.trim($(".reg_phone_number").val());
        var code = $.trim($(".reg_vercode").val());
        var phone_status = regularExpression("phone_number", phone);

        if (phone == "") {
            regTipsInsert(".reg_phone_number", "手机号不能为空!");
            return false;
        } else if (!phone_status) {
            regTipsInsert(".reg_phone_number", "请输入正确的手机号!");
            return false;
        } else {
            $.ajax({
                dataType: 'json',
                type: 'POST',
                url: "/mobile_api.php/Key/getappid",
                async: false,
                data: {
                    key: "jyzx"
                },
                success: function (data) {
                    appid = data;
                },
                error: function () {
                    console.log("error");
                }
            });
            console.log(appid);
            //获取md5
            $.ajax({
                dataType: 'json',
                type: 'POST',
                url: "/mobile_api.php/Key/getMD5API",
                async: false,
                data: {
                    appid: appid,
                    key: "jyzx"
                },
                success: function (data) {
                    md5_code = data;

                },
                error: function () {

                }
            });
            var cpi = check_phone_init(phone, openid, md5_code, "jyzx");
            console.info(cpi);
            if (cpi.status == 200) {
                console.info(200);

                var code_status = checkCodePhone(phone, code, md5_code, "jyzx");

                if (code_status.status != 200) {
                    regTipsInsert(".reg_phone_number", code_status.message);
                    return false;
                } else {
                    $(".reg_tips").remove();
                    countDown(countdown);//倒计时
                }
            } else {
                console.info("!200");

                regTipsInsert(".reg_phone_number", cpi.message);
                return false;
            }


        }
    });


    //-----------------------------验证手机号是否正确-------------------------
    function checkCodePhone(phone, code, md5_code,key) {
        var pass = 0;

        var send_data = {
            sms_tels: [phone],
            sms_code: code,
            sms_time: 60//秒,默认为60秒，如有修改可以直接值参数值，单位为秒
        };
        console.log(send_data);
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: '/mobile_api.php/SmsApi/systemSmsSendCheckAPI',
            async: false,
            data: {
                md5_code: md5_code,
                key: key,
                data: send_data
            },
            success: function (data) {
                console.log(data);
                pass = data;

            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
        return pass;
    }

    // 查看输入的手机号是否绑定
    function check_phone_init(phone, openid, md5_code, key) {
        var data = {};
        var date = {};
        data['phone'] = phone;
        data['openid'] = openid;
        data['md5_code'] = md5_code;
        data['key'] = key;
        $.ajax({
            dataType: "json",
            url: "/mobile_api.php/SmsApi/checkPhoneInit",
            type: "POST",
            data: data,
            async: false
        }).done(function (data) {
            date = (data);
            console.info(data);

        }).fail(function (xhr, text, error) {
            console.info('fail');
            console.info(xhr.status);
            console.info(text);
            console.info(error);
        }).always(function () {
            console.info('finished check_phone_init');
        }).complete(function (res) {
        });
        //console.info(date);
        return date;

    }


    //-------------------------手机号被占用的会员注册弹出页面表单验证-----------------------
    $(".universal_register_form").delegate(".form_btn_submit", "click", function () {
        var form = $(this).parents(".universal_register_form");
        var name = form.find(".reg_user_name:visible").val();
        //var gender = form.find("input:radio[name='gender_radio']:checked").val();

        var gender = $("select.reg_gender_radio").val();
        //form.find(".reg_gender_fieldset:visible").find("select option:selected").text();
        var phone = form.find(".reg_phone_number:visible").val();
        var code = form.find(".reg_vercode:visible").val();
        var code_status = check_code_phone(phone, code);
        var phone_status = regularExpression("phone_number", phone);
        if (name == "") {
            regTipsInsert(".reg_user_name", "请输入姓名!");
            return false;
        } else if (gender == null) {
            regTipsInsert(".reg_gender_fieldset", "请选择性别!");
            return false;
        } else if (gender == 0) {
            regTipsInsert(".reg_gender_fieldset", "性别不能为未知!");
            return false;
        } else if (phone == "") {
            regTipsInsert(".reg_phone_number", "请输入手机号码!");
            return false;
        } else if (!phone_status) {
            regTipsInsert(".reg_phone_number", "请输入正确的手机号!");
            return false;
        } else if (code == "") {
            regTipsInsert(".reg_vercode", "请输入验证码!");
            return false;
        } else if (code_status == 0) {
            regTipsInsert(".reg_vercode", "验证码错误!");
            return false;
        } else {
            $(this).siblings(".hide_btn_submit").trigger("click");
        }
    });

    function initGender() {

        var gender = $(".gender_hidebox").text();
        $('select.reg_gender_radio').val(gender);

        var cn_name = $("select.reg_gender_radio").find("option:selected").text();
        $('span.reg_gender_radio').text(cn_name);

    }

    initGender();

    $(".btn_style").click(function () {
        var phone_number=$(".reg_phone_number").val();
        var user_name=$(".reg_user_name").val();
        var sex=$(".reg_gender_radio").val();
        console.log(phone_number);
        console.log(user_name);
        console.log(sex);
    });

});