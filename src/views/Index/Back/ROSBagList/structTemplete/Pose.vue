<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="X" >
      <el-col :span="11">
        <el-input v-model.number="form.X_start" type="number" placeholder="海龟在X轴上的位置坐标开始"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.X_end" type="number" placeholder="海龟在X轴上的位置坐标结束"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Y" >
      <el-col :span="11">
        <el-input v-model.number="form.Y_start" type="number" placeholder="海龟在Y轴上的位置坐标开始"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Y_end" type="number" placeholder="海龟在Y轴上的位置坐标结束"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Theta" >
      <el-col :span="11">
        <el-input v-model.number="form.Theta_start" type="number" placeholder="海龟的朝向开始"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Theta_end" type="number" placeholder="海龟的朝向结束"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Linear_velocity" >
      <el-col :span="11">
        <el-input v-model.number="form.Linear_velocity_start" type="number" placeholder="海龟的线速度开始"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Linear_velocity_end" type="number" placeholder="海龟的线速度结束"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Angular_velocity" >
      <el-col :span="11">
        <el-input v-model.number="form.Angular_velocity_start" type="number" placeholder="海龟的角速度开始"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Angular_velocity_end" type="number" placeholder="海龟的角速度结束"></el-input>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Pose',
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
