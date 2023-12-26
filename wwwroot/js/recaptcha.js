var recaptchaCallback = "";

var onloadCallback = function () {
    grecaptcha.render('robot', {
        'sitekey': '6Lfkn_0nAAAAAGzJZBGS7HE4ZwDwXlEk9UISd0vS', //公钥
        'theme': 'light', //主题颜色，有light与dark两个值可选
        'size': 'normal',//尺寸规则，有normal与compact两个值可选
        'callback': RecaptchaCallback, //验证成功回调
        'expired-callback': expiredCallback, //验证过期回调
        'error-callback': errorCallback //验证错误回调
    });
}
var RecaptchaCallback = function (response) {
    recaptchaCallback =  response;
}
// expiredCallback:验证过期回调
var expiredCallback = function () {

}
var errorCallback = function () {

}
//验证成功回调

// Path: wwwroot\js\register_capcha.js