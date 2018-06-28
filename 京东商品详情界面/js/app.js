/*
 1. 鼠标移入显示,移出隐藏
 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 3. 输入搜索关键字, 列表显示匹配的结果
 4. 点击显示或者隐藏更多的分享图标
 5. 鼠标移入移出切换地址的显示隐藏
 6. 点击切换地址tab

 7. 鼠标移入移出切换显示迷你购物车
 8. 点击切换产品选项 (商品详情等显示出来)

 9. 点击向右/左, 移动当前展示商品的小图片
 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */

/*
1.对哪些元素绑定什么监听？
2.对哪些元素进行什么DOM操作？
*/
$(function(){
	showhide();
	hoverSubMenu();
	search();
	share();
	address();
	clickTabs();
	hoverMiniCart();
	clickProductTabs();
	moveMiniImg();
	hoverMiniImg();
	bigImg();

	/*
	11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
	*/
	function bigImg(){
		var $mediumImg = $('#mediumImg');//中图
		var $mask = $('#mask');//小黄块
		var $maskTop = $('#maskTop');//hover事件发生的容器范围
		var $largeImgContainer = $('#largeImgContainer');//大图容器
		var $loading = $('#loading');//加载中图片
		var $largeImg = $('#largeImg');//大图
		var maskWidth = $mask.width();//黄块的宽
		var maskHeight = $mask.height();//黄块的高
		var maskTopWidth = $maskTop.width();//图片宽
		var maskTopHeight = $maskTop.height();//图片高

		$maskTop.hover(function() {//移入
			//显示小黄块
			$mask.show();

			//动态加载对应的大图
			var src = $mediumImg.attr('src').replace('-m', '-l');
			$largeImg.attr('src', src);

			//显示大图容器
			$largeImgContainer.show();
			//大图加载完成的监听
			$largeImg.on('load', function(){
				//得到大图的尺寸
				var largeWidth = $largeImg.width();
				var largeHeight	= $largeImg.height();

				//给大图容器设置尺寸
				$largeImgContainer.css({
					width:largeWidth/2,
					height:largeHeight/2
				})

				//显示大图
				$largeImg.show();
				//隐藏加载进度条
				$loading.hide();

				console.log($largeImg.width(), $largeImg.height());

				//鼠标移动的监听
				$maskTop.mousemove(function(event) {//在移动过程中被反复调用
					/*
					1.移动小黄块
					2.移动大图
					*/

					/*1.移动小黄块*/
					//计算出小黄块的left和top
					var left = 0;
					var top = 0;
					//事件的坐标
					var eventLeft = event.offsetX;
					var eventTop = event.offsetY;
					left = eventLeft - maskWidth/2;
					top = eventTop - maskHeight/2;

					//left在[0, maskTopWidth-maskWidth]
					if(left < 0){
						left = 0;
					}else if(left > maskTopWidth-maskWidth){
						left = maskTopWidth-maskWidth;
					}
					//top在[0, maskTopHeight-maskHeight]
					if(top < 0){
						top = 0;
					}else if(top > maskTopHeight-maskHeight){
						top = maskTopHeight-maskHeight;
					}

					//给小黄块重新定位
					$mask.css({left:left,top:top});

					/*2.移动大图*/
					//得到大图的坐标
					left = -left * largeWidth / maskTopWidth;
					top = -top * largeHeight / maskTopHeight;
					//设置大图的坐标
					$largeImg.css({left:left, top:top});
				});
			})
		}, function() {//移出
			//隐藏小黄块
			$mask.hide();
			//隐藏大图容器
			$largeImgContainer.hide();
			//隐藏大图
			$largeImg.hide();
		});
	}

	/*
	10. 当鼠标悬停在某个小图上,在上方显示对应的中图
	*/
	function hoverMiniImg(){
		$('#icon_list>li').hover(function() {
			var $img = $(this).children();
			$img.addClass('hoveredThumb');
			//显示对应的中图
			var src = $img.attr('src').replace('.jpg', '-m.jpg');
			$('#mediumImg').attr('src', src);
		}, function() {
			$(this).children().removeClass('hoveredThumb');
		});
	}

	/*
	9. 点击向右/左, 移动当前展示商品的小图片
	*/
	function moveMiniImg(){
		var $as = $('#preview>h1>a');
		var $backward = $as.first();
		var $forward = $as.last();
		var $ul = $('#icon_list');
		var SHOW_COUNT = 5;//一次能看见5张小图
		var imgCount = $ul.children('li').length;//总图片数
		var moveCount = 0;//移动的次数（点右箭头为正、左负）
		var liWidth = $ul.children(':first').width();//每次移动的宽度

		//初始化更新
		if(imgCount>SHOW_COUNT){
			$forward.attr('class', 'forward');
		}

		//给向右的按钮绑定点击监听
		$forward.click(function() {
			//判断是否需要移动，如果不需要直接结束
			if(moveCount===imgCount-SHOW_COUNT){
				return;
			}

			moveCount++;

			//更新向左的按钮
			$backward.attr('class', 'backward');

			//更新向右的按钮
			if(moveCount===imgCount-SHOW_COUNT){
				$forward.attr('class', 'forward_disabled');
			}

			//移动ul
			$ul.css({left:-moveCount * liWidth})
		});

		//给向左的按钮绑定点击监听
		$backward.click(function() {
			//判断是否需要移动，如果不需要直接结束
			if(moveCount===0){
				return;
			}

			moveCount--;

			//更新向右的按钮
			$forward.attr('class', 'forward');

			//更新向左的按钮
			if(moveCount===0){
				$backward.attr('class', 'backward_disabled');
			}

			//移动ul
			$ul.css({left:-moveCount * liWidth})
		});
	}

	/*
	8. 点击切换产品选项 (商品详情等显示出来)
	*/
	function clickProductTabs(){
		var $lis = $('#product_detail>ul>li');
		var $contents = $('#product_detail>div:gt(0)');
		
		$lis.click(function() {
			$lis.removeClass('current');
			this.className = 'current';
			var index = $(this).index();

			//隐藏所有的$contents
			$contents.hide();
			//显示当前对应的content
			$contents.eq(index).show();
		});
	}

	/*
	7. 鼠标移入移出切换显示迷你购物车
	*/
	function hoverMiniCart(){
		$('#minicart').hover(function() {
			this.className = 'minicart';
			$(this).children(':last').show();
		}, function() {
			this.className = '';
			$(this).children(':last').hide();
		});
	}

	/*
	6. 点击切换地址tab
	*/
	function clickTabs(){
		$('#store_tabs>li').click(function() {
			$('#store_tabs>li').removeClass('hover');
			$(this).addClass('hover');
		});
	}

	/*
	5. 鼠标移入移出切换地址的显示隐藏
	*/
	function address(){
		$select = $('#store_select');
		$select.hover(function() {
				$(this).children(':gt(0)').show();
			}, function() {
				$(this).children(':gt(0)').hide();
			})
			.children(':last')
			.click(function() {
				$select.children(':gt(0)').hide();
			});
	}

	/*
	4. 点击显示或者隐藏更多的分享图标
	*/
	function share(){
		var isOpen = false;//标识当前的状态（初始为关闭）
		var $shareMore = $('#shareMore');
		var $parent = $shareMore.parent();
		var $as = $shareMore.prevAll('a:lt(2)');
		var $b = $shareMore.children();

		$shareMore.click(function() {
			if(isOpen){//打开状态，去关闭
				$parent.css('width', 155);
				$as.hide();
				$b.removeClass('backword');
			}else{//关闭状态，去打开
				$parent.css('width', 200);
				$as.show();
				$b.addClass('backword');
			}
			isOpen = !isOpen;
		});
	}

	/*
	3. 输入搜索关键字, 列表显示匹配的结果
	*/
	function search(){
		$('#txtSearch')
			.on('focus keyup', function() {
				//如果输入框有文本才显示列表
				var txt = this.value.trim();
				if(txt){
					$('#search_helper').show();
				}
			})
			.blur(function() {
				//隐藏列表
				$('#search_helper').hide();
			});
	}

	/*
	2. 鼠标移动切换二级导航菜单的切换显示和隐藏
	*/
	function hoverSubMenu(){
		$('#category_items>div').hover(function() {
			$(this).children(':last').show();
		}, function() {
			$(this).children(':last').hide();
		});
	}

	/*
	1. 鼠标移入显示,移出隐藏
	 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
	 */
	function showhide(){
		$('[name=show_hide]').hover(function() {//显示
			var id = this.id + '_items';
			$('#'+id).show();
		}, function() {//隐藏
			var id = this.id + '_items';
			$('#'+id).hide();
		});
	}
})