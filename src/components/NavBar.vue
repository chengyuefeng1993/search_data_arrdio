<template>
  <div class="nav-bar">
    <NMenu mode="vertical" :options="options" :onUpdate:value="handleRoute" v-model:value="mainStore.routeUrl"
      :collapsed="mainStore.isCollapsed" :collapsedWidth="64" :collapsedIconSize="22" />
  </div>
</template>

<script setup lang='ts'>
import { useMainStore } from '@/stores';
import { NIcon, type MenuOption } from 'naive-ui';
import { h, onMounted, type Component } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Home as HomeIcon,
  SearchCircle as SearchICon,
  Eye as EyeIcon
} from '@vicons/ionicons5'


const route = useRoute()
const router = useRouter()
const mainStore = useMainStore()
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const options: Array<MenuOption> = [
  {
    label: '主页',
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: '数据查询',
    key: 'label',
    icon: renderIcon(SearchICon)
  },
  {
    label: '回查',
    key: 'review',
    icon: renderIcon(EyeIcon)
  }
]
const handleRoute = (key: string) => {
  router.push({
    name: key
  })
}
onMounted(() => {
  if (route.name == 'label') {
    mainStore.routeUrl = 'label'
  } else if (route.name == 'review') {
    mainStore.routeUrl = 'review'
  }
})
</script>

<style scoped>

</style>

