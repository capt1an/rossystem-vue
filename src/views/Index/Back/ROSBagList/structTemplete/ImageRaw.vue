<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Seq">
      <el-col :span="11">
        <el-input v-model.number="form.Seq_start" type="number" placeholder="图像序列号"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Seq_end" type="number" placeholder="图像序列号"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Stamp">
      <el-col :span="11">
        <el-input v-model.number="form.Stamp_start" type="number" placeholder="时间戳"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Stamp_end" type="number" placeholder="时间戳"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="FrameId">
      <el-input v-model="form.FrameId" placeholder="图像编号"></el-input>
    </el-form-item>
    <el-form-item label="Height">
      <el-col :span="11">
        <el-input v-model.number="form.Height_start" type="number" placeholder="图像高度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Height_end" type="number" placeholder="图像高度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Width">
      <el-col :span="11">
        <el-input v-model.number="form.Width_start" type="number" placeholder="图像宽度"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Width_end" type="number" placeholder="图像宽度"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Encoding">
      <el-input v-model="form.Encoding" placeholder="图像编码方式"></el-input>
    </el-form-item>
    <el-form-item label="Is_bigendian">
      <el-radio-group v-model="form.Is_bigendian">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Step">
      <el-col :span="11">
        <el-input  v-model.number="form.Step_start" type="number" placeholder="图像步长"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Step_end" type="number" placeholder="图像步长"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Data">
      <el-input v-model="form.Data" placeholder="图像数据"></el-input>
    </el-form-item>
  </el-form>
</template>






<script>

export default {
  name: 'ImageRaw',
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
