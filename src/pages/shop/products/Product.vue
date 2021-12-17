<template>
  <el-col style="padding: 10px">
    <el-button type="primary" @click="addUser">新增</el-button>
    <el-button type="primary" @click="refreshTable">刷新</el-button>
    <el-form @submit.native.prevent>
      <el-input
        v-model="key"
        placeholder="请输入内容"
        style="margin-top: 10px; width: 250px"
        clearable
      ></el-input>
      <el-button type="primary" style="margin-left: 10px" @click="search"
        >查询</el-button
      >
    </el-form>
    <el-table :data="tableData" style="margin-top: 10px" border stripe>
      <el-table-column
        prop="productId"
        label="ID"
        sortable
        width="70px"
      ></el-table-column>
      <el-table-column prop="productName" label="商品名"> </el-table-column>
      <el-table-column prop="productPrice" label="单价"> </el-table-column>
      <!-- <el-table-column prop="imgSrc" label="封面"> </el-table-column> -->
      <el-table-column prop="categoryId" label="分类"> </el-table-column>
      <el-table-column prop="weight" label="重量"> </el-table-column>
      <el-table-column prop="discount" label="折扣"> </el-table-column>
      <el-table-column prop="left" label="剩余"> </el-table-column>
      <el-table-column prop="sold" label="已售"> </el-table-column>
      <el-table-column prop="productDesc" label="描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="rate" label="评分" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 10px"
    >
    </el-pagination>

    <!-- 添加信息弹出 -->
    <el-dialog
      title="修改商品信息"
      :visible.sync="dialogFormVisible"
      width="50%"
    >
      <el-form ref="form" :model="form" label-width="60px">
        <el-row type="flex">
          <el-col>
            <el-form-item label="商品名" style="margin-bottom: 7px">
              <el-input
                v-model="form.productName"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="单价" style="margin-bottom: 7px">
              <el-input
                v-model="form.productPrice"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="分类" style="margin-bottom: 7px">
              <el-input
                v-model="form.categoryId"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label="重量" style="margin-bottom: 7px">
              <el-input v-model="form.weight" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="描述" style="margin-bottom: 7px">
              <el-input
                type="textarea"
                v-model="form.productDesc"
                style="width: 200px"
                rows="6"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="折扣" style="margin-bottom: 7px">
              <el-input v-model="form.discount" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="剩余" style="margin-bottom: 7px">
              <el-input v-model="form.left" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="已售" style="margin-bottom: 7px">
              <el-input v-model="form.sold" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="封面">
              <el-upload
                action="http://localhost:8081/files/upload"
                :on-success="uploadSuccess"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import request from '../../../utils/request'

export default {
  name: 'Home',
  data() {
    return {
      form: {},
      dialogFormVisible: false,
      // pageSize是表示一页最多可以装几条数据
      pageSize: 10,
      // 表示请求第几页数据
      pageNum: 1,
      // 查询关键字
      key: '',
      // 总共几条数据
      total: 100,
      tableData: []
    }
  },
  methods: {
    // 刷新表格
    refreshTable() {
      this.load()
      this.$message({
        message: '刷新成功！',
        type: 'success'
      })
    },
    // 删除
    deleteRow(index, rows) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let deleteId = rows[index].id
          rows.splice(index, 1)
          request.delete('/user/' + deleteId).then((res) => {
            if (res === 0) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    search() {
      this.load()
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.load()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pageNum = val
      this.load()
    },
    // 加载表格数据
    load() {
      let uId = sessionStorage.getItem('userId')
      request
        .get('/product/shop', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            key: this.key,
            ownerId: uId
          }
        })
        .then((res) => {
          this.total = res.data.total
          this.tableData = []
          for (let i of res.data.data) {
            this.tableData.push(i)
          }
        })
    },
    addUser() {
      this.dialogFormVisible = true
      this.form = {}
    },
    uploadSuccess(res) {
      this.form.imgSrc = res.data
    },
    save() {
      if (this.form.productId) {
        // 若此调数据有id，则进行更新操作，同步数据库，进行PUT请求
        request
          .put('/product', this.form)
          .then((res) => {
            if (res.code === '0') {
              this.dialogFormVisible = false
              this.$message({
                message: '恭喜你，修改成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: '修改失败，请联系管理员！',
                type: 'failed'
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
          .then(() => {
            // 刷新表格数据
            this.load()
          })
      } else {
        request
          .post('/user', this.form)
          .then((res) => {
            if (res === 0) {
              this.dialogFormVisible = false
              this.$message({
                message: '恭喜你，添加成功！',
                type: 'success'
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
          .then(() => {
            // 刷新表格数据
            this.load()
          })
      }
    }
  },
  created() {
    this.load()
  }
}
</script>

<style>
</style>