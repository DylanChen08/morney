<template>
  <Layout class-prefix="layout">
    {{ record }}
    <!-- .sync语法糖-->
    <!-- :value.sync="record.type"===@update:value="onUpdateType" -->
    <NumberPad :value.sync="record.amount"/>
    <Types :value.sync="record.type"/>
    <Notes :value.sync="record.notes"/>
    <Tags :dataSource.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
}

@Component({components: {Tags, Notes, Types, NumberPad},})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'] //为了保证有初始数据，不能和Types、NumberPad和Tags一样只做一个值的传输.
  // record 必须符合 Record 类型
  record: Record = {
    tags: [], notes: '', type: '-', amount: 999
  }

  onUpdateTags(value: string[]) {
    this.record.tags = value
  }


}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

