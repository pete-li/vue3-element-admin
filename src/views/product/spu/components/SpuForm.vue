<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { computed, nextTick, reactive, ref } from 'vue'
import { ElMessage, UploadFile, UploadProps } from 'element-plus'
import {
  reqAddOrUpdateSpuInfo,
  reqGetAllTradeMark,
  reqGetSaleAttrInfo,
  reqGetSaleAttrListById,
  reqGetSpuImgListById,
} from '@/api/product/spu'
import {
  baseSaleAttr,
  SpuImage,
  SpuInfo,
  SpuSaleAttr,
} from '@/api/product/spu/type.ts'
import { TradeMark } from '@/api/product/trademark/type.ts'
import { useCategoryStore } from '@/store/modules/category.ts'

defineProps(['scene'])
const emit = defineEmits(['cancel', 'save'])
const categoryStore = useCategoryStore()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const tradeMarkList = ref<TradeMark[]>([]) //商标列表
const spuImgList = ref<SpuImage[]>([]) // 图片墙spu图片列表
const baseSaleAttrList = ref<baseSaleAttr[]>([]) // 销售属性列表（可选范围）
const saleAttrTable = ref<SpuSaleAttr[]>([]) // 销售属性列表（表格）
const selectedAttrMap = ref<string>('') //已选择销售属性Map {id:name}
const inputRefArr = ref<any>([])
const spuInfoForm = reactive<SpuInfo>({
  tmId: '',
  spuName: '',
  description: '',
  category3Id: 0,
  spuImageList: [],
  spuSaleAttrList: [],
})

// 图片上传成功的回调
const handleUploadSuccess = (res: any, uploadFile: UploadFile) => {
  if (res.code === 200) {
    uploadFile.url = res.data //把服务器返回的http格式把blob对象的url替换掉
  }
}

// 处理取消按钮
const cancelHandler = () => {
  resetPreData() //增加用户体验感 不await
  emit('cancel')
}

// 点击添加按钮转到输入模式
const toInputHandler = (row: SpuSaleAttr, index: number) => {
  row.saleAttrValue = ''
  row.isInput = true
  nextTick(() => {
    inputRefArr.value[index]?.focus()
  })
}

// 输入框丧失焦点转到查看模式 (添加到数组中)
const toLookHandler = (row: SpuSaleAttr) => {
  if (row.saleAttrValue!.trim() === '') {
    ElMessage({
      type: 'warning',
      message: '属性值不能为空！',
    })
  } else {
    row.spuSaleAttrValueList?.push({
      baseSaleAttrId: row.baseSaleAttrId!,
      saleAttrValueName: row.saleAttrValue!,
    })
  }
  row.isInput = false
}

// 处理添加属性按钮
const addAttrBtHandler = () => {
  const [baseSaleAttrId, saleAttrName] = selectedAttrMap.value.split(':')
  saleAttrTable.value.push({
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  })
  selectedAttrMap.value = ''
}

// 已选的销售属性列表（剩余可选项）此项需运算量使用computed 减少不必要的计算
// 注意: computed会在依赖属性变化的时候触发
let selectableList = computed(() => {
  return baseSaleAttrList.value.filter((baseSaleAttr) => {
    const isFind = saleAttrTable.value.find(
      (saleAttr) => Number(saleAttr.baseSaleAttrId) === Number(baseSaleAttr.id),
    )
    return !isFind
  })
})

// 处理保存逻辑
const saveHandler = async () => {
  // 请求预处理spuInfoForm表单
  spuInfoForm.spuImageList = spuImgList.value.map((spuImg) => {
    return {
      //修改“键”的名字 修改成服务器需要的字段形式
      imgName: spuImg.name,
      imgUrl: spuImg.url,
    }
  })
  spuInfoForm.spuSaleAttrList = saleAttrTable.value
  const res = await reqAddOrUpdateSpuInfo(spuInfoForm)
  if (res.code === 200) {
    await resetPreData()
    ElMessage.success({
      message: spuInfoForm.id ? '修改成功!' : '添加成功!',
    })
    emit('save') //切换场景
  } else {
    ElMessage.error({
      message: spuInfoForm.id ? '修改失败!' : '添加失败!',
    })
  }
}

