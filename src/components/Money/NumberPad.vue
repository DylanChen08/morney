<template>
  <div class="numberPad">
    <div class="output" @click="toggleNumberPad">{{ output }}</div>
    <van-number-keyboard
        :show="show"
        theme="custom"
        extra-key="."
        close-button-text="✔"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
    />
    <div class="submit-button">
      <van-button round  class="bottom-button" @click="ok" type="info" text="提交"/>
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
  show = false

  toggleNumberPad() {
    if (this.show) {
      this.show = false
    } else {
      this.show = true
    }
  }

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
    this.output += input.toString();
  }

  onDelete() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

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
}

.submit-button {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
