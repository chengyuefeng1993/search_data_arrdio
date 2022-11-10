<template>
  <div class="review-main">
    <div class="review-bar">
      <n-space wrap :size="5" align="center">
        <n-date-picker v-model:value="data.time" type="datetimerange" :shortcuts="shoutCuts" style="width: 365px"/>
        <n-select v-model:value="data.stageName" :options="options" style="width: 75px"/>
        <n-input v-model:value="data.userName" placeholder="用户名" style="width: 160px;"/>
        <n-input v-model:value="data.dataId" placeholder="dataId" style="width: 90px;"/>
        <n-input-number v-model:value="data.pageNum" style="width: 115px;">
          <template #suffix>
            <span>页</span>
          </template>
        </n-input-number>
        <n-input-group>
          <n-input placeholder="包ID" v-model:value="data.id" clearable style="width: 130px" :maxlength="5" show-count
                   @keyup.enter="onSearch"/>
          <n-button :focusable="false" @click="onSearch" :loading="data.isLoading">搜索</n-button>
        </n-input-group>
        <n-switch v-model:value="data.isFilter">
          <template #checked>
            开启过滤
          </template>
          <template #unchecked>
            关闭过滤
          </template>
        </n-switch>
      </n-space>
    </div>
    <n-divider style="margin: 0;padding:0"/>
    <n-spin :show="data.isLoading">
      <div class="review-view">
        <n-space wrap :size="10">
          <KeepAlive>
            <template v-for="(item, index) in reviewList" :key="index">
              <component
                :is="views"
                :reviewItem="item"
                :historyList="item.answers[0].historyList"></component>
            </template>
          </KeepAlive>
        </n-space>
      </div>
      <n-space justify="center" style="margin: 20px 0">
        <n-pagination
          :item-count="data.reviewData.totalSize"
          :page-sizes="[10,30,50,100,300,500,1000]"
          :page="data.reviewData.pageNo"
          :page-size="data.reviewData.pageSize"
          show-size-picker show-quick-jumper
          @update:page="pageNumChange"
          @update:page-size="pageSizeChange"
          v-show="data.reviewData.totalSize>0"
        >
          <template #prefix>
            <span>共{{ data.reviewData.totalSize }}条</span>
          </template>
        </n-pagination>
      </n-space>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import type {ReviewType} from "@/types";
import axios from "axios";
import dayjs from "dayjs";
import {useMessage, useNotification} from "naive-ui";
import {computed, onMounted, ref} from "vue";
import TextView from '@/components/reviewcomp/TextView.vue'
import VideoView from '@/components/reviewcomp/VideoView.vue'

const notification = useNotification();
const reviewGet = axios.create({
  baseURL: "http://114.116.41.110:4002",
  timeout: 100000,
});

reviewGet.interceptors.response.use(
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
    data.value.isLoading = false
    return Promise.resolve(error.response);
  }
);

const data = ref({
  id: "" as string,
  time: [
    dayjs().startOf("day").valueOf(),
    dayjs().add(1, "day").startOf("day").valueOf(),
  ] as [number, number],
  stageName: "allReview" as string,
  userName: "" as string,
  dataId: "" as string,
  pageNum: 1 as number,
  pageSize: 30 as number,
  isLoading: false as boolean,
  reviewData: {} as ReviewType,
  isFilter: false as boolean,
});

const reviewList = computed(() => {
  if (data.value.isFilter) {
    return data.value.reviewData.data?.filter((a) => a?.reviewUser == null)
  } else {
    return data.value.reviewData.data
  }
})
const views = computed(() => {
  if (data.value.reviewData.dataType == "text") {
    return TextView
  } else if (data.value.reviewData.dataType == "video") {
    return VideoView
  }
})

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
    label: '全部',
    value: "allReview"
  }
];


const message = useMessage();
const onSearch = () => {
  if (data.value.id !== '') {
    data.value.isLoading = true
    getReviewData()
  } else {
    message.error("ID为空", {
      duration: 1500,
    });
  }
}

const getReviewData = async () => {
  await reviewGet.get('/review', {
    params: {
      sourceid: data.value.id,
      stagename: data.value.stageName,
      tmstart: data.value.time[0],
      tmstop: data.value.time[1],
      username: data.value.userName,
      dataid: data.value.dataId,
      pagenum: data.value.pageNum,
      pagesize: data.value.pageSize,
    }
  }).then(res => {
    if (res.data.code == 200) {
      data.value.reviewData = res.data.result
    }
    data.value.isLoading = false
  }).catch(err => {
    console.log(err)
    data.value.isLoading = false
  })
}

const pageNumChange = (page: number) => {
  data.value.pageNum = page
  onSearch()
}
const pageSizeChange = (pageSize: number) => {
  data.value.pageSize = pageSize
  window.localStorage.setItem('pageSize', data.value.pageSize.toString())
  onSearch()
}

onMounted(() => {
  let a = window.localStorage.getItem('pageSize')
  if (a != null) {
    data.value.pageSize = Number(a)
  }
})
</script>

<style scoped>
.review-bar {
  padding: 0 8px 8px 8px;
}

.review-view {
  padding: 16px;
}
</style>
