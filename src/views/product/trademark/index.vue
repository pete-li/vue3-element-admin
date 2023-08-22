<template>
  <div>
    <el-card class="box-card">
      <!-- 添加品牌按钮 -->
      <el-button
        type="primary"
        size="default"
        @click="addTradeMark"
        icon="Plus"
      >
        添加品牌
      </el-button>
      <!-- 表格 -->
      <el-table style="margin: 16px 0" :data="trademarks" border>
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="tmName" label="品牌名称" />
        <el-table-column prop="logoUrl" label="品牌logo">
          <!-- 插槽会传值scope 其中有index和row数据通过解构赋值获得 -->
          <template #default="{ row }">
            <img
              :src="row.logoUrl"
              alt="图片丢失"
              style="width: 100px; height: 100px; object-fit: contain"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTradeMark(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定要删除“${row.tmName}”吗?`"
              width="250px"
              icon="delete"
              @confirm="deleteTradeMark(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="curPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="trademarkForm.id ? '修改品牌' : '添加品牌'"
      @close="closeDialog"
    >
      <el-form ref="ruleFormRef" :model="trademarkForm" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademarkForm.tmName" />
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkForm.logoUrl"
              :src="trademarkForm.logoUrl"
              class="avatar"
              alt="图片丢失了"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="cancelDialog">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import {
  reqGetTradeMark,
  reqAddOrUpdateTradeMark,
  reqRemoveTradeMark,
} from '@/api/product/trademark'
import type { TradeMark } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

const curPage = ref(1)
const pageSize = ref(3)
const total = ref(0)
const ruleFormRef = ref()
const dialogVisible = ref(false)
let trademarks = ref<TradeMark[]>([])
let trademarkForm = reactive<TradeMark>({
  id: 0,
  tmName: '',
  logoUrl: '',
})

// 对话框取消
const cancelDialog = () => {
  dialogVisible.value = false
}

// 对话框关闭
const closeDialog = () => {
  // 关闭的时候重置数据
  trademarkForm.tmName = ''
  trademarkForm.logoUrl = ''
  ruleFormRef.value.clearValidate('tmName')
  ruleFormRef.value.clearValidate('logoUrl')
}
// 对话框确认
const confirm = async () => {
  await ruleFormRef.value.validate() //返回是一个promise对象表示表单验证失败与否
  const res = await reqAddOrUpdateTradeMark(trademarkForm)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: trademarkForm.id ? '修改品牌成功！' : '添加品牌成功！',
    })
    dialogVisible.value = false
    await refreshTMData()
  } else {
    ElMessage({
      type: 'error',
      message: trademarkForm.id ? '修改品牌失败！' : '添加品牌失败！',
    })
  }
}

// 添加品牌按钮
const addTradeMark = () => {
  trademarkForm.id = 0
  dialogVisible.value = true
}

// 修改品牌按钮
const updateTradeMark = (row: TradeMark) => {
  dialogVisible.value = true
  Object.assign(trademarkForm, row)
  // 简化代码
  // trademarkForm.id = row.id
  // trademarkForm.tmName = row.tmName
  // trademarkForm.logoUrl = row.logoUrl
}

// 删除品牌按钮
const deleteTradeMark = async (id: number) => {
  const res = await reqRemoveTradeMark(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功！',
    })
    dialogVisible.value = false
    await refreshTMData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败！',
    })
  }
}

// 刷新trademarks的数据
const refreshTMData = async () => {
  const res = await reqGetTradeMark(curPage.value, pageSize.value)
  if (res.code === 200) {
    trademarks.value = res.data.records
    total.value = res.data.total
    trademarks.value.forEach((tm) => {
      if (!tm.logoUrl.includes('http://')) tm.logoUrl = 'http://' + tm.logoUrl
    })
  }
}

// 组件挂载时刷新数据
onMounted(() => {
  refreshTMData()
})

// 当前页数变化
const currentChange = () => {
  refreshTMData()
}
// 每页限制数量变化
const sizeChange = () => {
  curPage.value = 1
  refreshTMData()
}

// 上传图片设置
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  _uploadFile,
) => {
  trademarkForm.logoUrl = response.data
  ruleFormRef.value.clearValidate('logoUrl')
}

// 上传限制
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('上传的文件类型必须是图片格式！')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('上传的文件大小应小于4M！')
    return false
  }
  return true
}

// 品牌名称验证
const validatorTmName = (_rule: any, value: any, callBack: any) => {
  if (value.length < 2) {
    callBack(new Error('品牌名称长度至少要大于一位！'))
  } else {
    callBack()
  }
}

// 品牌logo图片验证
const validatorLogoUrl = (_rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('请上传品牌logo图片！'))
  }
}

// 表单验证规则
const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      trigger: 'change',
      validator: validatorLogoUrl,
    },
  ],
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<script lang="ts">
export default {
  name: 'trademark',
}
</script>
