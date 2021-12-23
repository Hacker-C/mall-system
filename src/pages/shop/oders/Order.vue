<template>
  <Container>
    <template v-slot>
      <SubHeader style="position: relative">
        <template v-slot>
          管理本店所有订单
          <el-button
            size="medium"
            type="primary"
            @click="filterTable(0)"
            class="waitPay"
            >待付款</el-button
          >
          <el-button
            size="medium"
            type="primary"
            @click="filterTable(1)"
            class="waitSend"
            >待发货</el-button
          >
          <el-button
            size="medium"
            type="primary"
            @click="filterTable(2)"
            class="cancel"
            >已取消</el-button
          >
          <el-button
            size="medium"
            type="primary"
            @click="filterTable(3, true)"
            class="finish"
            >已完成</el-button
          >
          <el-button
            size="medium"
            type="primary"
            @click="refreshTable"
            class="refresh"
            >所有订单</el-button
          >
        </template>
      </SubHeader>
      <el-table :data="tableData" style="margin-top: 10px" border stripe>
        <el-table-column
          prop="index"
          label="序号"
          style="height: 30px"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          width="140px"
          align="center"
          prop="orderNumber"
          label="订单编号"
        >
        </el-table-column>
        <el-table-column
          width="100px"
          align="center"
          prop="createTime"
          label="下单时间"
        >
        </el-table-column>
        <el-table-column
          width="100px"
          align="center"
          prop="realName"
          label="收货人姓名"
        >
        </el-table-column>
        <el-table-column align="center" prop="address" label="发货地址">
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderAmount"
          label="订单总额（元）"
        >
        </el-table-column>
        <el-table-column width="100px" align="center" label="订单状态">
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="
                scope.row.orderStatus === 0
                  ? 'danger'
                  : scope.row.orderStatus === 1
                  ? 'primary'
                  : scope.row.orderStatus === 2
                  ? 'info'
                  : 'success'
              "
            >
              {{ currentStatus(scope.row.orderStatus) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          width="220px"
          align="center"
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              :disabled="!(scope.row.orderStatus === 1)"
              type="success"
              @click.native.prevent="send(scope.$index, tableData)"
              size="mini"
              >发 货</el-button
            >
            <el-button
              type="danger"
              size="mini"
              :disabled="!(scope.row.orderStatus < 2)"
              @click.native.prevent="cancel(scope.$index, tableData)"
              >取 消</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click.native.prevent="detail(scope.$index, tableData)"
              >查看</el-button
            >
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

      <!-- 弹出商品信息 -->
      <el-dialog
        title="订单包含商品信息"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <el-table :data="products" style="margin-top: 10px" border stripe>
          <el-table-column
            prop="index"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column prop="imgSrc" label="商品图片" align="center">
            <template #default="scope">
              <el-image
                style="height: 80px"
                :src="scope.row.imgSrc"
                :preview-src-list="[scope.row.imgSrc]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="productName"
            label="商品名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="count"
            label="数量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="orderProductPrice"
            label="总价格"
            align="center"
          ></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
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
      tableData: [],
      tempData: [],
      shopId: null,
      dialogVisible: false,
      products: []
    }
  },
  methods: {
    detail(index, rows) {
      this.dialogVisible = true
      let oNumber = rows[index].orderNumber
      request.get('product/order/' + oNumber).then((res) => {
        if (res.code === '0') {
          this.products = []
          // this.products = res.data
          res.data.forEach((e, i) => {
            e.index = i + 1
            this.products.push(e)
            this.products.sort((a, b) => a.index - b.index)
          })
        }
      })
    },
    filterTable(n, flag) {
      if (flag) {
        this.tableData = this.tempData.filter((item) => item.orderStatus >= n)
        return
      }
      this.tableData = this.tempData.filter((item) => item.orderStatus === n)
    },
    // 刷新表格
    refreshTable() {
      this.load()
      this.$message({
        message: '刷新成功！',
        type: 'success'
      })
    },
    // 取消订单
    cancel(index, rows) {
      this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let oNumber = rows[index].orderNumber
          request.patch('/order/cancel/' + oNumber).then((res) => {
            if (res.code === '0') {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
              this.tableData[index].orderStatus = 2
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 发货
    send(index, rows) {
      this.$confirm('确认发货吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let oNumber = rows[index].orderNumber
          request.patch('/order/send/' + oNumber).then((res) => {
            if (res.code === '0') {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
              this.tableData[index].orderStatus = 3
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
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
      request
        .get('/order/shop', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            shopId: this.shopId
          }
        })
        .then((res) => {
          // console.log(res)
          if (res.code === '0') {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
            this.tableData = []
            this.tempData = []
            this.total = res.data.total
            this.pageNum = res.data.pageNum
            res.data.data.forEach((item, i) => {
              item.index = i + 1
              request
                .get('/user/order_number/' + item.orderNumber)
                .then((res) => {
                  item.realName = res.realName
                  item.address = res.address
                  this.tableData.push(item)
                  this.tempData.push(item)
                  this.tableData.sort((a, b) => a.index - b.index)
                  this.tempData.sort((a, b) => a.index - b.index)
                })
            })
          }
        })
        .then(() => {})
    },
    currentStatus(n) {
      if (n === 0) {
        return '待付款'
      }
      if (n === 1) {
        return '待发货'
      }
      if (n === 2) {
        return '已取消'
      }
      if (n === 3) {
        return '已完成'
      }
      return '已完成'
    },
    save() {
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
  },
  created() {
    let uId = sessionStorage.getItem('userId')
    request
      .get('/user/shop_id/' + uId)
      .then((res) => {
        this.shopId = res
      })
      .then(() => {
        this.load()
      })
  }
}
</script>

<style scoped>
.refresh,
.waitSend,
.waitPay,
.cancel,
.finish {
  position: absolute;
  right: 0;
}
.waitSend {
  right: 110px;
}
.waitPay {
  right: 210px;
}
.cancel {
  right: 310px;
}
.finish {
  right: 410px;
}
</style>