<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="Seq" >
      <el-col :span="11">
        <el-input v-model.number="form.Seq_start" type="number" placeholder="消息序列号开始"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Seq_end" type="number" placeholder="消息序列号结束"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Stamp" >
      <el-col :span="11">
        <el-input v-model.number="form.Stamp_start" type="number" placeholder="时间戳开始"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Stamp_end" type="number" placeholder="时间戳结束"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="FrameId">
      <el-input v-model="form.FrameId" placeholder="坐标系ID"></el-input>
    </el-form-item>
    <el-form-item label="Orientation_X" >
      <el-col :span="11">
        <el-input v-model.number="form.Orientation_X_start" type="number" placeholder="物体的姿态X轴分量"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Orientation_X_end" type="number" placeholder="物体的姿态X轴分量"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Orientation_Y" >
      <el-col :span="11">
        <el-input v-model.number="form.Orientation_Y_start" type="number" placeholder="物体的姿态Y轴分量"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Orientation_Y_end" type="number" placeholder="物体的姿态Y轴分量"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Orientation_Z" >
      <el-col :span="11">
        <el-input v-model.number="form.Orientation_Z_start" type="number" placeholder="物体的姿态Z轴分量"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Orientation_Z_end" type="number" placeholder="物体的姿态Z轴分量"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Orientation_W" >
      <el-col :span="11">
        <el-input v-model.number="form.Orientation_W_start" type="number" placeholder="物体的姿态W轴分量"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Orientation_W_end" type="number" placeholder="物体的姿态W轴分量"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Orientation_covariance">
      <el-input v-model="form.Orientation_covariance" placeholder="姿态的协方差矩阵"></el-input>
    </el-form-item>
    <el-form-item label="Angular_velocity_X" >
      <el-col :span="11">
        <el-input v-model.number="form.Angular_velocity_X_start" type="number" placeholder="绕着x轴旋转的速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Angular_velocity_X_end" type="number" placeholder="绕着x轴旋转的速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Angular_velocity_Y" >
      <el-col :span="11">
        <el-input v-model.number="form.Angular_velocity_Y_start" type="number" placeholder="机器人绕着Y轴旋转的速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Angular_velocity_Y_end"  type="number" placeholder="机器人绕着Y轴旋转的速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Angular_velocity_Z" >
      <el-col :span="11">
        <el-input v-model.number="form.Angular_velocity_Z_start" type="number" placeholder="绕着z轴旋转的速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Angular_velocity_Z_end" type="number" placeholder="绕着z轴旋转的速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Angular_velocity_covariance">
      <el-input v-model="form.Angular_velocity_covariance" placeholder="角速度的协方差矩阵"></el-input>
    </el-form-item>
    <el-form-item label="Linear_acceleration_X" >
      <el-col :span="11">
        <el-input v-model.number="form.Linear_acceleration_X_start" type="number" placeholder="绕着x轴旋转的速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model="form.Linear_acceleration_X_end" placeholder="绕着x轴旋转的速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Linear_acceleration_Y" >
      <el-col :span="11">
        <el-input v-model.number="form.Linear_acceleration_Y_start" type="number" placeholder="机器人绕着Y轴旋转的速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Linear_acceleration_Y_end" type="number" placeholder="机器人绕着Y轴旋转的速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Linear_acceleration_Z" >
      <el-col :span="11">
        <el-input v-model.number="form.Linear_acceleration_Z_start" type="number" placeholder="绕着z轴旋转的速度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Linear_acceleration_Z_end" type="number" placeholder="绕着z轴旋转的速度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Linear_acceleratio_covarianc">
      <el-input v-model="form.Linear_acceleratio_covariance" placeholder="姿态的协方差矩阵"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'Imu',
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
