<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { UploadProps, UploadUserFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
defineProps(['scene'])
const emit = defineEmits(['cancel', 'save'])

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<template>
  <el-card v-show="scene === 2">
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select placeholder="请选择">
          <el-option label="zone one" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <template #default>
          <el-upload
            v-model:file-list="fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </template>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select placeholder="还未选择xx个">
          <el-option label="zone one" value="shanghai" />
        </el-select>
        <el-button style="margin-left: 16px" type="primary" icon="Plus">
          添加属性
        </el-button>
        <el-table :data="[{ name: 'logo.png' }]" style="margin: 16px 0" border>
          <el-table-column type="index" width="55" />
          <el-table-column prop="name" label="SPU销售属性名称" />
          <el-table-column label="SPU销售属性值" width="180">
            <template #default>
              <el-tag closable style="margin: 0 6px">黑色</el-tag>
              <el-button size="small" icon="Plus"></el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template #default>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="default" @click="emit('save')">
      保存
    </el-button>
    <el-button size="default" @click="emit('cancel')">取消</el-button>
  </el-card>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
export default {
  name: 'spuForm',
}
</script>
