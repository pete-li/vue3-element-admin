<template>
  <div>
    <!-- 搜索栏 -->
    <el-card style="height: 80px">
      <el-form class="search-bar" inline>
        <el-form-item label="职位搜索">
          <el-input
            v-model="searchTxt"
            placeholder="请输入要搜索的职位"
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
      <el-button @click="isAddOrEdit = true" type="primary">添加职位</el-button>
      <!-- 表格 -->
      <el-table style="margin: 10px 0" border :data="[{ id: 1 }]">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column
          label="用户名字"
          align="center"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
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
              type="primary"
              size="small"
              icon="Edit"
              @click="isAddOrEdit = true"
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

    <!-- 增加/编辑角色的对话框 -->
    <el-dialog v-model="isAddOrEdit" title="增加/编辑职位">
      <el-form :model="{ name: '' }">
        <el-form-item label="职位名称" :label-width="140">
          <el-input placeholder="请输入职位名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isAddOrEdit = false">取消</el-button>
          <el-button type="primary" @click="isAddOrEdit = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 分配权限  -->
    <el-drawer v-model="isAssign">
      <template #header>
        <h1>分配权限</h1>
      </template>

      <template #default>
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        />
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

const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
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
  name: 'role',
}
</script>
