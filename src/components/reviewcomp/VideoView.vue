<template>
  <div class="video">
    <div class="caption">
      <n-ellipsis :tooltip="{'width':'260px'}">
        {{ reviewItem.caption }}
      </n-ellipsis>
    </div>
    <div class="img-view">
      <n-button @click=showImage>图片</n-button>
      <n-modal
        v-model:show="data.imgShow"
        preset="card"
        title="图片"
      >
        <div v-for="(url,index) in imageList(reviewItem.name,reviewItem.frameIdList.length)">
        <n-card>
          <n-button @click="window.open(url)">图片{{index}}</n-button>
        </n-card>
        </div>

      </n-modal>
    </div>
    <div class="info">
      <span style="font-size: 16px">{{ reviewItem.defaultCategory }}</span><br>
      <span id="data-id" @click="toVideo(reviewItem.mediaUrl)">dataId:{{ reviewItem.dataId }}</span>
    </div>
    <n-divider style="margin: 5px 0;padding: 0"/>
    <div class="history-list" v-for="(i,index) in historyList" :key="index">
      <p>{{ i }}</p>
    </div>
  </div>
</template>

<script setup lang='ts'>

import type {DataType} from "@/types";
import {computed, onMounted, ref} from "vue";

const {reviewItem, historyList} = defineProps<{
  reviewItem: DataType,
  historyList: Array<string>
}>()

const data = ref({
  imgShow: false
})
const showImage = () => {
  data.value.imgShow = true
}

const test = [1,2,3,4,5,6,7,8]
const imageList = (photoId: string, num: number) => {
  let list = [`http://114.116.41.110:4002/getimage?photoid=${photoId}&frameid=h`]
  for (let i = 0; i < num; i++) {
    let url = `http://114.116.41.110:4002/getimage?photoid=${photoId}&frameid=${i}`
    list.push(url)
  }
  return list
}

const toVideo = (url: string) => {
  window.open(`https://ml.corp.kuaishou.com${url}`)
}

</script>

<style scoped>
.video {
  width: 280px;
  border: 1px solid var(--boder-color);
  box-shadow: var(--box-shadow);
  text-align: center;
  padding: 5px;
}

#data-id {
  cursor: pointer;
  color: #747d8c;
  font-size: 14px;
}

#data-id:hover {
  color: #ced6e0;
}

#data-id:active {
  color: #a4b0be;
}
</style>
