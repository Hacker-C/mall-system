<template>
  <el-col class="container">
    <SubHeader>
      <template v-slot> 管理本店所有商品 </template>
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
      <el-button type="primary" @click="addProduct">新增</el-button>
      <el-button type="primary" @click="refreshTable">刷新</el-button>
    </el-form>

    <el-table :data="tableData" style="margin-top: 10px" border stripe>
      <el-table-column
        prop="index"
        label="序号"
        width="70px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="商品名"
        width="80px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="productPrice"
        sortable
        label="单价"
        width="90px"
        align="center"
      >
      </el-table-column>
      <!-- <el-table-column prop="imgSrc" label="封面"> </el-table-column> -->
      <el-table-column label="分类" width="80px" align="center">
        <template #default="scope">
          <div>{{ getCategory(scope.row.categoryId) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="70px" align="center">
      </el-table-column>
      <el-table-column prop="discount" label="折扣" width="70px" align="center">
      </el-table-column>
      <el-table-column prop="left" label="剩余" width="70px" align="center">
      </el-table-column>
      <el-table-column label="封面" align="center">
        <template #default="scope">
          <el-image
            style="height: 100px"
            :src="scope.row.imgSrc"
            :preview-src-list="[scope.row.imgSrc]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="productDesc" label="描述" show-overflow-tooltip>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
          ></el-button>
          <el-tooltip content="查看商品销售信息" placement="top">
            <el-button
              @click="showSale(scope.row)"
              type="primary"
              icon="el-icon-info"
              circle
              size="mini"
            ></el-button>
          </el-tooltip>

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

    <!-- 修改商品弹出 -->
    <el-dialog
      title="填写商品信息"
      :visible.sync="dialogFormVisible"
      class="add"
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
              <el-select
                v-model="form.categoryId"
                placeholder="请选择"
                style="width: 200px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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

            <el-form-item label="封面">
              <el-upload
                action="http://localhost:8081/files/upload"
                :on-success="uploadSuccess"
                ref="upload"
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
    <!-- 查看商品销售信息弹出 -->
    <el-dialog title="商品销售情况" :visible.sync="dialogFormVisible2">
      <el-descriptions :column="2" :border="true" direction="vertical">
        <el-descriptions-item label="已售量">{{
          form.sold
        }}</el-descriptions-item>
        <el-descriptions-item label="商品评分">{{
          form.rate
        }}</el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
import request from '../../../utils/request'
const SubHeader = () => import('../../components/SubHeader.vue')

export default {
  components: {
    SubHeader
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
      options: [],
      value: '',
      timer: null,
      uId: sessionStorage.getItem('userId')
    }
  },
  created() {
    this.load()
    request
      .get('/category/all')
      .then((res) => {
        this.options = []
        res.forEach((c) => {
          let [value, label] = [c.categoryId, c.categoryName]
          let category = { value, label }
          this.options.push(category)
        })
      })
      .catch((err) => {
        console.log(err)
      })
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

      this.$nextTick(() => {
        this.$refs['upload'].clearFiles()
      })
    },
    // 查看销售信息
    showSale(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible2 = true
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
          res.data.data.forEach((e, i) => {
            e.index = i + 1
            this.tableData.push(e)
          })
        })
    },
    addProduct() {
      this.dialogFormVisible = true
      this.form = {}
      // 清空原文件内容
      this.$nextTick(() => {
        this.$refs['upload'].clearFiles()
      })
    },
    uploadSuccess(res) {
      this.form.imgSrc = res.data
    },
    getCategory(val) {
      let res = ''
      this.options.some((item) => {
        if (val == item.value) {
          res = item.label
          return true
        }
      })
      return res
    },
    getShopInfo() {
      return request.get('/shop/' + this.uId).then((res) => {
        return res
      })
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
        this.getShopInfo().then((res1) => {
          this.form.shopId = res1.data.shopId
          request
            .post('/product', this.form)
            .then((res) => {
              if (res.code === '0') {
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 1000
                })
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                  this.dialogFormVisible = false
                  this.load()
                }, 1000)
              }
            })
            .catch((err) => {
              console.log(err)
            })
            .then(() => {
              // 刷新表格数据
              this.load()
            })
        })
      }
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 5px;
}
</style>