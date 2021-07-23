<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <!--    <div class="buttons">-->
    <!--      <button v-animate-css.click=animation @click="inputContent">1</button>-->
    <!--      <button v-animate-css.click=animation @click="inputContent">2</button>-->
    <!--      <button v-animate-css.click=animation @click="inputContent">3</button>-->
    <!--      <button v-animate-css.click=animation @click="remove">-->
    <!--        <Icon name="delete"/>-->
    <!--      </button>-->
    <!--      <button v-animate-css.click=animation @click="inputContent">4</button>-->
    <!--      <button v-animate-css.click=animation @click="inputContent">5</button>-->
    <!--      <button v-animate-css.click=animation @click="inputContent">6</button>-->
    <!--      <button v-animate-css.click=animation @click="clear">-->
    <!--        <Icon name="clear"/>-->
    <!--      </button>-->
    <!--      <button v-animate-css.click=animation @click="inputContent">7</button>-->
    <!--      <button v-animate-css.click=animation @click="inputContent">8</button>-->
    <!--      <button v-animate-css.click=animation @click="inputContent">9</button>-->
    <!--      <button v-animate-css.click=animation @click="ok" class="ok">-->
    <!--        <Icon name="ok"/>-->
    <!--      </button>-->
    <!--      <button v-animate-css.click=animation @click="inputContent" class="zero">0</button>-->
    <!--      <button v-animate-css.click=animation @click="inputContent">.</button>-->
    <!--    </div>-->
    <van-number-keyboard
        :show="show"
        :title="keyboardTitle"
        theme="custom"
        extra-key="."
        close-button-text="✔"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
    />
    <div class="submit-button">
      <van-button @click="ok" type="info" text="提交"/>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Notify, Button} from 'vant';

Vue.use(Notify);
Vue.use(Button);

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();
  animation: string = 'bounceIn'
  show = true
  keyboardTitle = `输入金额: ${this.output}`

  onInput(input: any) {
    console.log(`input ${input}`);
    if (this.output.length === 16) {
      Notify({type: 'warning', message: '不能超过16位数字'});
      return;
    }
    if (this.output === '0') {
      console.log(222)
      if ('0123456789'.indexOf(input) >= 0) {
        console.log(3335);
        this.output = input.toString();
      } else {
        this.output += input.toString();
      }
      return;
    }
    console.log(66666)
    if (this.output.indexOf('.') >= 0 && input === '.') {
      Notify({type: 'warning', message: '请输入正确的数字'});
      return;
    }
    console.log(7777)
    this.output += input.toString();
    this.keyboardTitle = `输入金额: ${this.output}`
  }

  onDelete() {
    if (this.output.length === 1) {
      this.output = '0';
      this.keyboardTitle = `输入金额: ${this.output}`
    } else {
      this.output = this.output.slice(0, -1);
      this.keyboardTitle = `输入金额: ${this.output}`
    }
  }


  // inputContent(event: MouseEvent) {
  //   const button = (event.target as HTMLButtonElement);
  //   const input = button.textContent!;
  //   if (this.output.length === 16) {
  //     return;
  //   }
  //   if (this.output === '0') {
  //     if ('0123456789'.indexOf(input) >= 0) {
  //       this.output = input;
  //     } else {
  //       this.output += input;
  //     }
  //     return;
  //   }
  //   if (this.output.indexOf('.') >= 0 && input === '.') {
  //     return;
  //   }
  //   this.output += input;
  // }
  //
  // remove() {
  //   if (this.output.length === 1) {
  //     this.output = '0';
  //   } else {
  //     this.output = this.output.slice(0, -1);
  //   }
  // }

  // clear() {
  //   this.output = '0';
  // }

  ok() {
    const number = parseFloat(this.output);
    this.$emit('update:value', number);
    this.$emit('submit', number);
    this.output = '0';
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

  //.buttons {
  //  @extend %clearFix;
  //  font-size: 23px;
  //
  //  > button {
  //    width: 25%;
  //    height: 64px;
  //    float: left;
  //    background: transparent;
  //    border: none;
  //    border-radius: 4px;
  //
  //    &.ok {
  //      height: 64*2px;
  //      float: right;
  //      background: #1989fa;
  //    }
  //
  //    &.zero {
  //      width: 25*2%;
  //    }
  //
  //    $bg: #F2F2F2;
  //
  //    &:nth-child(1) {
  //      background: $bg;
  //    }
  //
  //    &:nth-child(2), &:nth-child(5) {
  //      background: darken($bg, 4%);
  //    }
  //
  //    &:nth-child(3), &:nth-child(6), &:nth-child(9) {
  //      background: darken($bg, 4*2%);
  //    }
  //
  //    &:nth-child(4), &:nth-child(7), &:nth-child(10) {
  //      background: darken($bg, 4*3%);
  //    }
  //
  //    &:nth-child(8), &:nth-child(11), &:nth-child(13) {
  //      background: darken($bg, 4*4%);
  //    }
  //
  //    &:nth-child(14) {
  //      background: darken($bg, 4*5%);
  //    }
  //
  //    &:nth-child(12) {
  //      //background: darken($bg, 4*6%);
  //    }
  //  }
  //}
}

.submit-button {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
