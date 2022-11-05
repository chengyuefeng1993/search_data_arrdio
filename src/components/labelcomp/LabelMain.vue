<template>
  <div class="label-main">
    <div class="label-bar">
      <NSpace wrap :size="5">
        <n-date-picker v-model:value="data.time" type="datetimerange" :shortcuts="shoutCuts" style="width: 365px"/>
        <n-button-group>
          <n-button @click="changeTime('back')" :focusable="false" round>
            <template #icon>
              <n-icon>
                <ArrowBack/>
              </n-icon>
            </template>
          </n-button>
          <n-button @click="changeTime('today')" :focusable="false">
            <template #icon>
              <n-icon>
                <TodayOutline/>
              </n-icon>
            </template>
          </n-button>
          <n-button @click="changeTime('foward')" :focusable="false" round>
            <template #icon>
              <n-icon>
                <ArrowForward/>
              </n-icon>
            </template>
          </n-button>
        </n-button-group>
        <n-select v-model:value="data.stageName" :options="options" style="width: 75px"/>
        <n-input-number v-model:value="data.skipNum" style="width: 170px">
          <template #prefix>
            <span>暂跳额度：</span>
          </template>
        </n-input-number>
        <n-input-group>
          <n-input placeholder="包ID" v-model:value="data.id" clearable style="width: 130px" :maxlength="5"
                   show-count @keyup.enter="onSearch"/>
          <n-button :focusable="false" @click="onSearch">搜索</n-button>
        </n-input-group>
      </NSpace>

    </div>
    <NDivider style="margin: 0;padding: 0;"/>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue';
import dayjs from "dayjs";
import {ArrowBack, ArrowForward, TodayOutline} from '@vicons/ionicons5'
import {useMessage} from "naive-ui";
import type {Skip, Stage, Tag} from "@/types";


const data = ref({
  id: '' as string,
  time: [
    dayjs().startOf('day').valueOf(),
    dayjs().add(1, 'day').startOf('day').valueOf()
  ] as [number, number],
  stageName: 'label' as string,
  skipNum: 100 as number,
})
const stageList = ref({} as Stage)
const tagList = ref([] as Array<Tag>)
const skipList = ref([] as Array<Skip>)
const options = [
  {
    label: '标注',
    value: 'label',
  },
  {
    label: '一审',
    value: 'review',
  }
]
const shoutCuts = {
  '7天': () => [
    dayjs().subtract(7, 'day').valueOf(),
    dayjs().add(1, 'day').startOf('day').valueOf()
  ],
  '半个月': () => [
    dayjs().subtract(15, 'day').valueOf(),
    dayjs().add(1, 'day').startOf('day').valueOf()
  ],
  '一个月': () => [
    dayjs().subtract(30, 'day').valueOf(),
    dayjs().add(1, 'day').startOf('day').valueOf()
  ]
}
const changeTime = (to: string) => {
  if (to === 'foward') {
    data.value.time = [
      dayjs(data.value.time[0]).add(1, 'day').startOf('day').valueOf(),
      dayjs(data.value.time[1]).add(1, 'day').startOf('day').valueOf()
    ]
  } else if (to === 'today') {
    data.value.time = [
      dayjs().startOf('day').valueOf(),
      dayjs().add(1, 'day').startOf('day').valueOf()
    ]
  } else if (to === 'back') {
    data.value.time = [
      dayjs(data.value.time[0]).subtract(1, 'day').startOf('day').valueOf(),
      dayjs(data.value.time[1]).subtract(1, 'day').startOf('day').valueOf()
    ]
  }
}
const message = useMessage()
const onSearch = () => {
  if (data.value.id == '') {
    message.error('ID为空', {
      duration: 1500
    })
  } else {

  }
}
</script>

<style scoped>
.label-bar {
  padding: 0 10px 10px 10px;
}
</style>
