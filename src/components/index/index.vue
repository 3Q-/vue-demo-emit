<template>
  <div class="hello">

    <child-first :xiexie="father1" @sendValueTofather="sendValueTofather"></child-first>
    <child-second></child-second>
    <div class="" @click='busdemo'>busdemo</div>

    <div class="widget_custom_content widget_clok">
      <div class="fill">
        <div class="reference"></div>
        <div class="clock" id="utility-clock">
          <div class="centre">
            <div class="dynamic" ref="dynamic"></div>
            <div class="expand round circle-1"></div>
            <div class="anchor hour" ref="hour">
              <div class="element thin-hand"></div>
              <div class="element fat-hand"></div>
            </div>
            <div class="anchor minute" ref="minute">
              <div class="element thin-hand"></div>
              <div class="element fat-hand minute-hand"></div>
            </div>
            <div class="anchor second" ref="second">
              <div class="element second-hand"></div>
            </div>
            <div class="expand round circle-2"></div>
            <div class="expand round circle-3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import childFirst from './child';
import childSecond from './child2';
import bus from './bus';

var position = function(element, phase, r){
  var theta = phase * 2 * Math.PI;
  element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px';
  element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px';
};
var rotate = function(element, second){
  element.style.transform = element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)';
};

export default {
  name: 'HelloWorld',
  components: {
    childFirst,
    childSecond
  },
  data(){
    return {
      msg: 'Welcome to Your Vue.js App',
      father1: 1
    };
  },
  created(){

  },
  mounted(){
    this.utilityClock();
    bus.on('fresh');
  },
  methods: {
    busdemo(){
      bus.$emit('busdemo', 'busdemo');
    },
    changefather1(){
      this.father1++;
    },
    sendValueTofather(index){
      console.log('这里是子组件修改xiexie', index);
      this.father1 = index;
    },

    utilityClock(){
      var dynamic = this.$refs.dynamic;
      var hourElement = this.$refs.hour;
      var minuteElement = this.$refs.minute;
      var secondElement = this.$refs.second;
      var minute = function(n){
        return n % 5 === 0 ? minuteText(n) : minuteLine(n);
      };
      var minuteText = function(n){
        var element = document.createElement('div');
        element.className = 'minute-text';
        element.innerHTML = (n < 10 ? '0' : '') + n;
        position(element, n / 60, 135);
        dynamic.appendChild(element);
      };
      var minuteLine = function(n){
        var anchor = document.createElement('div');
        anchor.className = 'anchor';
        var element = document.createElement('div');
        element.className = 'element minute-line';
        rotate(anchor, n);
        anchor.appendChild(element);
        dynamic.appendChild(anchor);
      };
      var hour = function(n){
        var element = document.createElement('div');
        element.className = 'hour-text hour-' + n;
        element.innerHTML = n;
        position(element, n / 12, 105);
        dynamic.appendChild(element);
      };

      var animate = function(){
        var now = new Date();
        var time = now.getHours() * 3600 +
                             now.getMinutes() * 60 +
                             now.getSeconds() * 1 +
                             now.getMilliseconds() / 1000;
        rotate(secondElement, time);
        rotate(minuteElement, time / 60);
        rotate(hourElement, time / 60 / 12);
        requestAnimationFrame(animate);
      };
      let i = 1;
      for (i = 1; i <= 60; i++) minute(i);
      for (i = 1; i <= 12; i++) hour(i);
      animate();
    }
  }

};
</script>

<style>
.widget_custom_clock {position: relative;border:none;}
.widget_clok {position: relative;padding:10px 0;}
.widget_clok .fill {background-color: #fff;width:340px;height:340px;position: relative;border-radius: 50%;margin:0 auto;}
.widget_clok .clock {position: absolute;opacity: 1;width:100%;height:340px;}
.widget_clok .fill .clock {left: 0;top: 0;height:340px;}
.widget_clok .centre {position: absolute;top: 50%;left: 50%;width: 0;height: 0;}
.widget_clok .expand {position: absolute;top: 0;left: 0;transform: translate(-50%, -50%);}
.widget_clok .anchor {position: absolute;top: 0;left: 0;width: 0;height: 0;}
.widget_clok .element {position: absolute;top: 0;left: 0;}
.widget_clok .round { border-radius: 296px; }
.widget_clok .circle-1 {background: #2e3c49;width: 12px;height: 12px;}
.widget_clok .circle-2 {background: #FA9F22;width: 8px;height: 8px;}
.widget_clok .circle-3 {background: black;width: 4px;height: 4px;}
.widget_clok .second {transform: rotate(180deg);}
.widget_clok .minute {transform: rotate(54deg);}
.widget_clok .second-hand {width: 2px;height: 164px;background: #FA9F22;transform: translate(-50%,-100%) translateY(24px);}
.widget_clok .hour {transform: rotate(304.5deg);}
.widget_clok .thin-hand {width: 4px;height: 50px;background: #293642;transform: translate(-50%,-100%);}
.widget_clok .fat-hand {width: 10px;height: 57px;border-radius: 10px;background: #293642;transform: translate(-50%,-100%) translateY(-18px);}
.widget_clok .minute-hand {height: 112px;}
.widget_clok .hour-text {position: absolute;font: 40px Hei, Helvetica, Arial, sans-serif;color: #293642;transform: translate(-50%,-50%);}
.widget_clok .hour-10 {padding-left: 0.4ex;}
.widget_clok .hour-11 {padding-left: 0.25ex;}
.widget_clok .minute-text {position: absolute;font: 12px Avenir Next, Helvetica, Arial, sans-serif;color: #293642;transform: translate(-50%,-50%);}
.widget_clok .minute-line {background: #293642;width: 1px;height: 9px;transform: translate(-50%,-100%) translateY(-131px);opacity: 0.34;}
</style>
