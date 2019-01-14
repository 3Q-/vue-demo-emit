<template>
  <div class="">
      <div class="">这是子组建child2</div>
  </div>
</template>

<script>
  import bus from './bus';
export default {
  name: 'chil2',

  data(){
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  created(){

  },
  mounted(){
    bus.$on('busdemo', function(str){
      console.log('child2', str);
    });
  },
  methods: {

  }
};
</script>
