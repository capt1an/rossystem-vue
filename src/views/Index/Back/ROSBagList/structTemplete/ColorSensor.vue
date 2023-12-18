<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="R" >
      <el-col :span="11">
        <el-input v-model.number="form.R_start" type="number" placeholder="red_start(0-255)"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.R_end" type="number" placeholder="red_end(0-255)"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="G" >
      <el-col :span="11">
        <el-input v-model.number="form.G_start" type="number" placeholder="green_start(0-255)"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.G_end" type="number" placeholder="green_end(0-255)"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="B" >
      <el-col :span="11">
        <el-input v-model.number="form.B_start" type="number" placeholder="blue_start(0-255)"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.B_end" type="number" placeholder="blue_end(0-255)"></el-input>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'ColorSensor',
  props: {
    form: Object // 接收来自父组件的表单数据对象
  },
  data() {
    return {
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    }
  }
}
</script>
