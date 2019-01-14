<template>
  <div class="hello">
    <div class="">这是子组建child</div>
    <div @click="sendValueTofather">{{xiexie}}</div>
  </div>
</template>

<script>
  import bus from './bus';
export default {
  name: 'child',
  props: {
    xiexie: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  beforeCreated(){},
  created(){
    // 页面没有渲染 getData
  },
  beforeMounted(){},
  mounted(){
    // 页面渲染完成完成
    bus.$on('busdemo', function(str){
      console.log('child', str);
    });
  },
  methods: {
    sendValueTofather(){
      var demo = this.xiexie + 1;
      // this.xiexie++;
      this.$emit('sendValueTofather', demo);
      bus.$emit('child_delAction');
    }
  },
  watch: {
    xiexie(currentVal, oldVal){
      console.log(currentVal, oldVal);
    }

  }
};
</script>
<style></style>
