<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Seq">
      <el-col :span="11">
        <el-input v-model.number="form.Seq_start" type="number" placeholder="起始序列号"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Seq_end" type="number" placeholder="结束序列号"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Stamp">
      <el-col :span="11">
        <el-input v-model.number="form.Stamp_start" type="number" placeholder="起始时间戳"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Stamp_end" type="number" placeholder="结束时间戳"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="FrameId">
      <el-input v-model="form.FrameId" placeholder="坐标系ID"></el-input>
    </el-form-item>
    <el-form-item label="ChildFrameId">
      <el-input v-model="form.ChildFrameId" placeholder="参考坐标系ID"></el-input>
    </el-form-item>


    <el-form-item label="TranslationX" >
      <el-col :span="11">
        <el-input v-model.number="form.TranslationX_start"  type="number" placeholder="机器人的X轴平移"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.TranslationX_end" type="number" placeholder="机器人的X轴平移"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="TranslationY" >
      <el-col :span="11">
        <el-input v-model.number="form.TranslationY_start" type="number" placeholder="机器人的Y轴平移"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.TranslationY_end" type="number" placeholder="机器人的Y轴平移"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="TranslationZ" >
      <el-col :span="11">
        <el-input v-model.number="form.TranslationZ_start" type="number" placeholder="机器人的Z轴平移"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.TranslationZ_end" type="number" placeholder="机器人的Z轴平移"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="RotationX" >
      <el-col :span="11">
        <el-input v-model.number="form.RotationX_start" type="number" placeholder="机器人绕X轴旋转"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.RotationX_end" type="number" placeholder="机器人绕X轴旋转"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="RotationY" >
      <el-col :span="11">
        <el-input v-model.number="form.RotationY_start" type="number" placeholder="机器人绕Y轴旋转"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.RotationY_end" type="number" placeholder="机器人绕Y轴旋转"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="RotationZ" >
      <el-col :span="11">
        <el-input v-model.number="form.RotationZ_start" type="number" placeholder="机器人绕Z轴旋转"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.RotationZ_end" type="number" placeholder="机器人绕Z轴旋转"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="RotationW" >
      <el-col :span="11">
        <el-input v-model.number="form.RotationW_start" type="number" placeholder="机器人绕W轴旋转"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.RotationW_end" type="number" placeholder="机器人绕W轴旋转"></el-input>
      </el-col>
    </el-form-item>
  </el-form>
</template>


<script>

export default {
  name: 'TFMessage',
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
