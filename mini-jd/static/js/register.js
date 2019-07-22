$(function(){
	//定义变量，决定最终是否能够提交表单
	var error_name = false;//默认没有错误
	var error_pwd = false;
	var error_cpwd = false;
	var error_email = false;
	var error_allow = false;//是否勾选了协议

	//失去焦点时，验证用户名
	$('#username').blur(function() {
		check_username();
	});

	//获取焦点时隐藏提示信息
	$('#username').focus(function() {
		$(this).prev().hide();
	});

	//密码
	$('#password1').blur(function() {
		check_pwd();
	});
	$('#password1').focus(function() {
		$(this).prev().hide();
	});

	//确认密码
	$('#password2').blur(function() {
		check_cpwd();
	});
	$('#password2').focus(function() {
		$(this).prev().hide();
	});

	//邮箱
	$('#email').blur(function() {
		check_email();
	});
	$('#email').focus(function() {
		$(this).prev().hide();
	});

	//协议
	$('#allow').click(function() {
		//
		if($(this).prop('checked')){
			error_allow = false;
			$('.error_tip2').hide();
		}else{
			error_allow = true;
			$('.error_tip2').show().html('请勾选同意！');
		}
	});

	function check_username(){
		var val = $('#username').val();
		var re = /^\w{4,16}$/;//匹配字母数字下划线4-16位

		if(val == ''){
			$('#username').prev().show().html('用户名不能为空！');
			error_name = true;
			return;
		}

		if(re.test(val)){//匹配上了就是正确的
			error_name = false;
		}else{
			$('#username').prev().show().html('用户名是包含字母数字下划线4-16位字符');
			error_name = true;
			return;
		}
	}

	function check_pwd(){
		var val = $('#password1').val();
		var re = /^[\w@\*\$]{6,18}$/;//允许字母数字下划线@*$6-18位

		if(val == ''){
			$('#password1').prev().show().html('密码不能为空！');
			error_pwd = true;
			return;
		}

		if(re.test(val)){//匹配上了就是正确的
			error_pwd = false;
		}else{
			$('#password1').prev().show().html('密码是包含字母数字下划线@*$6-18位');
			error_pwd = true;
			return;
		}
	}

	function check_cpwd(){
		var val = $('#password1').val();
		var cval = $('#password2').val();

		if(val == cval){//如果一致是正确的
			error_cpwd = false;
		}else{
			$('#password2').prev().show().html('两次输入的密码不一致！');
			error_cpwd = true;
			return;
		}
	}

	function check_email(){
		var val = $('#email').val();
		//a@b.com
		//123456@qq.com
		//zzz@163.com.cn
		var re = /^[a-zA-Z0-9][\w]*@[a-zA-Z0-9]+(\.[a-zA-Z]{2,3}){1,2}$/;

		if(val == ''){
			$('#email').prev().show().html('邮箱不能为空！');
			error_email = true;
			return;
		}

		if(re.test(val)){//匹配上了就是正确的
			error_email = false;
		}else{
			$('#email').prev().show().html('邮箱格式不正确');
			error_email = true;
			return;
		}
	}

	$('.form').submit(function() {
		check_username();
		check_pwd()
		check_cpwd();
		check_email();

		if(error_name || error_pwd || error_cpwd || error_email || error_allow){
			return false;//不能提交
		}else{
			$.ajax({
				url: 'users/add.html',
				type: 'POST',
				dataType: 'json',
				data: {
					username: $('#username').val(),
					password: $('#password1').val(),
					email: $('#email').val()
				},
			})
			.done(function(response) {
				console.log(response);
				if(response.code == 1){
					self.location = '/index.html';
				}else if(response.code == 2){
					$('#username').prev().show().html(response.msg);
					error_name = true;
				}
			})
			.fail(function(error) {
				console.log(error);
			});
			return false;//不能提交
		}
	});
})