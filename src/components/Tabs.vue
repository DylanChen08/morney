<template>
  <div class="tabs-box">
    <van-divider @click="toggleShow"
                 :style="{ color: '#1989fa', borderColor: 'red', padding: '0 16px' }"
    >
      收入 or 支出
    </van-divider>

    <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        :description="description"
        close-on-click-action
        @select="onSelect"
    />
  </div>


</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {ActionSheet} from 'vant';
import {Divider} from 'vant';
import { Empty } from 'vant';

Vue.use(Empty);
Vue.use(Divider);
Vue.use(ActionSheet);


@Component
export default class Tabs extends Vue {
  @Prop(String)
  value!: string;
  @Prop(String)
  description!: string;

  show = false
  actions = [{name: '收入'}, {name: '支出'}]

  toggleShow() {
    this.show = !this.show;
  }

  onSelect(item: any) {
    this.show = false;
    console.log(item.name)
    this.$emit('update:value', item.name);
  }
}
</script>

<style lang="scss" scoped>
.tabs-box {
  display: flex;
  justify-content: center;
  align-items: center
}
</style>
