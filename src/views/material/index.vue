<template>
<el-card class="material">
  <bread-crumb  slot="header">
    <template slot="title">素材管理</template>
  </bread-crumb>
<!--  上传组件-->
  <el-upload :show-file-list="false" class="upload-btn" :http-request="uploadImg">
    <el-button size="small" type="primary">上传图片</el-button>
  </el-upload>
<!--  tab-->
  <el-tabs v-model="activeName" @tab-click="changeTab">
    <el-tab-pane label="全部素材" name="all">
      <div class="card-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img :src="item.url" alt="">
          <el-row class="operate" type="flex" align="middle" justify="space-around">
            <i @click="collectOrCancel(item)" class="el-icon-star-on"  :style="{color:item.is_collected ? 'red' : ''}"></i>
            <i @click="delImg(item)" class="el-icon-delete-solid"></i>
          </el-row>
        </el-card>
      </div>

<!--      分页-->
      <el-row type="flex" justify="center">
        <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev,pager,next"></el-pagination>
      </el-row>

    </el-tab-pane>
    <el-tab-pane label="收藏素材"  name="collect">
      <div class="card-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img :src="item.url" alt="">
        </el-card>
      </div>

      <!--      分页-->
      <el-row type="flex" justify="center">
        <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev,pager,next"></el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // all / collect
      page: {
        page: 1,
        pageSize: 2,
        total: 0
      },
      list: []
    }
  },
  methods: {
    // 选择完图片执行
    uploadImg (params) {
      // formdata 类型
      console.log(params)
      const obj = new FormData()
      obj.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: obj
      }).then(() => {
        // 重新请求数据
        // this.getMaterial()
      })
    },
    delImg (item) {
      this.$confirm('亲确定要删除此素材吗?', '提示').then(() => {
        //  确定要删除  请求 删除接口   (delete)  传参  /user/images/id
        // 重新加载数据
        console.log(999)
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'delete'
        }).then(() => {
          // 重新加载
          this.getMaterial()
        })
      })
    },
    collectOrCancel (item) {
      // 收藏或取消
      const mess = item.is_collected ? '取消' : ''
      this.$confirm(`亲确定要${mess}收藏这个素材吗?`).then(() => {
        // 请求接口  ( put )
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: {
            collect: !item.is_collected
          }
        }).then(() => {
          // 重新加载
          this.getMaterial()
        })
      })
    },
    changeTab () {
      // 全部和收藏  来回切换 调用
      // activeName  变
      // page.page = 1

      this.page.page = 1
      this.getMaterial()
    },
    changePage (newPage) {
      // 点击分页
      this.page.page = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        // 分页   当前看的是哪个模块 (默认all)
        params: {
          page: this.page.page,
          per_page: this.page.pageSize, // 每页几条
          collect: this.activeName === 'collect'
        }
      }).then(result => {
        // console.log(result)
        // 数据  list赋值
        this.list = result.data.results
        // 分页 total 设置
        this.page.total = result.data.total_count
      })
    }

  },
  created () {
    this.getMaterial()
  }
}
</script>

<style  lang="less" scoped>
  .material {
    .card-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .img-card {
        width: 180px;
        height: 180px;
        margin: 30px;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        .operate {
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          height: 30px;
          background-color: #f4f5f6;
          font-size: 18px;
        }
      }
    }
  }
</style>
