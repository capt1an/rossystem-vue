<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="LinearVel_X" >
      <el-col :span="11">
        <el-input v-model.number="form.LinearVel_X_start" type="number" placeholder="机器人的前进速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.LinearVel_X_end" type="number" placeholder="机器人的前进速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="LinearVel_Y" >
      <el-col :span="11">
        <el-input v-model.number="form.LinearVel_Y_start" type="number" placeholder="机器人的左右移动速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.LinearVel_Y_end" type="number" placeholder="机器人的左右移动速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="LinearVel_Z" >
      <el-col :span="11">
        <el-input v-model.number="form.LinearVel_Z_start" type="number" placeholder="机器人的上下移动速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.LinearVel_Z_end" type="number" placeholder="机器人的上下移动速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="AngularVel_X" >
      <el-col :span="11">
        <el-input v-model.number="form.AngularVel_X_start"  type="number" placeholder="机器人绕着x轴旋转的速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.AngularVel_X_end" type="number" placeholder="机器人绕着x轴旋转的速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="AngularVel_Y" >
      <el-col :span="11">
        <el-input v-model.number="form.AngularVel_Y_start" type="number" placeholder="机器人绕着Y轴旋转的速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.AngularVel_Y_end" type="number" placeholder="机器人绕着Y轴旋转的速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="AngularVel_Z" >
      <el-col :span="11">
        <el-input v-model.number="form.AngularVel_Z_start" type="number" placeholder="机器人绕着z轴旋转的速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.AngularVel_Z_end" type="number" placeholder="机器人绕着z轴旋转的速度"></el-input>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CmdVel',
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
