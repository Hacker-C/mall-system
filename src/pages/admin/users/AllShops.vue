<template>
  <Container>
    <template slot>
      <SubHeader>
        <template v-slot>管理所有商家</template>
      </SubHeader>
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
        <el-button type="primary" @click="refreshTable">刷新</el-button>
      </el-form>
      <el-table :data="tableData" style="margin-top: 10px" border stripe>
        <el-table-column
          prop="index"
          label="序号"
          sortable
          style="height: 30px"
          width="70px"
          align="center"
        ></el-table-column>
        <el-table-column align="center" prop="username" label="用户名">
        </el-table-column>
        <el-table-column align="center" prop="realName" label="真实姓名">
        </el-table-column>
        <el-table-column align="center" prop="telephone" label="联系电话">
        </el-table-column>
        <el-table-column align="center" prop="shopName" label="店铺名字">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="开店时间">
        </el-table-column>
        <el-table-column align="center" prop="income" label="总收入">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="账号状态"
          width="100px"
        >
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
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="160px"
        >
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
              circle=""
              @click.native.prevent="seeDetail(scope.row)"
            >
              <i class="far fa-eye"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 查看商品 -->
      <el-dialog
        title="查看该店所有商品"
        :visible.sync="dialogFormVisible2"
        width="70%"
      >
        <el-table :data="shopProducts" border>
          <el-table-column
            prop="index"
            label="序号"
            width="100px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="productName"
            label="商品名称"
            width="130px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="单价"
            width="70px"
            align="center"
          >
          </el-table-column>
          <el-table-column label="商品图片" align="center" width="100px">
            <template #default="scope">
              <el-image
                style="height: 70px"
                :src="scope.row.imgSrc"
                :preview-src-list="[scope.row.imgSrc]"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="productDesc"
            label="描述"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 分页 -->
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

      <!-- 修改信息弹出 -->
      <el-dialog
        title="填入个人信息"
        :visible.sync="dialogFormVisible"
        width="50%"
      >
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="真实姓名" style="margin-bottom: 7px">
            <el-input v-model="form.realName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" style="margin-bottom: 7px">
            <el-input v-model="form.telephone" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="店铺名字" style="margin-bottom: 7px">
            <el-input v-model="form.shopName" style="width: 200px"></el-input>
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
    </template>
  </Container>
</template>

<script>
import request from '../../../utils/request'
const SubHeader = () => import('../../components/SubHeader.vue')
const Container = () => import('../../components/Container.vue')

export default {
  components: {
    SubHeader,
    Container
  },
  name: 'Home',
  data() {
    return {
      form: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      // pageSize是表示一页最多可以装几条数据
      pageSize: 10,
      // 表示请求第几页数据
      pageNum: 1,
      // 查询关键字
      key: '',
      // 总共几条数据
      total: 0,
      tableData: [],
      shopProducts: []
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
    seeDetail(row) {
      this.dialogFormVisible2 = true
      request.get('/product/shop_id/' + row.shopId).then((res) => {
        this.shopProducts = []
        res.data.forEach((e, i) => {
          e.index = i + 1
          this.shopProducts.push(e)
        })
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
            // !设置标志字段，表示查询所有店家
            flag: 'shop',
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
            res.data.data.forEach((e, index) => {
              request
                .get('/shop/' + e.userId)
                .then((res) => {
                  e.shopName = res.data.shopName
                  e.shopId = res.data.shopId
                  e.income = res.data.income
                  e.index = index + 1
                  e.createTime = e.createTime.slice(0, 10)
                })
                .then(() => {
                  this.tableData.push(e)
                })
            })
          }
        })
    },
    save() {
      // 修改商家数据
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
    }
  },
  created() {
    this.load()
  }
}
</script>
