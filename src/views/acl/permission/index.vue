<template>
  <div>
    <!-- 权限数据 展示区域 -->
    <el-card>
      <el-table
        :data="PermissionList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
      >
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column
          prop="updateTime"
          label="修改时间"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="260px">
          <template #default="{ row }: { row: Permission }">
            <el-button
              :disabled="row.level === 4"
              size="small"
              @click="addPermissionHandler(row)"
            >
              {{ row.level === 3 ? '添加功能' : '添加菜单' }}
            </el-button>
            <el-button
              :disabled="row.level === 1"
              type="primary"
              size="small"
              @click="editPermissionHandler(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.name}?`"
              width="260px"
              @confirm="deletePermission(row.id!)"
            >
              <template #reference>
                <el-button
                  :disabled="row.level === 1"
                  type="danger"
                  size="small"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 增加/编辑角色的对话框 -->
    <el-dialog
      @close="addOrEditDialogClose"
      v-model="isAddOrEditDialog"
      :title="dialogTitle"
    >
      <el-form>
        <el-form-item label="名称" :label-width="140">
          <el-input v-model="permissionForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="权限值" :label-width="140">
          <el-input v-model="permissionForm.code" placeholder="请输入权限值" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isAddOrEditDialog = false">取消</el-button>
          <el-button @click="addOrEditDialogConfirm" type="primary">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdatePermission,
  reqAllPermission,
  reqRemoveMenu,
} from '@/api/acl/permission/idnex.ts'
import { Permission } from '@/api/acl/permission/type.ts'
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const PermissionList = ref<Permission[]>([])
const isAddOrEditDialog = ref(false)
const permissionForm = reactive<Permission>({
  id: 0,
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
const curLevel = ref(0)

const dialogTitle = computed(() => {
  const str1 = permissionForm.id ? '编辑' : '增加'
  const str2 = curLevel.value === 3 ? '功能' : '菜单'
  return str1 + str2
})

// 确定 添加/编辑菜单
const addOrEditDialogConfirm = async () => {
  const res = await reqAddOrUpdatePermission(permissionForm)
  if (res.code === 200) {
    ElMessage.success({
      message: permissionForm.id ? '编辑成功！' : '添加成功！',
    })
    isAddOrEditDialog.value = false
    await refreshPermissionData()
  }
}

// 对话框 关闭时
const addOrEditDialogClose = () => {
  Object.assign(permissionForm, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
}

// 处理编辑按钮
const editPermissionHandler = (row: Permission) => {
  curLevel.value = row.level
  Object.assign(permissionForm, row)
  isAddOrEditDialog.value = true
}

// 处理添加按钮
const addPermissionHandler = (row: Permission) => {
  curLevel.value = row.level
  permissionForm.level = row.level + 1
  permissionForm.pid = row.id!
  isAddOrEditDialog.value = true
}

// 挂载的时候刷新权限数据
onMounted(() => {
  refreshPermissionData()
})

// 刷新权限数据
const refreshPermissionData = async () => {
  const res = await reqAllPermission()
  if (res.code === 200) {
    PermissionList.value = res.data
  }
}
// 删除权限数据
const deletePermission = async (id: number) => {
  const res = await reqRemoveMenu(id)
  if (res.code === 200) {
    await refreshPermissionData()
    ElMessage.success({
      message: '删除成功！',
    })
  }
}
</script>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'permission',
}
</script>
