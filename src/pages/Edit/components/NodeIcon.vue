<template>
  <el-dialog custom-class="nodeDialog" v-model="dialogVisible" :title="$t('nodeIcon.title')">
    <div class="item" v-for="item in nodeIconList" :key="item.name">
      <div class="title">{{ item.name }}</div>
      <div class="list">
        <div
          class="icon"
          v-for="icon in item.list"
          :key="icon.name"
          v-html="getHtml(icon.icon)"
          :class="{
            selected: iconList.includes(item.type + '_' + icon.name)
          }"
          @click="setIcon(item.type, icon.name)"
        ></div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { nodeIconList } from 'simple-mind-map/src/svg/icons'
import icon from '@/config/icon'
import bus from '@/utils/bus.js'
/**
 * @Author: 黄原寅
 * @Desc: 节点图标内容设置
 */
export default {
  name: 'NodeIcon',
  data() {
    return {
      nodeIconList: [...nodeIconList, ...icon],
      dialogVisible: false,
      iconList: [],
      activeNodes: []
    }
  },
  created() {
    bus.on('node_active', args => {
      this.activeNodes = args[1]
      if (this.activeNodes.length > 0) {
        let firstNode = this.activeNodes[0]
        this.iconList = firstNode.getData('icon') || []
      } else {
        this.iconList = []
      }
    })
    bus.on('showNodeIcon', () => {
      this.dialogVisible = true
    })
  },
  methods: {
    getHtml(icon) {
      return /^<svg/.test(icon) ? icon : `<img src="${icon}" />`
    },
    /**
     * @Author: 黄原寅
     * @Desc: 设置icon
     */
    setIcon(type, name) {
      let key = type + '_' + name
      let index = this.iconList.findIndex(item => {
        return item === key
      })
      // 删除icon
      if (index !== -1) {
        this.iconList.splice(index, 1)
      } else {
        let typeIndex = this.iconList.findIndex(item => {
          return item.split('_')[0] === type
        })
        // 替换icon
        if (typeIndex !== -1) {
          this.iconList.splice(typeIndex, 1, key)
        } else {
          // 增加icon
          this.iconList.push(key)
        }
      }
      this.activeNodes.forEach(node => {
        node.setIcon([...this.iconList])
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nodeDialog {
  /deep/ .el-dialog__body {
    padding: 0 20px;
  }

  .deleteBtn {
    margin-bottom: 20px;
  }

  .item {
    margin-bottom: 20px;
    font-weight: bold;

    .title {
      margin-bottom: 10px;
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      .icon {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        position: relative;
        /deep/ img {
          width: 100%;
          height: 100%;
        }
        /deep/ svg {
          width: 100%;
          height: 100%;
        }

        &.selected {
          &::after {
            content: '';
            position: absolute;
            left: -4px;
            top: -4px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2px solid #409eff;
          }
        }
      }
    }
  }
}
</style>
