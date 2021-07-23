<template>
  <div class="tags">
    <!--    <div class="new">-->
    <!--      <button @click="createTag">-->
    <!--        <Icon name="customize"></Icon>-->
    <!--        新增标签-->
    <!--      </button>-->
    <!--    </div>-->
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        <Icon v-if="tag.id<=7" :name='tag.name'/>
        <Icon v-if="tag.id>7" name='customize'/>
        <span>{{ tag.name }}</span>
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';

@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  //flex-grow: 1;
  display: flex;
  flex-direction: column;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      $bg: #D9D9D9;
      //background: $bg;
      $h: 24px;
      //height: $h;
      line-height: $h;
      border-radius: 50px;
      padding: 10px 16px;
      margin-right: 12px;
      margin-top: 4px;

      &.selected {
        background: rgb(25, 137, 250);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}

</style>
