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
      <el-button @click="isAddOrEdit = true" type="primary">添加用户</el-button>
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
            <el-button size="small" icon="User" @click="isAssign = true">
              分配角色
            </el-button>
            <el-button
              @click="isAddOrEdit = true"
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
    <el-drawer v-model="isAddOrEdit">
      <template #header>
        <h1>添加/编辑用户</h1>
      </template>

      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input placeholder="请输入用户昵称" />
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input placeholder="请输入用户密码" />
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <el-button @click="isAddOrEdit = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </template>
    </el-drawer>

    <!-- 分配角色  -->
    <el-drawer v-model="isAssign">
      <template #header>
        <h1>分配角色</h1>
      </template>

      <template #default>
        <el-form>
          <el-form-item label="用户姓名" disabled>
            <el-input placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="city in cities" :key="city" :label="city">
                {{ city }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <el-button @click="isAssign = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  reqDeleteSelectedUser,
  reqRemoveUser,
  reqUserInfo,
} from '@/api/acl/user/idnex.ts'
import { User } from '@/api/acl/user/type.ts'
import useSettingStore from '@/store/modules/setting.ts'
import { ElMessage } from 'element-plus'

const curPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const searchTxt = ref('')
const isAddOrEdit = ref(false)
const isAssign = ref(false)
const searchInpRef = ref()
const settingStore = useSettingStore()

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

const userInfoList = ref<User[]>([])
const selectedIdList = ref<number[]>([])

// 批量删除用户
const batchDelete = async () => {
  const res = await reqDeleteSelectedUser(selectedIdList.value!)
  if (res.code === 200) {
    ElMessage.success({
      message: '删除成功！',
    })
    await refreshUserInfo()
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
    ElMessage.success({
      message: '删除成功！',
    })
    await refreshUserInfo()
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

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
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
