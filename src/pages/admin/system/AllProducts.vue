<template>
  <Container>
    <template slot>
      <SubHeader>
        <template v-slot>管理所有商品分类</template>
      </SubHeader>
      <el-button style="margin-bottom: 10px" type="primary" @click="addCategory"
        >添加分类</el-button
      >
      <el-button
        style="margin-bottom: 10px"
        plain
        type="primary"
        @click="refresh"
        >刷新</el-button
      >
      <el-table :data="tableData" border style="width: 580px">
        <el-table-column
          align="center"
          prop="categoryId"
          label="ID"
          width="50px"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="categoryName"
          label="分类名称"
          width="130px"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="count"
          label="该分类下的商品数量"
          width="200px"
        >
        </el-table-column>
        <el-table-column align="center" label="操作" width="200px">
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

      <!-- 添加分类信息弹出 -->
      <el-dialog
        title="请输入要添加的商品分类名称"
        :visible.sync="dialogFormVisible"
        width="50%"
      >
        <el-form ref="form" :model="categoryForm">
          <el-form-item style="margin-bottom: 20px">
            <el-input
              v-model="categoryForm.categoryName"
              style="width: 200px"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-row type="flex" align="start">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </el-row>
      </el-dialog>

      <!-- 编辑分类信息弹出 -->
      <el-dialog
        title="修改商品分类名称"
        :visible.sync="dialogFormVisible"
        width="50%"
      >
        <el-form ref="form" :model="categoryForm">
          <el-form-item style="margin-bottom: 20px">
            <el-input
              v-model="categoryForm.categoryName"
              style="width: 200px"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-row type="flex" align="start">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </el-row>
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
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      categoryForm: {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    handleEdit(index, row) {
      this.categoryForm = row
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    refresh() {
      this.load()
    },
    addCategory() {
      this.categoryForm = {}
      this.dialogFormVisible = true
    },
    save() {
      if (!this.categoryForm.categoryId) {
        // 添加
        request
          .post('/category', this.categoryForm)
          .then((res) => {
            if (res.code === '0') {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
            } else {
              this.$message.error('添加失败！请联系网站维护员！')
            }
          })
          .catch((er) => {
            console.log(err)
          })
      } else {
        // 更新
        request.put('/category', this.categoryForm).then((res) => {
          if (res.code === '0') {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
            this.dialogFormVisible = false
          } else {
            this.$message.error('更新失败！请联系网站维护员！')
          }
        })
      }
    },
    sortData() {
      this.tableData.sort((a, b) => a.index - b.index)
    },
    getCategory() {
      return request.get('/category/all').then((res) => {
        this.$message({
          message: '获取商品分类信息成功！',
          type: 'success',
          duration: 1000
        })
        return res
      })
    },
    load() {
      this.getCategory()
        .then((res) => {
          this.tableData = []
          res.forEach((e, i) => {
            request.get('/category/' + e.categoryId).then((res2) => {
              e.index = i + 1
              e.count = res2.length
              this.tableData.push(e)
              this.sortData()
            })
          })
          // console.log(datas)
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          // 异步操作，需要放到 then 里面
        })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 5px;
  /* background-color: #fff; */
}
</style>