<template>
  <Sidebar ref="sidebar" :title="$t('theme.title')">
    <div class="themeList">
      <div
        class="themeItem"
        v-for="item in themeAllList"
        :key="item.value"
        @click="useTheme(item)"
        :class="{ active: item.value === theme }"
      >
        <div class="imgBox">
          <img :src="themeMap[item.value]" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
/**
 * @Author: 黄原寅寅
 * @Desc: 主题
 */
import { ref, defineProps, onMounted, computed, watch } from 'vue'
import Sidebar from './Sidebar'
import { themeList } from 'simple-mind-map/src/utils/constant'
import { storeConfig } from '@/api'
import bus from '@/utils/bus.js'
import { useStore } from 'vuex'
import { themeMap } from '@/config/constant.js'
import customThemeList from '@/customThemes'

const props = defineProps({
  mindMap: {
    type: Object
  }
})

const store = useStore()
const activeSidebar = computed(() => store.state.activeSidebar)
const sidebar = ref(null)
const theme = ref('')
const themeAllList = ref([...themeList].reverse())
// const themeAllList = ref([...themeList, ...customThemeList])

watch(
  () => activeSidebar.value,
  val => {
    if (val === 'theme') {
      theme.value = props.mindMap.getTheme()
      sidebar.value.show = true
    } else {
      sidebar.value.show = false
    }
  }
)

/**
 * @Author: 黄原寅寅
 * @Desc: 使用主题
 */
const useTheme = item => {
  theme.value = item.value
  props.mindMap.setTheme(theme.value)
  storeConfig({
    theme: {
      template: theme.value,
      config: props.mindMap.getCustomThemeConfig()
    }
  })
}
</script>

<style lang="less" scoped>
.themeList {
  padding: 20px;
  .themeItem {
    width: 100%;
    cursor: pointer;
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 20px;
    padding-bottom: 20px;
    transition: all 0.2s;
    border: 1px solid transparent;
    &:last-of-type {
      border: none;
    }
    &:hover {
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
    }
    &.active {
      border: 1px solid #67c23a;
    }
    .imgBox {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .name {
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
