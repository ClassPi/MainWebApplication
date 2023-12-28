var $email = $("#useremail");
var $password = $("#passwd");
var regp = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
$email.on("input", () => {
    $email.removeClass("is-invalid")
    CheckEmail()
});
$password.on("input", () => {
    $password.removeClass("is-invalid")
    CheckPassword(regp)
});

// 绑定登录按钮的点击事件
$("#loginButton").on("click",function (e) {
    var form = $(".needs-validation")
    form.removeClass("was-validated")
    if (form[0].checkValidity() == false) {
        //form.addClass("was-validated")
        e.preventDefault();
        e.stopPropagation();

        CheckEmail()
        CheckPassword(regp)
        return;
    }
    /*if (grecaptcha.getResponse().length == 0) {
        e.preventDefault();
        $("#loginButton").addClass("btn-danger").addClass("disabled")
        $("#loginButton").text("登录失败,请进行验证")
        setTimeout(() => {
            $("#loginButton").removeClass("disabled")
            $("#loginButton").removeClass("btn-danger").addClass("btn-primary")
            $("#loginButton").text("登录")
        }, 3500);
        return false;
    }*/
    e.preventDefault();
    // 获取邮箱和密码的输入值
    var email = $("#useremail").val();
    var password = $("#passwd").val();
    // 发送 ajax 请求到后端控制器
    $("#loginButton").text("  登录中...").prepend("<span id='loadding' class='spinner-border spinner-border-sm fs-3' role='status' aria-hidden='true'></span>").addClass("disabled");
    $("#loadding").css("display", "inline-block").css("opacity", "1").removeClass("d-none opacity-0");;
    $.ajax({
        url: "http://localhost:2685/user/login", // 请求地址
        type: "POST", // 请求方式
        data: JSON.stringify({ email: email, password: password, remember:true/*captcha_token: recaptchaCallback*/ }), // 请求数据
        contentType: "application/json",
        headers: {
            "Accept": "application/json"
        },
        timeout: 5000,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) { // 请求成功的回调函数
            if (data.success) {
                // 登录成功
                $("#loginButton").text("登录成功");
                $("#loginButton").removeClass("btn-primary").addClass("btn-success");
                setTimeout(() => {
                    $("#loginButton").removeClass("disabled")
                    window.location.href = "/auth/test"
                }, 1500);

                setTimeout(() => {
                    $("#loginButton").removeClass("disabled")
                }, 3500);
            }
            else {
                $("#loginButton").removeClass("btn-primary").addClass("btn-danger");
                $("#loginButton").text("登录失败" + data.message)
                setTimeout(() => {
                    $("#loginButton").removeClass("disabled")
                    $("#loginButton").removeClass("btn-danger").addClass("btn-primary");
                    $("#loginButton").text("登录")
                }, 3500);
                //grecaptcha.reset($("#robot"))
            }
        },
        error: function () { // 请求失败的回调函数
            // 显示通用错误信息
            $("#loginButton").removeClass("btn-primary").addClass("btn-danger");
            $("#loginButton").text("未知错误，检查网络连接?");
            setTimeout(() => {
                $("#loginButton").removeClass("disabled")
                $("#loginButton").removeClass("btn-danger").addClass("btn-primary");
                $("#loginButton").text("登录")
            }, 3500);
            //grecaptcha.reset($("#robot"))
        }


    })

});

