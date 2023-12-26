var CheckName = function () {
    var nreg = /^[\u4E00-\u9FA5A-Za-z0-9_]{3,9}$/
    if ($name.val() == "") {
        $name.removeClass("is-valid").addClass("is-invalid");
        $("#name-invalid").text("请输入昵称");
    }
    else if (!nreg.test($name.val())) {
        $name.removeClass("is-valid").addClass("is-invalid");
        $("#name-invalid").text("昵称为3到9位的汉字数字字母或下划线");
    }
    else {
        $name.removeClass("is-invalid").addClass("is-valid");
    }
}
var CheckEmail = function () {
    var rega = /^(.+)@(.+)\.(com|net|org|cn)$/;
    if ($email.val() == "") {
        $email.removeClass("is-valid").addClass("is-invalid");
        $("#email-invalid").text("请输入邮箱");
    }
    else if (!rega.test($email.val())) {
        $email.removeClass("is-valid").addClass("is-invalid");
        $("#email-invalid").text("请注意邮箱格式");
    }
    else {
        $email.removeClass("is-invalid").addClass("is-valid");
    }
}
var CheckPassword = function (regp) {
    if (regp.test($password.val())) {
        $password.removeClass("is-invalid").addClass("is-valid");
    }
    else if ($password.val() == "") {
        $password.removeClass("is-valid").addClass("is-invalid");
        $("#password-invalid").text("请输入密码");
    }
    else {
        $password.removeClass("is-valid").addClass("is-invalid");
        $("#password-invalid").text("密码至少为6位包含字母数字");
    }
}

var CheckrePassword = function () {
    if ($repassword.val() == "") {
        $repassword.removeClass("is-valid").addClass("is-invalid");
        $("#repassword-invalid").text("请再次输入密码");
    }
    else if ($repassword.val() != $password.val()) {
        $repassword.removeClass("is-valid").addClass("is-invalid");
        $("#repassword-invalid").text("密码不匹配");
        $("#registerButton").addClass("disabled")
    }
    else {
        $repassword.removeClass("is-invalid").addClass("is-valid");
        $("#registerButton").removeClass("disabled")
    }
}