// 重置预设数据 （主要为添加数据做准备）
const resetPreData = async () => {
  spuImgList.value = []
  saleAttrTable.value = []
  selectedAttrMap.value = ''
  dialogImageUrl.value = ''
  Object.assign(spuInfoForm, {
    id: 0,
    tmId: '',
    spuName: '',
    description: '',
    category3Id: categoryStore.c3Id,
    spuImageList: [],
    spuSaleAttrList: [],
  })
  try {
    const [res1, res2] = await Promise.all([
      reqGetAllTradeMark(),
      reqGetSaleAttrInfo(),
    ])
    tradeMarkList.value = res1.data //商标列表
    baseSaleAttrList.value = res2.data //销售属性选择器列表
  } catch (e) {
    console.error(e)
  }
}

// 初始化预设数据（如品牌、spu图标..）
const initSpuPresetData = async (spu?: SpuInfo) => {
  await resetPreData() // 重置公共预设数据
  // 有传入spu这个对象说明是修改
  if (spu) {
    // 修改SPU  修改预设数据
    Object.assign(spuInfoForm, {
      id: spu.id,
      tmId: spu.tmId,
      spuName: spu.spuName,
      description: spu.description,
      category3Id: categoryStore.c3Id,
      spuImageList: [],
      spuSaleAttrList: [],
    })
    try {
      const [res1, res2] = await Promise.all([
        reqGetSpuImgListById(spu.id!),
        reqGetSaleAttrListById(spu.id!),
      ])
      for (const spuImg of res1.data) {
        spuImgList.value.push({
          name: spuImg.imgName,
          url: spuImg.imgUrl,
        })
      }
      saleAttrTable.value = res2.data //销售属性表格
    } catch (e) {
      console.error(e)
    }
  }
}

// 浏览图片
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 上传前限制图片判断
const handlerUpload = (file: any) => {
  if (
    file.type === 'images/png' ||
    file.type === 'images/jpeg' ||
    file.type === 'images/gif'
  ) {
    if (file.size / 1024 / 1024 < 5) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传图片必须小于5M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传图片格式必须为PNG|JPG|GIF',
    })
    return false
  }
}

//调用时机应该在父组件点击添加或修改时，需对外暴露
defineExpose({
  initSpuPresetData,
})
</script>

<template>
  <el-card v-show="scene === 2">
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuInfoForm.spuName"
          placeholder="请输入SPU名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="spuInfoForm.tmId" placeholder="请选择">
          <el-option
            v-for="tm in tradeMarkList"
            :label="tm.tmName"
            :value="tm.id"
            :key="tm.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuInfoForm.description"
          type="textarea"
          placeholder="请输入SPU描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <template #default>
          <el-upload
            v-model:file-list="spuImgList"
            action="api/admin/product/fileUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleUploadSuccess"
            :before-upload="handlerUpload"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img
              :src="dialogImageUrl"
              style="width: 100%; height: 100%"
              alt="图片已丢失"
            />
          </el-dialog>
        </template>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          v-model="selectedAttrMap"
          :placeholder="
            selectableList.length
              ? `${selectableList.length}个属性可选`
              : '暂无销售属性可选'
          "
        >
          <el-option
            v-for="item in selectableList"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
            :key="item.id"
          />
        </el-select>
        <el-button
          @click="addAttrBtHandler"
          type="primary"
          icon="Plus"
          style="margin-left: 16px"
          :disabled="!selectedAttrMap"
        >
          添加属性
        </el-button>
        <el-table :data="saleAttrTable" style="margin: 16px 0" border>
          <el-table-column type="index" width="55" />
          <el-table-column
            prop="saleAttrName"
            label="SPU销售属性名称"
            width="140"
          />
          <el-table-column label="SPU销售属性值">
            <template #default="{ row, $index }">
              <span
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
              >
                <el-tag
                  @close="row.spuSaleAttrValueList.splice(index, 1)"
                  style="margin: 0 6px 6px 0"
                  closable
                >
                  {{ item.saleAttrValueName }}
                </el-tag>
              </span>
              <el-button
                v-if="!row.isInput"
                @click="toInputHandler(row, $index)"
                size="small"
                icon="Plus"
              ></el-button>
              <el-input
                v-else
                :ref="(el: HTMLInputElement) => (inputRefArr[$index] = el)"
                v-model="row.saleAttrValue"
                @blur="toLookHandler(row)"
                size="small"
                style="width: 100px"
                placeholder="请输入属性值"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template #default="{ $index }">
              <el-button
                @click="saleAttrTable.splice($index, 1)"
                type="danger"
                size="small"
                icon="Delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="default" @click="saveHandler">
      保存
    </el-button>
    <el-button size="default" @click="cancelHandler">取消</el-button>
  </el-card>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
export default {
  name: 'spuForm',
}
</script>
