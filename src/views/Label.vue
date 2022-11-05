<template>
  <div class="label">
    <NTabs v-model:value="value" type="card" :addable="addable" :closable="closable" tabStyle="min-width:80px;"
      @close="handleClose" @add="handleAdd" size="small">
      <NTabPane v-for="pan in panels" :key="pan" :name="pan">
        <LabelMain />
      </NTabPane>
    </NTabs>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import LabelMain from '@/components/labelcomp/LabelMain.vue'

const value = ref(1)
const panels = ref([1])
const addable = computed(() => {
  return {
    disabled: panels.value.length >= 10
  }
})
const closable = computed(() => {
  return panels.value.length > 1
})
const handleAdd = () => {
  const newValue = Math.max(...panels.value) + 1
  panels.value.push(newValue)
  value.value = newValue
}
const handleClose = (name: number) => {
  const { value: panel } = panels
  const nameIndex = panel.findIndex(panelName => panelName === name)
  if (!~nameIndex) return
  panel.splice(nameIndex, 1)
  if (name === value.value) {
    value.value = panel[Math.min(nameIndex, panel.length - 1)]
  }
}
</script>

<style scoped>

</style>