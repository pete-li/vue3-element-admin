<template>
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
        <template #default="{ row }">
          <el-button :disabled="row.level === 4" size="small" @click="row">
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            :disabled="row.level === 1"
            type="primary"
            size="small"
            @click="row"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.name}?`"
            width="260px"
            @confirm="deletePermission(row.id)"
          >
            <template #reference>
              <el-button :disabled="row.level === 1" type="danger" size="small">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { reqAllPermission, reqRemoveMenu } from '@/api/acl/permission/idnex.ts'
import { Permission } from '@/api/acl/permission/type.ts'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

const PermissionList = ref<Permission[]>([])

onMounted(() => {
  refreshPermission()
})

const refreshPermission = async () => {
  const res = await reqAllPermission()
  if (res.code === 200) {
    PermissionList.value = res.data
  }
}

const deletePermission = async (id: number) => {
  const res = await reqRemoveMenu(id)
  if (res.code === 200) {
    await refreshPermission()
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
