<template>
  <div class="stage" v-show="Object.getOwnPropertyNames(stageList).length>0">
    <n-divider title-placement="left" style="margin: 5px 0;user-select: none">包数据</n-divider>
    <div class="stage-data">
      <span>总数：{{ stageList?.totalCount }}</span><br>
      <span>审核完成：{{ stageList?.finishedCount }}</span><br>
      <span>未领取：{{ stageList?.waitForMarkCount }}</span><br>
      <span>总暂跳：{{ stageList?.markingSkipCount }}</span><br>
      <span>已领取未提交：{{ stageList?.markingHandlingCount }}</span><br>
      <span>质检未领取：{{ stageList?.auditWaitForMarkCount }}</span><br>
      <span>质检暂跳：<span :style="{color:Number(stageList?.auditSkipCount)>0?'red':''}">{{
          stageList?.auditSkipCount
        }}</span></span><br>
      <span>质检领取未提交：{{ stageList?.unAuditCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Stage} from "@/types";

const {stageList} = defineProps<{
  stageList: Stage
}>()
console.log(stageList)
</script>
<style scoped>
.stage {
  border: 1px solid var(--boder-color);
  padding: 8px;
  box-shadow: var(--box-shadow);
  transition: 0.3s;
}
</style>
