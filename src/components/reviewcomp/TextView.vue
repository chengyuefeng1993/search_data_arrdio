<template>
  <div class="text" :style="{borderColor:reviewItem.reviewUser == null?'red':'green'}">
    <div class="caption">
      <b v-html="reviewItem.caption" style="font-size: 16px"></b>
    </div>
    <div class="info">
      <span>dataId:{{ reviewItem.dataId }}</span><br>
      <span>{{ reviewItem.defaultCategory }}</span>
    </div>
    <n-divider style="margin: 5px 0;padding: 0"/>
    <div class="hisList" v-for="(item,index) in historyList" :key="index">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script setup lang='ts'>

import type {DataType} from "@/types";

const {reviewItem, historyList} = defineProps<{
  reviewItem: DataType,
  historyList: Array<string>
}>()
</script>

<style scoped>
.text {
  border: 1px solid var(--boder-color);
  width: 240px;
  text-align: center;
  padding: 5px;
  box-shadow: var(--box-shadow);
}

</style>
