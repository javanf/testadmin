<template>
  <div>
    <ul>
      <li v-for="(item, index) in list">
        <span>{{item.text}}</span><button @click.stop="play(item, index)">{{index===activeIndex?'暂停':'播放'}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data(){
    return {
      list: [{
        text: '随着前端开发越来越关注效率：通过选择器的使用和简化代码来快速加载渲染。'
      }, {
        text: 'css重置库如normalize.css已经被使用很多年了，'
      }, {
        text: '当你多少次试着去设计栅格布局如：组合或者图片画廊，'
      }],
      activeIndex: ''
    }
  },
  methods: {
    play(item, index) {
      if(this.activeIndex === index){
        this.cancel();
        return;
      }
      this.activeIndex = index;
      this.newSpeech(item.text);
    },
    cancel(){
      window.speechSynthesis.cancel();
    },
    newSpeech(text, type) {
      this.cancel();
      setTimeout(()=>{
        this.utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(this.utterance);
        this.utterance.onend = ()=>{
          this.activeIndex = '';
        }
      }, 500)
    }
  }
}
</script>
