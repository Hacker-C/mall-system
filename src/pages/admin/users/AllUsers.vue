<template>
  <el-col style="padding: 10px" class="container">
    <el-button type="primary" @click="addUser">新增用户</el-button>
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
        prop="index"
        label="序号"
        sortable
        style="height: 30px"
        width="70px"
      ></el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="realName" label="真实姓名"> </el-table-column>
      <el-table-column prop="telephone" label="联系电话"> </el-table-column>
      <el-table-column
        prop="role"
        label="权限角色"
        width="100"
        :filters="[
          { text: '管理员', value: 'admin' },
          { text: '商家', value: 'shop' },
          { text: '客户', value: 'user' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.role === 'admin'
                ? 'primary'
                : scope.row.role === 'shop'
                ? 'warning'
                : 'success'
            "
            disable-transitions
            >{{
              scope.row.role === 'admin'
                ? '管理员'
                : scope.row.role === 'shop'
                ? '商家'
                : '客户'
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="账号状态" width="100px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setStatus($event, scope.row.userId)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="warning"
            size="mini"
            @click.native.prevent="resetPassword(scope.row)"
          >
            重置密码
          </el-button>
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
      title="填入个人信息"
      :visible.sync="dialogFormVisible"
      width="50%"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名" style="margin-bottom: 7px">
          <el-input v-model="form.username" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" style="margin-bottom: 7px">
          <el-input v-model="form.realName" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" style="margin-bottom: 7px">
          <el-input v-model="form.telephone" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="权限角色" style="margin-bottom: 7px">
          <el-radio-group v-model="form.role">
            <el-radio label="admin">管理员</el-radio>
            <el-radio label="shop">商家</el-radio>
            <el-radio label="user">客户</el-radio>
          </el-radio-group>
        </el-form-item>
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
    // 发送请求,设置用户状态
    setStatus(status, uId) {
      request
        .patch('/user/' + uId + '/' + status)
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.role === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 刷新表格
    refreshTable() {
      this.load()
    },
    // 删除
    deleteRow(index, row) {
      this.$confirm('确认删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let deleteId = row.userId
          request.delete('/user/' + deleteId).then((res) => {
            if (res.code === '0') {
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              this.load()
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
      this.form = row
      this.dialogFormVisible = true
    },
    search() {
      this.load()
    },
    handleSizeChange(val) {
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
      request
        .get('/user', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            key: this.key
          }
        })
        .then((res) => {
          if (res.code == '0') {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
            this.total = res.data.total
            this.tableData = []
            res.data.data.forEach((item, index) => {
              item.index = index + 1
              this.tableData.push(item)
            })
          }
        })
    },
    addUser() {
      this.dialogFormVisible = true
      this.form = {}
    },
    save() {
      if (this.form.userId) {
        request
          .post('user/account', this.form)
          .then((res) => {
            if (res.code === '0') {
              this.dialogFormVisible = false
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
        // 添加新用户
        request
          .post('/user/add', this.form)
          .then((res) => {
            if (res.code === '0') {
              this.dialogFormVisible = false
              this.load()
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
            }
          })
          .catch((err) => {})
      }
    },
    resetPassword(user) {
      this.$confirm('确定要重置该用户密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let uId = user.userId
          request.patch('/user/reset/' + uId).then((res) => {
            if (res.code === '0') {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
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
    }
  },
  created() {
    this.load()
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>