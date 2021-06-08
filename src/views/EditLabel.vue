<template>
  <div>EditLabel.vue
    <Layout></Layout>
  </div>

</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {tagListModel} from "@/models/tagLIstModel";

@Component
export default class EditLabel extends Vue {

  created() {
    console.log(this.$route.params);
    const id = this.$route.params.id
    tagListModel.fetch()
    const tags = tagListModel.data
    // @ts-ignore
    const tag = tags.filter(t => t.id === id)[0]
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404')
    }
  }
}
</script>

<style scoped>

</style>