<template>
  <div class="skip" v-show="skipList.length>0">
    <n-divider style="margin: 5px 0;user-select: none">暂跳数量</n-divider>
    <n-data-table :columns="columns" :data="skipList" :pagination="false" bordered striped/>
    <n-divider style="margin: 5px 0;user-select: none">{{skipList.length}}</n-divider>
  </div>
</template>

<script setup lang="ts">

import {computed, h} from 'vue'
import type {DataTableColumns} from "naive-ui";
import type {Skip} from "@/types";


const {skipList,skipNum} = defineProps<{
  skipList:Skip[],
  skipNum:number
}>()
const columns:DataTableColumns<Skip> = [
  {
    title:'姓名',
    key:'userName',
    align:'center'
  },
  {
    title:'数量',
    key:'count',
    align:'center',
    render(row){
      return h(
        'span',
        {
          style:{
            color:row.count >= skipNum ? 'red' : 'green'
          }
        },
        {default:() => row.count}
      )
    }
  }
]

</script>
<style scoped>
.skip{
  margin-top: 8px;
  border: 1px solid var(--boder-color);
  box-shadow: var(--box-shadow);
  transition: 0.3s;
}
</style>
