<template>
  <div>
    <h1>分类名称</h1>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="日期" width="300"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类" ></el-table-column>
      <el-table-column prop="name" label="分类名称" ></el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("categories");
      this.items = res.data;
    },
    remove(row){
      this.$confirm(`此操作将删除 "${row.name}" `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log()
          this.$http.delete(`categories/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        },() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        })
    }
  },
  created() {
    this.fetch();
  }
};
</script>


