<template>
  <div class="review-main">
    <div class="review-bar">
      <n-space wrap :size="5">
        <n-date-picker
          v-model:value="data.time"
          type="datetimerange"
          :shortcuts="shoutCuts"
          style="width: 365px"
        />
        <n-select
          v-model:value="data.stageName"
          :options="options"
          style="width: 75px"
        />
        <n-input v-model:value="data.useName" placeholder="用户名" style="width: 160px;"/>
        <n-input v-model:value="data.dataId" placeholder="dataId" style="width: 90px;"/>
        <n-input-number v-model:value="data.pageNum" style="width: 115px;">
          <template #suffix>
            <span>页</span>
          </template>
        </n-input-number>
        <n-input-group>
          <n-input
            placeholder="包ID"
            v-model:value="data.id"
            clearable
            style="width: 130px"
            :maxlength="5"
            show-count
            @keyup.enter="onSearch"
          />
          <n-button :focusable="false" @click="onSearch">搜索</n-button>
        </n-input-group>
      </n-space>
    </div>
    <n-divider style="margin: 0;padding:0"/>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useMessage } from "naive-ui";
import { ref } from "vue";

const data = ref({
  id: "" as string,
  time: [
    dayjs().startOf("day").valueOf(),
    dayjs().add(1, "day").startOf("day").valueOf(),
  ] as [number, number],
  stageName: "allReview" as string,
  useName: "" as string,
  dataId: "" as string,
  pageNum: 1 as number,
  pageSize: 30 as number,
});

const shoutCuts = {
  前一天: () => [
    dayjs(data.value.time[0]).subtract(1, "day").valueOf(),
    dayjs(data.value.time[1]).subtract(1, "day").valueOf(),
  ] as [number, number],
  今天: () => [
    dayjs().startOf("day").valueOf(),
    dayjs().add(1, "day").startOf("day").valueOf(),
  ] as [number, number],
  后一天: () => [
    dayjs(data.value.time[0]).add(1, "day").valueOf(),
    dayjs(data.value.time[1]).add(1, "day").valueOf(),
  ] as [number, number],
  "7天": () =>
    [
      dayjs().subtract(7, "day").valueOf(),
      dayjs().add(1, "day").startOf("day").valueOf(),
    ] as [number, number],
  半个月: () =>
    [
      dayjs().subtract(15, "day").valueOf(),
      dayjs().add(1, "day").startOf("day").valueOf(),
    ] as [number, number],
  一个月: () =>
    [
      dayjs().subtract(30, "day").valueOf(),
      dayjs().add(1, "day").startOf("day").valueOf(),
    ] as [number, number],
};

const options = [
  {
    label: "标注",
    value: "label",
  },
  {
    label: "一审",
    value: "review",
  },
  {
    label:'全部',
    value: "allReview"
  }
];


const message = useMessage();
const onSearch = ()=> {
  if (data.value.id !== '') {
    console.log(111)
  }else{
    message.error("ID为空", {
      duration: 1500,
    });
  }
}
</script>

<style scoped>
.review-bar {
  padding: 0 8px 8px 8px;
}
</style>
