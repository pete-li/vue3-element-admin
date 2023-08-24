<template>
  <div>
    <!-- 搜索栏 -->
    <el-card style="height: 80px">
      <el-form class="search-bar" inline>
        <el-form-item label="用户搜索">
          <el-input
            v-model="searchTxt"
            placeholder="请输入要搜索的用户名"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button :disabled="!searchTxt.length" type="primary">
            搜索
          </el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 展示区域 -->
    <el-card style="margin: 32px 0">
      <el-button @click="isAddOrEdit = true" type="primary">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>
      <!-- 表格 -->
      <el-table style="margin: 10px 0" border :data="[{ id: 1 }]">
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
              @confirm="row"
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
        @size-change="null"
        @current-change="null"
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
import { ref } from 'vue'

const curPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const searchTxt = ref('')
const isAddOrEdit = ref(false)
const isAssign = ref(false)

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

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
