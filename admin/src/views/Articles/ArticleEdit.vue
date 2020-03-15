<template>
  <div>
    <h1 class="el-text-l">{{id ? '编辑': '新增'}}文章</h1>
    <el-form ref="form" label-width="80px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" placeholder="请选择" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  props:{
    id: {}
  },
  data(){
    return {
      model:{
      },
      categories: [],
    }
  },
  components: {
    VueEditor
  },
  methods:{
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
 
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save(){
      if(this.id){
        const res = await this.$http.put(`rest/articles/${this.id}`, this.model)
      }else{
        const res = await this.$http.post('rest/articles', this.model)
      }
      this.$router.push('/articles/list')
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
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },

    async fetchCategories(){
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    }
  },
  created(){
    this.id && this.fetch()
    this.fetchCategories()
  }
}

</script>