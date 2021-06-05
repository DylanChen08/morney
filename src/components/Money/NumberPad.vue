<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent" v-animate-css.click=animation>1</button>
      <button @click="inputContent" v-animate-css.click=animation>2</button>
      <button @click="inputContent" v-animate-css.click=animation>3</button>
      <button @click="remove" v-animate-css.click=animation>删除</button>
      <button @click="inputContent" v-animate-css.click=animation>4</button>
      <button @click="inputContent" v-animate-css.click=animation>5</button>
      <button @click="inputContent" v-animate-css.click=animation>6</button>
      <button @click="clear" v-animate-css.click=animation>清空</button>
      <button @click="inputContent" v-animate-css.click=animation>7</button>
      <button @click="inputContent" v-animate-css.click=animation>8</button>
      <button @click="inputContent" v-animate-css.click=animation>9</button>
      <button class="ok" @click="ok" v-animate-css.click=animation>OK</button>
      <button class="zero" @click="inputContent" v-animate-css.click=animation>0</button>
      <button @click="inputContent" v-animate-css.click=animation>.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  // output: string = '0';
  animation: string = 'bounceIn'
  @Prop() readonly value!: number
  output = this.value.toString()  // @Prop()不写类型，故需要做toString转换

  inputContent(event: { target: { textContent: any; }; }) {// 参数也需要指定类型
    console.log(`Type of this.output **${typeof this.output}**`);
    console.log(`---按键[${event.target.textContent}]触发---`);
    const button = event.target
    const input = button.textContent as string
    // console.log(`---当前数组长度[${this.output.length}]---`);
    if (this.output.length === 13) {
      alert('最多13位!')
      return;
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input
      } else {
        this.output += input
      }
      return;
    }
    if (this.output.indexOf('.') > 0) {
      if (input === '.') {
        console.log(11111)
        return;
      }
    }
    this.output += input

  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0'
    } else {
      this.output = this.output.slice(0, -1)
    }
  }

  clear() {
    this.output = '0'
  }

  ok() {
    this.$emit('update:value', this.output)
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }

  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 25*2%;
      }

      $bg: #f3f3f3; //键盘渐变色
      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4*3%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }

      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }

      &:nth-child(12) {
        background: darken($bg, 4*6%);
      }
    }
  }
}
</style>