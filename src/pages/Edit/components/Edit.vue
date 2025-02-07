<template>
  <div class="editContainer">
    <div class="mindMapContainer" ref="mindMapContainer"></div>
    <Count v-if="!isZenMode"></Count>
    <Navigator :mindMap="mindMap"></Navigator>
    <NavigatorToolbar :mindMap="mindMap" v-if="!isZenMode"></NavigatorToolbar>
    <Outline :mindMap="mindMap"></Outline>
    <Style v-if="!isZenMode"></Style>
    <BaseStyle :data="mindMapData" :mindMap="mindMap"></BaseStyle>
    <Theme :mindMap="mindMap"></Theme>
    <Structure :mindMap="mindMap"></Structure>
    <ShortcutKey></ShortcutKey>
    <Contextmenu v-if="mindMap" :mindMap="mindMap"></Contextmenu>
    <RichTextToolbar v-if="mindMap" :mindMap="mindMap"></RichTextToolbar>
    <NodeNoteContentShow v-if="mindMap" :mindMap="mindMap"></NodeNoteContentShow>
    <NodeImgPreview v-if="mindMap" :mindMap="mindMap"></NodeImgPreview>
    <SidebarTrigger v-if="!isZenMode"></SidebarTrigger>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import MindMap from 'simple-mind-map'
import MiniMap from 'simple-mind-map/src/MiniMap.js'
import Watermark from 'simple-mind-map/src/Watermark.js'
import Drag from 'simple-mind-map/src/Drag.js'
import KeyboardNavigation from 'simple-mind-map/src/KeyboardNavigation.js'
import Export from 'simple-mind-map/src/Export.js'
import Select from 'simple-mind-map/src/Select.js'
import RichText from 'simple-mind-map/src/RichText.js'
import AssociativeLine from 'simple-mind-map/src/AssociativeLine.js'
import Outline from './Outline'
import Style from './Style'
import BaseStyle from './BaseStyle'
import Theme from './Theme'
import Structure from './Structure'
import Count from './Count'
import NavigatorToolbar from './NavigatorToolbar'
import ShortcutKey from './ShortcutKey'
import Contextmenu from './Contextmenu'
import RichTextToolbar from './RichTextToolbar'
import NodeNoteContentShow from './NodeNoteContentShow.vue'
import Navigator from './Navigator.vue'
import NodeImgPreview from './NodeImgPreview.vue'
import SidebarTrigger from './SidebarTrigger.vue'
import { getData, storeData, storeConfig } from '@/api'
import bus from '@/utils/bus.js'
import { mapState } from 'vuex'
import customThemeList from '@/customThemes'
import icon from '@/config/icon'

// 注册插件
MindMap.usePlugin(MiniMap)
  .usePlugin(Watermark)
  .usePlugin(Drag)
  .usePlugin(KeyboardNavigation)
  .usePlugin(Export)
  .usePlugin(Select)
  .usePlugin(AssociativeLine)

// 注册自定义主题
// customThemeList.forEach(item => {
//   MindMap.defineTheme(item.value, item.theme)
// })

/**
 * @Author: 黄原寅
 * @Desc: 编辑区域
 */
