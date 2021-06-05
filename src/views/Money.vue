<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="onUpdateAmount"/>
    <Types  :value.sync="onUpdateType"/>
    <Notes @update:value="onUpdateNotes"/>
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


@Component({components: {Tags, Notes, Types, NumberPad},})
export default class Money extends Vue {
  tags: Array = ['衣', '食', '住', '行']

  onUpdateTags(tags:string) {
    console.log(tags);
  }
  onUpdateAmount(){}
  onUpdateType(type:string) {
    console.log(types);
  }

  onUpdateNotes(notes:string) {

  }

}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

