<template>
  <NConfigProvider :locale="zhCN" :dateLocale="dateZhCN" :theme="theme">
    <n-message-provider>
      <n-notification-provider>
        <div class="myapp">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"/>
            </keep-alive>
          </router-view>
        </div>
      </n-notification-provider>
    </n-message-provider>
  </NConfigProvider>
</template>

<script setup lang='ts'>
import {dateZhCN, useOsTheme, zhCN, darkTheme, NConfigProvider} from 'naive-ui';
import {computed} from 'vue';


const osTheme = useOsTheme()
const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))

</script>

<style scoped>

</style>
