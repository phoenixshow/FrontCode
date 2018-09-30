<template>
	<li class="list-group-item">
		<a href="javascript:;" class="btn btn-primary btn-xs pull-right">删除</a>
		<p class="user">
			<em>{{comment.name}}</em><span>说：</span>
		</p>
		<p class="content">{{comment.content}}</p>
	</li>
</template>

<script>
	export default{
		props: {//指定属性名和属性值的类型
			comment: Object
		}
	}
</script>

<style>
	.user{
		font-size: 22px;
	}
	.user em{
		font-style: normal;
	}
	.content{
		padding: 0px 50px;
	}
</style>