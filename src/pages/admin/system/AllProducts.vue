<template>
  <div class="container">
    <el-button style="margin-bottom: 10px" plain type="primary"
      >添加分类</el-button
    >
    <el-button style="margin-bottom: 10px" plain type="primary">刷新</el-button>
    <el-table :data="tableData" border style="width: 580px">
      <el-table-column prop="categoryId" label="ID" width="50px">
      </el-table-column>
      <el-table-column prop="categoryName" label="分类名称" width="130px">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="该分类下的商品数量"
        width="200px"
      >
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '../../../utils/request'
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    request.get('/category/all').then((res) => {
      this.tableData = []
      res.forEach((e) => {
        this.tableData.push(e)
      })
    })
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>