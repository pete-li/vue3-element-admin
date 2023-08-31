<template>
  <div>
    <!-- 三级分类 -->
    <category
      :scene="scene"
      @c1-change="attrInfoList = []"
      @c2-change="attrInfoList = []"
    ></category>
    <!-- 属性CURD -->
    <el-card class="attr" style="margin-top: 32px">
      <!-- 表格展示场景 -->
      <div class="table-scene" v-show="scene === 0">
        <el-button
          v-permission-btn="`btn.Attr.add`"
          type="primary"
          :icon="Plus"
          @click="addAttrInfoHandler"
          :disabled="!categoryStore.c3Id"
        >
          添加平台属性
        </el-button>
        <!-- 展示场景表格 -->
        <el-table style="margin: 16px 0" :data="attrInfoList" border>
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column prop="attrName" label="属性名称" />
          <el-table-column label="属性值名称">
            <template #default="{ row }: { row: AttrInfo }">
              <el-tag
                style="margin: 3px"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="属性操作">
            <template #default="{ row }">
              <el-button
                v-permission-btn="`btn.Attr.update`"
                type="primary"
                size="small"
                icon="Edit"
                @click="editAttrHandler(row)"
              ></el-button>
              <el-popconfirm
                :title="`确定要删除“${row.attrName}”吗?`"
                width="250px"
                icon="delete"
                @confirm="deleteAttrInfo(row.id)"
              >
                <template #reference>
                  <el-button
                    v-permission-btn="`btn.Attr.remove`"
                    type="danger"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 增改场景 -->
      <div class="add-update-scene" v-show="scene === 1">
        <el-form ref="attrFormRuleRef" :model="attrInfoForm" :rules="rules">
          <el-form-item prop="attrName" label="属性名称">
            <el-input
              style="width: 180px"
              :ref="(el:HTMLInputElement )=> attrNameInputRef = el"
              placeholder="请输入属性名称"
              v-model="attrInfoForm.attrName"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          :icon="Plus"
          @click="addAttrValue"
          style="margin: 12px 0"
        >
          添加属性值
        </el-button>
        <!-- 属性值表格 -->
        <el-table
          style="margin: 16px 0"
          :data="attrInfoForm.attrValueList"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column label="属性值名称">
            <template
              #default="{ row, $index }: { row: AttrValue, $index: number }"
            >
              <el-input
                v-if="row.isEditMode"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                @blur="toggleToLook(row, $index)"
                :ref="(el:HTMLInputElement )=> inputRefArr[$index] = el"
                clearable
              ></el-input>
              <div v-else @click="toggleToEdit(row, $index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="属性值操作">
            <template #default="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrInfoForm.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="saveAttrInfo">
          {{ attrInfoForm.id ? '修改' : '添加' }}
        </el-button>
        <el-button size="default" @click="scene = 0">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useCategoryStore } from '@/store/modules/category'
import {
  reqAddOrUpdateAttrInfo,
  reqGetAttrInfoList,
  reqDeleteAttrInfo,
} from '@/api/product/attr'
import { ElMessage } from 'element-plus'
import { AttrInfo, AttrValue } from '@/api/product/attr/type'
import Category from '@/components/Category/index.vue'

const scene = ref(0) // 场景值 0：表格场景 1：增改场景
const categoryStore = useCategoryStore()
const inputRefArr = reactive<HTMLInputElement[]>([]) // 输入框实例数组
const attrNameInputRef = ref<HTMLInputElement>()
const attrInfoForm = reactive<AttrInfo>({
  attrName: '',
  attrValueList: [],
  categoryId: 0,
  categoryLevel: 3,
})
let attrInfoList = ref<AttrInfo[]>([])

watch(
  () => categoryStore.c3Id,
  async () => {
    try {
      await refreshAttrInfoList()
    } catch (error: any) {
      categoryStore.c3Id = '' // 此处服务器对某些分类会超时 做特别处理
    }
  },
)

const refreshAttrInfoList = async () => {
  if (!categoryStore.c1Id || !categoryStore.c2Id || !categoryStore.c3Id) return
  const res = await reqGetAttrInfoList(
    categoryStore.c1Id,
    categoryStore.c2Id,
    categoryStore.c3Id,
  )
  if (res.code === 200) {
    attrInfoList.value = res.data
  }
}

// 处理点击添加属性信息按钮
const addAttrInfoHandler = () => {
  Object.assign(attrInfoForm, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}

// 保存属性信息
const saveAttrInfo = async () => {
  try {
    await attrFormRuleRef.value.validate()
    let res = await reqAddOrUpdateAttrInfo(attrInfoForm)
    if (res.code === 200) {
      await refreshAttrInfoList()
      ElMessage({
        type: 'success',
        message: attrInfoForm.id ? '修改成功！' : '添加成功！',
      })
      scene.value = 0
    } else {
      ElMessage({
        type: 'error',
        message: attrInfoForm.id ? '修改失败！' : '添加失败！',
      })
    }
  } catch (error: any) {
    ElMessage({
      type: 'error',
      message: error.attrName[0].message,
    })
  }
}

// 按下修改属性按钮
const editAttrHandler = (attrInfo: AttrInfo) => {
  // assign是浅拷贝 要合并的目标对象是复杂类型嵌套，需要深拷贝
  // 注意Object.assign不会改变attrInfoForm的地址，而直接赋值JSON.parse会改变指针指向
  Object.assign(attrInfoForm, JSON.parse(JSON.stringify(attrInfo)))
  scene.value = 1
  nextTick(() => {
    attrNameInputRef.value?.focus()
  })
}

// 切换到修改模式
const toggleToEdit = (row: AttrValue, index: number) => {
  row.isEditMode = true
  nextTick(() => {
    inputRefArr[index]?.focus()
  })
  /* 如果没有nextTick，代码会直接运行下去，此时还没渲染另一个组件可见度
     因为使用的是v-if输入框是销毁状态 此时输入框元素还没造出来
  */
}

// 切换到展示模式(在丧失焦点的时候)
const toggleToLook = (row: AttrValue, index: number) => {
  let inputContent = row.valueName
  if (inputContent.trim() === '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空!',
    })
    attrInfoForm.attrValueList.splice(index, 1)
  }

  // find方法遍历数组中元素是否满足条件 不满足条件返回undefined
  let isRepeat = attrInfoForm.attrValueList.find((item) => {
    //去重先剔除自己
    if (item !== row) {
      // 一旦找到了相同说明除了本身之外有重复的元素 返回对应的值
      return item.valueName === inputContent
    }
  })

  if (isRepeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复!',
    })
    attrInfoForm.attrValueList.splice(index, 1)
  }
  row.isEditMode = false
}

// 添加属性值
const addAttrValue = () => {
  attrInfoForm.attrValueList.push({
    valueName: '',
    isEditMode: true,
  })
  nextTick(() => {
    inputRefArr[inputRefArr.length - 1]?.focus()
  })
}

// 删除属性信息
const deleteAttrInfo = async (attrId: number) => {
  const res = await reqDeleteAttrInfo(attrId)
  if (res.code === 200) {
    await refreshAttrInfoList()
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 表单验证
const attrFormRuleRef = ref()
const rules = reactive({
  attrName: [
    {
      required: true,
      message: '属性名称不能为空！',
      trigger: 'blur',
    },
  ],
})

onBeforeUnmount(() => {
  // category是公共组件，卸载前重置仓库数据
  categoryStore.$reset()
})
</script>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'attribute',
}
</script>
