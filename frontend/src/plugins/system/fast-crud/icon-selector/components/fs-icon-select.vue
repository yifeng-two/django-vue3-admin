<!--
 * @Author: yifeng
 * @Date: 2022-10-02 15:49:04
 * @LastEditors: yifeng
 * @LastEditTime: 2022-10-16 15:00:17
 * @Description: 
-->
<template>
  <span>
    <el-popover ref="popoverRef" :virtual-ref="buttonRef" v-model="pop" :placement="placement" width="400"
      trigger="click" virtual-triggering>
      <el-row type="flex" justify="end" class="fs-mb-10" v-if="clearable">
        <el-button type="danger" icon="Delete" size="small" class="fs-fr" @click="selectIcon()">
          清空
        </el-button>
      </el-row>
      <el-input :disabled="disabled" v-model="searchText" :clearable="true" placeholder="搜索 比如 'plus'"
        prefix-icon="Search">
      </el-input>
      <el-collapse v-if="!searchMode" class="fs-icon-select--group" v-model="collapseActive">
        <el-collapse-item class="fs-icon-select--class" v-for="(item, index) in icons" :key="index" :title="item.title"
          :name="index">
          <el-row class="fs-icon-select--class-row">
            <el-col class="fs-icon-select--class-col" v-for="(iconName, iconIndex) in item.icon" :key="iconIndex"
              :span="4" @click.native="selectIcon(iconName)">
              <!-- <i :class="'fa fa-' + iconName"></i> -->
              <fs-single-icon :icon="iconName"></fs-single-icon>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <div v-if="searchMode" class="fs-icon-select--group">
        <div class="fs-icon-select--class" v-for="(item, index) in iconFilted" :key="index">
          <div class="fs-icon-select--class-title">{{item.title}}</div>
          <el-row class="fs-icon-select--class-row">
            <el-col class="fs-icon-select--class-col" v-for="(iconName, iconIndex) in item.icon" :key="iconIndex"
              :span="4" @click.native="selectIcon(iconName)">
              <!-- <i :class="'fa fa-' + iconName"></i> -->
              <fs-single-icon :icon="iconName"></fs-single-icon>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-popover>
    <!-- 允许用户输入 -->
    <el-input :disabled="disabled" v-if="userInput" v-model="currentValue" v-bind="bind" style="max-width: 240px;">
      <template v-if="modelValue" #prepend>
        <!-- <i :class="'fa fa-' + modelValue"></i> -->
        <fs-icon :icon="modelValue"></fs-icon>
      </template>
      <el-button ref="buttonRef" v-click-outside="onClickOutside">
        <i class="fa fa-list"></i>
      </el-button>
    </el-input>
    <!-- 不允许用户输入 -->
    <el-button :disabled="disabled" ref="buttonRef" v-if="!userInput">
      <template v-if="modelValue">
        <!-- <i :class="'fa fa-' + modelValue"></i> -->
        <fs-single-icon :icon="modelValue"></fs-single-icon>
      </template>
      {{modelValue ? modelValue : placeholder}}
    </el-button>
  </span>
</template>
  
<script lang="ts" setup>
import icons from './data'
import { computed, getCurrentInstance, ref, watch, unref } from 'vue'
// import mixins from ''d2CrudPlus.input
// d2-icon-select

import { ClickOutside as vClickOutside } from 'element-plus'
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const { proxy } = getCurrentInstance()
const props = defineProps({
  disabled: {
    type: Boolean,
    required: true,
    default: false
  },
  // 值
  modelValue: {
    type: String,
    required: false,
    default: ''
  },
  // 占位符
  placeholder: {
    type: String,
    required: false,
    default: '请选择'
  },
  // 弹出界面的方向
  placement: {
    type: String,
    required: false,
    default: 'right'
  },
  // 是否可清空
  clearable: {
    type: Boolean,
    required: false,
    default: true
  },
  // 是否允许用户输入
  userInput: {
    type: Boolean,
    required: false,
    default: false
  },
  // 是否在选择后自动关闭
  autoClose: {
    type: Boolean,
    required: false,
    default: true
  }
})
// 绑定弹出框
const pop = ref<boolean>(false)
// 所有图标
// 组件内输入框的值
const currentValue = ref<string>('')
// 搜索的文字
const searchText = ref<string>('')
// 不是搜索的时候显示的折叠面板绑定的展开数据
const collapseActive = ref<any>([])
// collapseActive: [...Array(icon.length)].map((e, i) => i)
// 输入框上绑定的设置
const bind = computed(() => {
  return {
    placeholder: props.placeholder,
    clearable: props.clearable,
    ...proxy.ctx.$attrs
  }
})

// 是否在搜索
const searchMode = computed(() => {
  return !!searchText.value
})
// 过滤后的图标
const iconFilted = computed(() => {
  return icons.map(iconClass => ({
    title: iconClass.title,
    icon: iconClass.icon.filter(icon => icon.indexOf(searchText.value) >= 0)
  })).filter(iconClass => iconClass.icon.length > 0)
})

const emit = defineEmits(['update:modelValue', 'input'])
watch(
  () => props.modelValue,
  (newVal) => {
    /* ... */
    // if (this.dispatch) {
    //   this.dispatch('ElFormItem', 'el.form.blur')
    // }
    emit('update:modelValue', newVal)
    if (currentValue.value === newVal) {
      return
    }
    currentValue.value = newVal
  }, { immediate: true }
)


const selectIcon = (iconName = '') => {
  emit('update:modelValue', iconName)
  if (iconName && props.autoClose) {
    pop.value = false
  }
}
currentValue.value = props.modelValue

</script>
<style lang="scss" scoped>
.fs-mb-10 {
  margin-bottom: 10px
}

.fs-icon-select--group {
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-top: none;
  border-bottom: none;

  .fs-icon-select--class {
    .fs-icon-select--class-title {
      line-height: 30px;
      text-align: center;
      border-radius: 4px;
      margin: 10px 0px;
    }

    .fs-icon-select--class-row {
      .fs-icon-select--class-col {
        line-height: 40px;
        text-align: center;

        &:hover {
          border-radius: 4px;
          font-size: 26px;
        }
      }
    }
  }
}
</style>