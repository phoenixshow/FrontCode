<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-html="msg1" :id="id"></div>
    <div>
      {{number+1}}
    </div>
    <p v-if="seen">试试就试试！！！</p>
    <p v-else>大哥你赢了！</p>
    <div v-n="4"></div>
    <div :class="[a1,a2]">
      我借你{{money}}，你还我{{h}}，还剩{{s}}
    </div>
    <div :class="{'test-1':a3}">
      style object
    </div>
    <div :class="obj"></div>
    <ul>
      <li v-for="item in list" :key="item">
        {{item}}
      </li>
    </ul>
    <ul>
      <template v-for="item in list">
        <!-- 两个li不能使用同一个key，否则无法确定索引是不是唯一的 -->
        <li :key="item+1">hello</li>
        <li :key="item">{{item}}</li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      msg1:'<span style="color:red;">再瞅一个试试~</span>',
      id:'txt',
      number:1,
      seen: true,
      money: 1000,
      h: 10,
      a1: 'test-1',
      a2: 'test-2',
      a3: true,
      obj: {
        'test-1':true
      },
      list: ['a','b','c','d']
    }
  },
  computed: {
    s: function(){
      return this.money - this.h;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
