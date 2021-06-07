<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <!-- .sync语法糖-->
    <!-- :value.sync="record.type"===@update:value="onUpdateType" -->
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes :value.sync="record.notes"/>
    <Tags :dataSource.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {recordListModel} from "@/models/recordListModel";
import {tagListModel} from "@/models/tagLIstModel";

const recordList= recordListModel.fetch()
const tagList = tagListModel.fetch()
// type RecordItem = {
//   tags: string[]
//   notes: string
//   type: string
//   amount: number //数据类型
//   createAt?: Date //类/构造函数
// }

@Component({components: {Tags, Notes, Types, NumberPad},})
export default class Money extends Vue {
  tags = tagList
  // record 必须符合 Record 类型
  recordList: RecordItem[] = recordList
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 999
  }


  onUpdateTags(value: string[]) {
    this.record.tags = value
  }

  saveRecord() {
    const item:RecordItem = JSON.parse(JSON.stringify(this.record))
    item.createAt = new Date()
    this.recordList.push(item)
  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

