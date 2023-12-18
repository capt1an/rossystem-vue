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
      <el-input v-model="form.FrameId" placeholder="帧ID"></el-input>
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
    <el-form-item label="Distortion_model">
      <el-input v-model="form.Distortion_model" placeholder="畸变模型"></el-input>
    </el-form-item>
    <el-form-item label="D">
      <el-input v-model="form.D" placeholder="畸变参数D"></el-input>
    </el-form-item>
    <el-form-item label="K">
      <el-input v-model="form.K" placeholder="相机内参K"></el-input>
    </el-form-item>
    <el-form-item label="R">
      <el-input v-model="form.R" placeholder="旋转矩阵R"></el-input>
    </el-form-item>
    <el-form-item label="P">
      <el-input v-model="form.P" placeholder="投影矩阵P"></el-input>
    </el-form-item>
      <el-form-item label="BinningX">
        <el-col :span="11">
          <el-input v-model.number="form.BinningX_start" type="number" placeholder="图像横向缩放比例"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-input v-model.number="form.BinningX_end" type="number" placeholder="图像横向缩放比例"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="BinningY">
        <el-col :span="11">
          <el-input v-model.number="form.BinningY_start" type="number" placeholder="图像纵向缩放比例"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-input v-model.number="form.BinningY_end" type="number" placeholder="图像纵向缩放比例"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="XOffset">
        <el-col :span="11">
          <el-input v-model.number="form.XOffset_start" type="number" placeholder="图像横向偏移量"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-input v-model.number="form.XOffset_end" type="number" placeholder="图像横向偏移量"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="YOffset">
        <el-col :span="11">
          <el-input v-model.number="form.YOffset_start" type="number" placeholder="图像纵向偏移量"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-input v-model.number="form.YOffset_end" type="number" placeholder="图像纵向偏移量"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="Height_roi">
        <el-col :span="11">
          <el-input v-model.number="form.Height_roi_start" type="number" placeholder="图像感兴趣区域高度"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-input v-model.number="form.Height_roi_end" type="number" placeholder="图像感兴趣区域高度"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="Width_roi">
        <el-col :span="11">
          <el-input v-model.number="form.Width_roi_start" type="number" placeholder="图像感兴趣区域宽度"></el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-input v-model.number="form.Width_roi_end" type="number" placeholder="图像感兴趣区域宽度"></el-input>
        </el-col>
      </el-form-item>
    <el-form-item label="DoRectify">
      <el-input v-model="form.DoRectify" placeholder="是否需要矫正图像"></el-input>
    </el-form-item>
  </el-form>

</template>



<script>

export default {
  name: 'CamInfo',
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
