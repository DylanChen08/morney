<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <!-- .sync语法糖-->
    <!-- :value.sync="record.type"===@update:value="onUpdateType" -->
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <FormItem :value.sync="record.notes" field-name="备注" place-holder="在这里输入备注"/>
    <Tags :dataSource.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import {recordListModel} from "@/models/recordListModel";
import {tagListModel} from "@/models/tagListModel";
import FormItem from "@/components/Money/FormItem.vue";

const recordList = recordListModel.fetch()
// const tagList = tagListModel.fetch()
// type RecordItem = {
//   tags: string[]
//   notes: string
//   type: string
//   amount: number //数据类型
//   createAt?: Date //类/构造函数
// }

@Component({components: {FormItem, Tags, Types, NumberPad},})
export default class Money extends Vue {
  tags = window.tagList //直接在window上拿
  // record 必须符合 Record 类型
  recordList: RecordItem[] = recordList
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 999
  }


  onUpdateTags(value: string[]) {
    this.record.tags = value
  }

  saveRecord() {
    //@ts-ignore
    recordListModel.save(this.record)
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

