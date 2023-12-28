var $name = $("#name")
var $email = $("#useremail")
var $password = $("#passwd")
var $repassword = $("#repasswd")

$name.on("input", () => CheckName())
$name.on("focus", () => $name.removeClass("is-invalid"))
$email.on("input", () => CheckEmail())
$email.on("focus", () => $email.removeClass("is-invalid"))
var regp = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
$password.on("input", () => CheckPassword(regp));
$password.on("focus", () => $password.removeClass("is-invalid"))
$repassword.on("input", () => CheckrePassword());
$repassword.on("focus", () => $repassword.removeClass("is-invalid"))


// 绑定登录按钮的点击事件
$("#registerButton").on("click",function (e) {
    e.preventDefault();
    var form = $(".needs-validation");
    if (form[0].checkValidity() == false) {
        //form.addClass("was-validated");
        e.preventDefault();
        e.stopPropagation();
        //为不符合要求的input加入is-invalid类
        CheckName()
        CheckEmail()
        CheckPassword(regp)
        CheckrePassword()
        return;
    }
    // 获取邮箱和密码的输入值
    var email = $("#useremail").val();
    var password = $("#passwd").val();
    var name = $("#name").val();
    var repassword = $("#repasswd").val();
    // 发送 ajax 请求到后端控制器
    $("#registerButton").text("  注册中...").prepend("<span id='loadding' class='spinner-border spinner-border-sm fs-3' role='status' aria-hidden='true'></span>").addClass("disabled");
    $("#loadding").css("display", "inline-block").css("opacity", "1").removeClass("d-none opacity-0");;
    $.ajax({
        url: "http://localhost:2685/user/register", // 请求地址
        type: "POST", // 请求方式
        data: JSON.stringify({ email: email, password: password, name: name, repassword: repassword }), // 请求数据
        contentType: "application/json",
        headers: {
            "Accept": "application/json"
        },
        xhrFields: {
            withCredentials: true
        },
        timeout: 5000,
        success: function (data) { // 请求成功的回调函数
            if (data.success) {
                $("#registerButton").text("注册成功")
                $("#registerButton").removeClass("btn-primary").addClass("btn-success");
                setTimeout(() => {
                    window.location.href = "/auth/login"
                }, 1500);
            }
            else {
                $("#registerButton").removeClass("btn-primary").addClass("btn-danger")
                $("#registerButton").text("注册失败 " + data.message)
                setTimeout(() => {
                    $("#registerButton").removeClass("disabled").removeClass("btn-danger").addClass("btn-primary")
                    $("#registerButton").text("注册")
                }, 3500);



            }
        },
        error: function () { // 请求失败的回调函数
            // 显示通用错误信息
            $("#registerButton").removeClass("btn-primary").addClass("btn-danger")
            $("#registerButton").text("未知错误，检查网络连接?");
            setTimeout(() => {
                $("#registerButton").removeClass("disabled").removeClass("btn-danger").addClass("btn-primary")
                $("#registerButton").text("注册")
            }, 3500);
            //grecaptcha.reset($("#robot"))

        }
    })
});
