<template>
  <div class="label-main">
    <div class="label-bar">
      <NSpace wrap :size="5">
        <n-date-picker
          v-model:value="data.time"
          type="datetimerange"
          :shortcuts="shoutCuts"
          style="width: 365px"
        />
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
        <n-select
          v-model:value="data.stageName"
          :options="options"
          style="width: 75px"
        />
        <n-input-number v-model:value="data.skipNum" style="width: 170px">
          <template #prefix>
            <span>暂跳额度：</span>
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
      </NSpace>
    </div>
    <NDivider style="margin: 0; padding: 0"/>
    <n-spin :show="isLoading">
      <div class="label-view" v-show="isShow">
        <StageData :stageList="data.stageList"/>
        <n-grid cols="3" item-responsive :x-gap="10">
          <n-grid-item span="3 768:2">
            <TagData :tagList="data.tagList" :id="data.id" :time="data.time"/>
          </n-grid-item>
          <n-grid-item span="3 768:1">
            <SkipData :skipList="data.skipList" :skipNum="data.skipNum"/>
          </n-grid-item>
        </n-grid>
      </div>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import dayjs from "dayjs";
import {ArrowBack, ArrowForward, TodayOutline} from "@vicons/ionicons5";
import {useMessage, useNotification} from "naive-ui";
import StageData from '@/components/labelcomp/StageData.vue'
import type {Skip, Stage, Tag} from "@/types";
import axios from "axios";
import TagData from "@/components/labelcomp/TagData.vue";
import SkipData from "@/components/labelcomp/SkipData.vue";

const notification = useNotification();
const labelGet = axios.create({
  baseURL: "http://114.116.41.110:4002",
  timeout: 15000,
});


labelGet.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.code === "ECONNABORTED" ||
      error.message === "Network Error" ||
      error.message.includes("timeout")
    ) {
      notification.error({
        content: "请求超时，请重试！",
      });
      return "timeOut";
    } else {
      console.log(error);
    }
    data.value.isLoadingNum = 0
    return Promise.resolve(error.response);
  }
);

const data = ref({
  id: "" as string,
  time: [
    dayjs().startOf("day").valueOf(),
    dayjs().add(1, "day").startOf("day").valueOf(),
  ] as [number, number],
  stageName: "label" as string,
  skipNum: 100 as number,
  stageList: {} as Stage,
  tagList: [] as Tag[],
  skipList: [] as Skip[],
  isLoadingNum: 0 as number,
});

const isShow = computed(() => {
  return (
    Object.getOwnPropertyNames(data.value.stageName).length > 0 ||
    data.value.tagList.length > 0 ||
    data.value.skipList.length > 0
  )
})

const isLoading = computed(() => {
  if (data.value.isLoadingNum == 0) {
    return false
  } else if (data.value.isLoadingNum == 1) {
    return true;
  } else if (data.value.isLoadingNum == 2) {
    return true;
  } else if (data.value.isLoadingNum == 3) {
    return true;
  } else if (data.value.isLoadingNum == 4) {
    return false;
  }
});

const options = [
  {
    label: "标注",
    value: "label",
  },
  {
    label: "一审",
    value: "review",
  },
];
const shoutCuts = {
  "7天": () =>
    [
      dayjs().subtract(7, "day").valueOf(),
      dayjs().add(1, "day").startOf("day").valueOf(),
    ] as [number, number],
  "半个月": () =>
    [
      dayjs().subtract(15, "day").valueOf(),
      dayjs().add(1, "day").startOf("day").valueOf(),
    ] as [number, number],
  "一个月": () =>
    [
      dayjs().subtract(30, "day").valueOf(),
      dayjs().add(1, "day").startOf("day").valueOf(),
    ] as [number, number],
};
const changeTime = (to: string) => {
  if (to === "foward") {
    data.value.time = [
      dayjs(data.value.time[0]).add(1, "day").startOf("day").valueOf(),
      dayjs(data.value.time[1]).add(1, "day").startOf("day").valueOf(),
    ];
  } else if (to === "today") {
    data.value.time = [
      dayjs().startOf("day").valueOf(),
      dayjs().add(1, "day").startOf("day").valueOf(),
    ];
  } else if (to === "back") {
    data.value.time = [
      dayjs(data.value.time[0]).subtract(1, "day").startOf("day").valueOf(),
      dayjs(data.value.time[1]).subtract(1, "day").startOf("day").valueOf(),
    ];
  }
};
const message = useMessage();
const onSearch = () => {
  if (data.value.id !== "") {
    data.value.isLoadingNum = 1;
    getStageData();
    getTagData();
    getSkipData();
  } else {
    message.error("ID为空", {
      duration: 1500,
    });
  }
};

const getStageData = async () => {
  await labelGet
    .get("/stagedata", {
      params: {
        sourceid: data.value.id,
      },
    })
    .then((res) => {
      if (res.data.code == 200) {
        data.value.stageList = res.data.result;
      }else {
        data.value.stageList= {} as Stage
      }
      data.value.isLoadingNum += 1
    }).catch(err => {
      console.log(err)
      data.value.isLoadingNum = 0
    })
};
const getTagData = async () => {
  await labelGet
    .get("/tagdata", {
      params: {
        sourceid: data.value.id,
        tmstart: data.value.time[0],
        tmstop: data.value.time[1],
        stagename: data.value.stageName,
      },
    })
    .then((res) => {
      if (res.data.code == 200) {
        let list = res.data.result
        data.value.tagList = list.splice(0, list.length - 2)
      }else {
        data.value.tagList = []
      }
      data.value.isLoadingNum += 1
    }).catch(err => {
      console.log(err)
      data.value.isLoadingNum = 0
    })
};
const getSkipData = async () => {
  await labelGet
    .get("/skipdata", {
      params: {
        sourceid: data.value.id,
        stagename: data.value.stageName,
      },
    })
    .then((res) => {
      if (res.data.code == 200) {
        data.value.skipList = res.data.result;
      }else {
        data.value.skipList = []
      }
      data.value.isLoadingNum += 1
    }).catch(err => {
      console.log(err)
      data.value.isLoadingNum = 0
    })
};
</script>

<style scoped>
.label-bar {
  padding: 0 8px 8px 8px;
}

.label-view {
  padding: 16px;
}
</style>
