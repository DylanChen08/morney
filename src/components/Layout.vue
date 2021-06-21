<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`   ">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  props: ['classPrefix'],
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  min-height: 100vh; //控制整个容器高度
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.content {
  overflow: auto;
  flex-grow: 1;
}
</style>
