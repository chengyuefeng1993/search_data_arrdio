<template>
  <div class="search">
    <NLayout embedded siderPlacement="left" :hasSider="true">
      <NLayoutSider bordered showTrigger style="height: 100vh;" :collapsed="mainStore.isCollapsed" collapseMode="width"
                    :collapsedWidth="64" :width="180" @collapse="mainStore.isCollapsed = true"
                    @expand="mainStore.isCollapsed = false">
        <NavBar/>
      </NLayoutSider>
      <NLayoutContent embedded :nativeScrollbar="false">
        <NScrollbar style="max-height: 100vh;">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"/>
            </keep-alive>
          </router-view>
          <n-back-top :right="20" :bottom="20" :visibility-height="150"/>
        </NScrollbar>
      </NLayoutContent>
    </NLayout>
  </div>
</template>

<script setup lang='ts'>
import NavBar from '@/components/NavBar.vue';
import {useMainStore} from '@/stores';

const mainStore = useMainStore()

</script>

<style scoped>

</style>
