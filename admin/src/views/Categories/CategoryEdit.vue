<template>
  <div>
    <h1 class="el-text-l">{{id ? '编辑': '新增'}}分类</h1>
    <el-form ref="form" label-width="80px" @submit.native.prevent="save">
      <el-form-item label="父级">
        {{model}}
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props:{
    id: {}
  },
  data(){
    return {
      model:{
      },
      parents: []
    }
  },
  methods:{
    async save(){
      if(this.id){
        const res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      }else{
        const res = await this.$http.post('rest/categories', this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      // this.model = {
      //   parent: '',
      //   name: ''
      // }
      // this.fetchParents()
    },

    async fetch(){
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },

    async fetchParents(){
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    }
  },
  created(){
    this.id && this.fetch()
    this.fetchParents()
  }
}

</script>