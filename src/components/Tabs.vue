<template>
  <!--  <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">-->
  <!--    <li v-for="item in dataSource" :key="item.value" class="tabs-item"-->
  <!--        :class="liClass(item)" @click="select(item)">{{ item.text }}-->
  <!--    </li>-->
  <!--   -->
  <!--  </ul>-->
  <div class="tabs-box">
    <van-button @click="toggleShow" plain type="info" size="large">收入 or 支出</van-button>
    <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        description="请选择账目类型"
        close-on-click-action
        @select="onSelect"
    />
  </div>


</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {ActionSheet} from 'vant';

Vue.use(ActionSheet);

// type DataSourceItem = { text: string, value: string }
@Component
export default class Tabs extends Vue {
  // @Prop({required: true, type: Array})
  // dataSource!: DataSourceItem[];
  @Prop(String)
   value!: string;
  // @Prop(String)
  // classPrefix?: string;
  // @Prop({type: String, default: '64px'})
  // height!: string;

  show = false
  actions = [{name: '收入'}, {name: '支出'}]

  toggleShow() {
    if (this.show) {
      this.show = false
    } else {
      this.show = true
    }
  }

  onSelect(item:any) {
    this.show = false;
    console.log(item.name)
    this.$emit('update:value', item.name);
  }

  // liClass(item: DataSourceItem) {
  //   return {
  //     [this.classPrefix + '-tabs-item']: this.classPrefix,
  //     selected: item.value === this.value
  //   };
  // }
  //
  // select(item: DataSourceItem) {
  //   this.$emit('update:value', item.value);
  // }
}
</script>

<style lang="scss" scoped>
.tabs-box{display:flex;justify-content: center;align-items: center}
//.tabs {
//  background: #C4C4C4;
//  display: flex;
//  text-align: center;
//  font-size: 24px;
//
//  &-item {
//    width: 50%;
//    height: 64px;
//    display: flex;
//    justify-content: center;
//    align-items: center;
//    position: relative;
//
//    &.selected::after {
//      content: '';
//      position: absolute;
//      bottom: 0;
//      left: 0;
//      width: 100%;
//      height: 4px;
//      background: #333;
//    }
//  }
//}
</style>