export default {
  name: 'Edit',
  components: {
    Outline,
    Style,
    BaseStyle,
    Theme,
    Structure,
    Count,
    NavigatorToolbar,
    ShortcutKey,
    Contextmenu,
    RichTextToolbar,
    NodeNoteContentShow,
    Navigator,
    NodeImgPreview,
    SidebarTrigger
  },
  data() {
    return {
      mindMapData: {},
      mindMap: null,
      prevImg: '',
      openTest: false
    }
  },
  computed: {
    ...mapState({
      isZenMode: state => state.localConfig.isZenMode,
      openNodeRichText: state => state.localConfig.openNodeRichText
    })
  },
  watch: {
    openNodeRichText() {
      if (this.openNodeRichText) {
        this.addRichTextPlugin()
      } else {
        this.removeRichTextPlugin()
      }
    }
  },
  mounted() {
    // this.showNewFeatureInfo()
    this.init()
    bus.on('execCommand', this.execCommand)
    bus.on('paddingChange', this.onPaddingChange)
    bus.on('export', this.export)
    bus.on('setData', this.setData)
    bus.on('startTextEdit', () => {
      this.mindMap.renderer.startTextEdit()
    })
    bus.on('endTextEdit', () => {
      this.mindMap.renderer.endTextEdit()
    })
    bus.on('createAssociativeLine', () => {
      this.mindMap.associativeLine.createLineFromActiveNode()
    })
    window.addEventListener('resize', () => {
      this.mindMap.resize()
    })
    if (this.openTest) {
      setTimeout(() => {
        this.test()
      }, 5000)
    }
  },
  methods: {
    /**
     * @Author: 王林25
     * @Date: 2021-11-22 19:39:28
     * @Desc: 数据更改测试
     */
    test() {
      let nodeData = {
        data: { text: '根节点', expand: true, isActive: false },
        children: []
      }
      setTimeout(() => {
        nodeData.data.text = '理想青年实验室'
        this.mindMap.setData(JSON.parse(JSON.stringify(nodeData)))

        setTimeout(() => {
          nodeData.children.push({
            data: { text: '网站', expand: true, isActive: false },
            children: []
          })
          this.mindMap.setData(JSON.parse(JSON.stringify(nodeData)))

          setTimeout(() => {
            nodeData.children.push({
              data: { text: '博客', expand: true, isActive: false },
              children: []
            })
            this.mindMap.setData(JSON.parse(JSON.stringify(nodeData)))

            setTimeout(() => {
              let viewData = {
                transform: {
                  scaleX: 1,
                  scaleY: 1,
                  shear: 0,
                  rotate: 0,
                  translateX: 179,
                  translateY: 0,
                  originX: 0,
                  originY: 0,
                  a: 1,
                  b: 0,
                  c: 0,
                  d: 1,
                  e: 179,
                  f: 0
                },
                state: { scale: 1, x: 179, y: 0, sx: 0, sy: 0 }
              }
              this.mindMap.view.setTransformData(viewData)

              setTimeout(() => {
                let viewData = {
                  transform: {
                    scaleX: 1.6000000000000005,
                    scaleY: 1.6000000000000005,
                    shear: 0,
                    rotate: 0,
                    translateX: -373.3000000000004,
                    translateY: -281.10000000000025,
                    originX: 0,
                    originY: 0,
                    a: 1.6000000000000005,
                    b: 0,
                    c: 0,
                    d: 1.6000000000000005,
                    e: -373.3000000000004,
                    f: -281.10000000000025
                  },
                  state: {
                    scale: 1.6000000000000005,
                    x: 179,
                    y: 0,
                    sx: 0,
                    sy: 0
                  }
                }
                this.mindMap.view.setTransformData(viewData)
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    },

    /**
     * @Author: 黄原寅
     * @Desc: 获取思维导图数据，实际应该调接口获取
     */
    getData() {
      const data = getData()
      this.mindMapData = data
      return data
    },

    // 通过toRaw方法拿到mindMap的原始数据
    // 解决vue3的mindMap变量被proxy代理了，mindMap变成Proxy里面有些动态的属性就不兼容了
    // 需要通过toRaw的形式，拿到mindMap的原始引用
    getMindMap() {
      return toRaw(this.mindMap)
    },

    /**
     * @Author: 黄原寅
     * @Desc: 存储数据当数据有变时
     */
    bindSaveEvent() {
      if (this.openTest) {
        return
      }
      bus.on('data_change', data => {
        storeData(data)
      })
      bus.on('view_data_change', data => {
        storeConfig({
          view: data
        })
      })
    },

    /**
     * @Author: 黄原寅
     * @Desc: 手动保存
     */
    manualSave() {
      if (this.openTest) {
        return
      }
      // let data = this.mindMap.command.getCopyData()
      // storeData(data)
      // let viewData = this.mindMap.view.getTransformData()
      // storeConfig({
      //   view: viewData,
      // })
      let data = this.mindMap.getData(true)
      storeConfig(data)
    },

    /**
     * @Author: 黄原寅
     * @Desc: 初始化
     */
    init() {
      let { root, layout, theme, view, config } = this.getData()
      this.mindMap = new MindMap({
        el: this.$refs.mindMapContainer,
        data: root,
        layout: layout,
        theme: theme.template,
        themeConfig: theme.config,
        viewData: view,
        nodeTextEditZIndex: 1000,
        nodeNoteTooltipZIndex: 1000,
        customNoteContentShow: {
          show: (content, left, top) => {
            bus.emit('showNoteContent', [content, left, top])
          },
          hide: () => {
            // bus.emit('hideNoteContent')
          }
        },
        ...(config || {}),
        iconList: icon
      })
      if (this.openNodeRichText) this.addRichTextPlugin()
      this.mindMap.keyCommand.addShortcut('Control+s', () => {
        this.manualSave()
      })
      // 转发事件
      ;[
        'node_active',
        'data_change',
        'view_data_change',
        'back_forward',
        'node_contextmenu',
        'node_click',
        'draw_click',
        'expand_btn_click',
        'svg_mousedown',
        'mouseup',
        'mode_change',
        'node_tree_render_end',
        'rich_text_selection_change',
        'transforming-dom-to-images',
        'generalization_node_contextmenu'
      ].forEach(event => {
        this.getMindMap().on(event, (...args) => {
          if (['node_contextmenu', 'node_active', 'rich_text_selection_change'].includes(event)) {
            bus.emit(event, args)
          } else {
            bus.emit(event, ...args)
          }
        })
      })
      this.bindSaveEvent()
      window.mindMap = this.mindMap
    },

    /**
     * @Author: 黄原寅
     * @Desc: 动态设置思维导图数据
     */
    setData(data) {
      // this.mindMap.setData(data)
      if (data.root) {
        this.getMindMap().setFullData(data)
      } else {
        this.getMindMap().setData(data)
      }
      this.mindMap.view.reset()
      this.manualSave()
    },

    /**
     * @Author: 黄原寅
     * @Desc: 重新渲染
     */
    reRender() {
      this.getMindMap().reRender()
    },

    /**
     * @Author: 黄原寅
     * @Desc: 执行命令
     */
    execCommand(args) {
      this.getMindMap().execCommand(...(Array.isArray(args) ? args : [args]))
    },

    /**
     * @Author: 黄原寅
     * @Desc: 导出
     */
    async export(args) {
      try {
        this.mindMap.export(...args)
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * @Author: 黄原寅
     * @Desc: 修改导出内边距
     */
    onPaddingChange(data) {
      this.mindMap.updateConfig(data)
    },

    /**
     * @Author: 黄原寅
     * @Desc: 显示新特性提示
     */
    showNewFeatureInfo() {
      let showed = localStorage.getItem('SIMPLE_MIND_MAP_NEW_FEATURE_TIP_1')
      if (!showed) {
        this.$notify.info({
          title: this.$t('edit.newFeatureNoticeTitle'),
          message: this.$t('edit.newFeatureNoticeMessage'),
          duration: 0,
          onClose: () => {
            localStorage.setItem('SIMPLE_MIND_MAP_NEW_FEATURE_TIP_1', true)
          }
        })
      }
    },

    /**
     * @Author: 黄原寅
     * @Desc: 加载节点富文本编辑插件
     */
    addRichTextPlugin() {
      if (!this.mindMap) return
      this.mindMap.addPlugin(RichText)
    },

    /**
     * @Author: 黄原寅
     * @Desc: 移除节点富文本编辑插件
     */
    removeRichTextPlugin() {
      this.mindMap.removePlugin(RichText)
    }
  }
}
</script>

<style lang="less" scoped>
.editContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .mindMapContainer {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
