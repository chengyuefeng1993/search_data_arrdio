<template>
  <div class="tag" v-show="tagList.length>0">
    <n-divider style="margin: 5px 0;user-select: none;">标注数据</n-divider>
    <n-data-table
      :columns="columns"
      :data="tagList"
      :pagination="false"
      bordered striped
      size="small"
    />
    <n-divider style="margin: 5px 0;user-select: none">{{ tagList.length }}</n-divider>
  </div>
</template>

<script setup lang="ts">

import {h, reactive} from 'vue'
import type {Tag} from "@/types";
import type {DataTableColumns} from "naive-ui";


const {tagList, id, time} = defineProps<{
  tagList: Tag[],
  id: string,
  time: [number, number]
}>()


const columns = reactive<DataTableColumns<Tag>>([
  {
    title: '姓名',
    key: 'userName',
    align: 'center',
  },
  {
    title: '审核数量',
    key: 'totalMarkedCount',
    align: 'center'
  },
  {
    title: '质检正确',
    key: 'firstAuditCorrectCount',
    align: 'center'
  },
  {
    title: '质检总数',
    key: 'firstAuditTotalCount',
    align: 'center'
  },
  {
    title: '准确率',
    key: 'firstAuditCorrectRatio',
    align: 'center',
    render(row) {
      return h(
        'span',
        {
          style: {
            'color': row.firstAuditCorrectRatio === '100.00%' ? 'green' : 'red',
            'cursor': 'pointer'
          },
          onClick: () => toWrong(row.userName)
        },
        {default: () => row.firstAuditCorrectRatio}
      )
    }
  }
])

const toWrong = (name: string) => {
  window.open(`https://ml.corp.kuaishou.com/label-frontend/allErrorShow?dataSourceId=${id}&userName=${name}&startTime=${time[0]}&endTime=${time[1]}`)
}

</script>
<style scoped>
.tag {
  margin-top: 8px;
  border: 1px solid var(--boder-color);
  box-shadow: var(--box-shadow);
  transition: 0.3s;
}
</style>
