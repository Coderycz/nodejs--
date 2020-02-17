<template>
  <div>
    <h1 class="el-text-l">{{id ? '编辑': '新增'}}英雄</h1>
    <el-form ref="form" label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="分类">
        <el-select v-model="model.categroies" placeholder="选择分类" multiple>
          <el-option
            v-for="item in categroies"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="顺风出装">
        <el-select v-model="model.items1" placeholder="选择分类" multiple>
          <el-option
            v-for="item in items"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="逆风出装">
        <el-select v-model="model.items2" placeholder="选择分类" multiple>
          <el-option
            v-for="item in items"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="难度">
        <el-rate style="margin-top: 0.6rem;" show-score :max="9" v-model="model.scores.difficult"></el-rate>
      </el-form-item>
      <el-form-item label="技能">
        <el-rate style="margin-top: 0.6rem;" show-score :max="9" v-model="model.scores.skill"></el-rate>
      </el-form-item>
      <el-form-item label="攻击">
        <el-rate style="margin-top: 0.6rem;" show-score :max="9" v-model="model.scores.attack"></el-rate>
      </el-form-item>
      <el-form-item label="生存">
        <el-rate style="margin-top: 0.6rem;" show-score :max="9" v-model="model.scores.survive"></el-rate>
      </el-form-item>

      <el-form-item label="使用技巧">
        <el-input v-model="model.usageTips"></el-input>
      </el-form-item>

      <el-form-item label="团战思路">
        <el-input v-model="model.teamTips"></el-input>
      </el-form-item>

      <el-form-item label="对抗技巧">
        <el-input v-model="model.battleTips"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" native-type="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        avatar: "",
        name: "",
        scores: {
          difficult: 0,
          skill: 0,
          attack: 0,
          survive: 0
        },
      },
      categroies: {},
      items: {},
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "avatar", res.url);
      // this.model.icon = res.url
    },
    async save() {
      if (this.id) {
        const res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        const res = await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
      // this.model = {
      //   parent: '',
      //   name: ''
      // }
      // this.fetchParents()
    },

    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data)
    },

    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categroies = res.data;
    },

    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },

    async fetchParents() {
      const res = await this.$http.get(`rest/items`);
      this.parents = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.fetchItems();
    this.id && this.fetch();
    this.fetchParents();
  }
};
</script>

<style scope lang="css">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>