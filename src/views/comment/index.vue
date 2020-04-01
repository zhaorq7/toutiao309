<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column width="700" label="标题" prop="title"></el-table-column>
      <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作">
        <!--        作用域插槽    slot-scope="变量"  -->
        <!--        其实就是  row  column  $index store 的集合     obj.row-->
        <template slot-scope="obj">
          <el-button size="small" @click="openOrClose(obj.row)" type="text">{{obj.row.comment_status ? '关闭评论':'打开评论'}}</el-button>
<!--          <el-button size="small">打开或关闭评论</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <!--    数据-->
    <!--    分页  !!!!!! -->
    <el-row type="flex" justify="center" style="margin: 10px 0">
      <!--      分页插件   current-page  当前页码每页显示多少条    @current-change 实际上就是一个方法   page-size    total 总数-->
      <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize"
                     :total="page.total" background layout="prev,pager,next"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          title: '',
          comment_status: '',
          total_comment_count: '',
          fans_comment_count: ''
        }
      ],
      page: {
        page: 1,
        pageSize: 4,
        total: 0
      }
    }
  },
  methods: {
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否要${mess}评论?`, '提示').then(() => {
        // 改变状态
        // 请求
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id }, // 唯一标识
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          // 重新渲染列表
          this.getComments()
        })
      })
    },
    changePage (newPage) {
      // 分页功能

      // 那个需要修改 total  pagesize  page
      this.page.page = newPage
      this.getComments()
    },
    getComments () {
      this.$axios({
        url: '/comments',
        params: {
          // 0  1  类型  true  false   类型要告知
          // 条数
          // 页数
          response_type: 'comment',
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(result => {
        // console.log(result.data.results)
        this.list = result.data.results// 表格数据
        this.page.total = result.data.total_count
      })// 拿到数据 渲染上去
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style scoped>

</style>
