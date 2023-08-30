<template>
  <div>
    <!-- 搜索栏 -->
    <el-card style="height: 80px">
      <el-form class="search-bar" inline>
        <el-form-item label="用户搜索">
          <el-input
            ref="searchInpRef"
            v-model="searchTxt"
            placeholder="请输入要搜索的用户名"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            @click="searchUser"
            :disabled="!searchTxt.length"
            type="primary"
          >
            搜索
          </el-button>
          <el-button @click="settingStore.isRefresh = !settingStore.isRefresh">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 展示区域 -->
    <el-card style="margin: 32px 0">
      <el-button @click="addOrEditUserBtHandler" type="primary">
        添加用户
      </el-button>
      <el-button
        @click="batchDelete"
        :disabled="selectedIdList.length === 0"
        type="danger"
      >
        批量删除
      </el-button>
      <!-- 表格 -->
      <el-table
        @selection-change="selectChange"
        style="margin: 10px 0"
        border
        :data="userInfoList"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column label="#" align="center" type="index" />
        <el-table-column label="id" align="center" prop="id" />
        <el-table-column
          label="用户名字"
          align="center"
          prop="username"
          show-overflow-tooltip
        />
        <el-table-column
          label="用户昵称"
          align="center"
          prop="name"
          show-overflow-tooltip
        />
        <el-table-column
          label="用户角色"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        />
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #default="{ row }">
            <el-button
              size="small"
              icon="User"
              @click="assignRoleBtHandler(row)"
            >
              分配角色
            </el-button>
            <el-button
              @click="addOrEditUserBtHandler(row)"
              type="primary"
              size="small"
              icon="Edit"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定删除${row.username}`"
              width="260px"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="curPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="sizeChange"
        @current-change="refreshUserInfo"
      />
    </el-card>

    <!-- 增加/编辑用户的抽屉 -->
    <el-drawer v-model="isAddEditDrawer" @close="addOrEditDrawerClose">
      <template #header>
        <h1>{{ userForm.id ? '编辑用户' : '添加用户' }}</h1>
      </template>

      <template #default>
        <el-form ref="userFormRef" :model="userForm" :rules="rules">
          <el-form-item prop="username" label="用户姓名">
            <el-input
              v-model="userForm.username"
              placeholder="请输入用户姓名"
            />
          </el-form-item>
          <el-form-item prop="name" label="用户昵称">
            <el-input v-model="userForm.name" placeholder="请输入用户昵称" />
          </el-form-item>
          <el-form-item v-if="!userForm.id" prop="password" label="用户密码">
            <el-input
              v-model="userForm.password"
              placeholder="请输入用户密码"
            />
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <el-button @click="isAddEditDrawer = false">取消</el-button>
        <el-button @click="addOrEditUser" type="primary">确定</el-button>
      </template>
    </el-drawer>

    <!-- 分配角色的抽屉  -->
    <el-drawer v-model="isAssignDrawer">
      <template #header>
        <h1>分配角色</h1>
      </template>

      <template #default>
        <el-form v-model="assignRoleForm">
          <el-form-item label="用户姓名">
            <el-input
              v-model="assignRoleForm.username"
              placeholder="请输入用户姓名"
              disabled
            />
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="isCheckAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="assignRoleForm.selectedRoleIdList"
              @change="handleCheckedRolesChange"
            >
              <el-checkbox
                v-for="item in assignRoleForm.allRoleInfoList"
                :key="item.id"
                :label="item.id"
              >
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <el-button @click="isAssignDrawer = false">取消</el-button>
        <el-button @click="assignRoleConfirm" type="primary">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateUser,
  reqAllRoleById,
  reqDeleteSelectedUser,
  reqRemoveUser,
  reqSetUserRole,
  reqUserInfo,
} from '@/api/acl/user/idnex.ts'
import { RoleData, User } from '@/api/acl/user/type.ts'
import useSettingStore from '@/store/modules/setting.ts'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const curPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const searchTxt = ref('')
const isAddEditDrawer = ref(false)
const isAssignDrawer = ref(false)
const searchInpRef = ref()
const settingStore = useSettingStore()

const isCheckAll = ref(false)
const isIndeterminate = ref(false)

const userInfoList = ref<User[]>([])
const selectedIdList = ref<number[]>([])
const userFormRef = ref<FormInstance>()

// 用户表单数据
const userForm = reactive({
  id: 0,
  username: '',
  name: '',
  password: '',
})

interface assignRole {
  userId: number
  username: string
  allRoleInfoList: RoleData[]
  selectedRoleIdList: number[]
}

const assignRoleForm = reactive<assignRole>({
  userId: 0,
  username: '',
  allRoleInfoList: [],
  selectedRoleIdList: [],
})

// 分配角色 确定 按钮
const assignRoleConfirm = async () => {
  const res = await reqSetUserRole({
    userId: assignRoleForm.userId,
    roleIdList: assignRoleForm.selectedRoleIdList,
  })
  if (res.code === 200) {
    await refreshUserInfo()
    ElMessage.success({
      message: '分配角色成功！',
    })
    isAssignDrawer.value = false
  }
}

// 处理点击分配角色按钮
const assignRoleBtHandler = async (row: User) => {
  const res = await reqAllRoleById(row.id!)
  if (res.code === 200) {
    assignRoleForm.userId = row.id!
    assignRoleForm.selectedRoleIdList = []
    res.data.assignRoles.forEach((item: RoleData, index: number) => {
      assignRoleForm.selectedRoleIdList[index] = item.id!
    })
    assignRoleForm.allRoleInfoList = res.data.allRolesList
    assignRoleForm.username = row.name!
    isAssignDrawer.value = true
  }
}

// 关闭 添加/编辑 用户抽屉时触发
const addOrEditDrawerClose = () => {
  userFormRef.value?.clearValidate()
  Object.assign(userForm, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
}

// 处理 添加/编辑 用户按钮
const addOrEditUserBtHandler = (row?: User) => {
  if (row) {
    Object.assign(userForm, {
      id: row.id,
      username: row.username,
      name: row.name,
    })
  }
  isAddEditDrawer.value = true
}

// 确认 添加/修改 用户按钮
const addOrEditUser = async () => {
  try {
    await userFormRef.value?.validate()
    const res = await reqAddOrUpdateUser(userForm)
    if (res.code === 200) {
      await refreshUserInfo()
      ElMessage.success({
        message: userForm.id ? '修改成功！' : '添加成功！',
      })
      isAddEditDrawer.value = false
    }
  } catch (e) {
    console.error(e)
  }
}

// 用户名验证
const validateUserName = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('此项为必填项！'))
  } else if (/^\d+$/.test(value)) {
    return callback(new Error('用户名称不能使用纯数字！'))
  } else if (value?.length < 5) {
    return callback(new Error('名字必须大于5个字符！'))
  } else {
    callback()
  }
}

// 昵称验证
const validateName = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('此项为必填项！'))
  } else if (value?.length < 5) {
    return callback(new Error('名字必须大于5个字符！'))
  } else {
    callback()
  }
}

// 密码验证
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('此项为必填项！'))
  } else if (value.length < 6) {
    return callback(new Error('密码必须大于6个字符！'))
  } else {
    callback()
  }
}

// 添加/修改用户表单验证规则
const rules = reactive<FormRules>({
  username: [{ required: true, validator: validateUserName, trigger: 'blur' }],
  name: [{ required: true, validator: validateName, trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
})

// 批量删除用户
const batchDelete = async () => {
  const res = await reqDeleteSelectedUser(selectedIdList.value!)
  if (res.code === 200) {
    await refreshUserInfo()
    ElMessage.success({
      message: '删除成功！',
    })
  }
}

// 勾选用户
const selectChange = (selectedList: User[]) => {
  if (selectedList.length === 0) selectedIdList.value = []
  selectedList.forEach((item: User) => {
    selectedIdList.value.push(item.id!)
  })
}

// 删除用户
const deleteUser = async (id: number) => {
  const res = await reqRemoveUser(id)
  if (res.code === 200) {
    await refreshUserInfo()
    ElMessage.success({
      message: '删除成功！',
    })
  }
}
// 挂载刷新数据
onMounted(() => {
  refreshUserInfo()
})

// 刷新用户信息
async function refreshUserInfo() {
  const res = await reqUserInfo(curPage.value, pageSize.value, searchTxt.value)
  if (res.code === 200) {
    userInfoList.value = res.data.records
    total.value = res.data.total
  }
}

// 搜索用户名
const searchUser = () => {
  refreshUserInfo()
  searchInpRef.value.clear()
}

// 页数限制改变
const sizeChange = () => {
  curPage.value = 1
  refreshUserInfo()
}

// 全选
const handleCheckAllChange = (isCheckAll: boolean) => {
  if (isCheckAll) {
    assignRoleForm.allRoleInfoList.forEach((item, index) => {
      assignRoleForm.selectedRoleIdList[index] = item.id!
    })
  } else {
    assignRoleForm.selectedRoleIdList = []
  }
  isIndeterminate.value = false
}

// 部分勾选改变事件
const handleCheckedRolesChange = (value: string[]) => {
  console.log(value)
  const checkedCount = value.length
  isCheckAll.value = checkedCount === assignRoleForm.allRoleInfoList.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < assignRoleForm.allRoleInfoList.length
}
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<script lang="ts">
export default {
  name: 'user',
}
</script>
