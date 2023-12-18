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

    <el-form-item label="Level">
      <el-col :span="11">
        <el-input v-model.number="form.Level_start" type="number" placeholder="消息的级别"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Level_end" type="number" placeholder="消息的级别"></el-input>
      </el-col>
    </el-form-item>

    <el-form-item label="Name">
      <el-input v-model="form.Name" placeholder="消息名"></el-input>
    </el-form-item>
    <el-form-item label="Msg">
      <el-input v-model="form.Msg" placeholder="消息内容"></el-input>
    </el-form-item>
    <el-form-item label="File">
      <el-input v-model="form.File" placeholder="消息所在的源代码文件"></el-input>
    </el-form-item>
    <el-form-item label="Function">
      <el-col :span="11">
        <el-input v-model.number="form.Function_start" type="number" placeholder="函数地址开始"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Function_end" type="number" placeholder="函数地址结束"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Line">
      <el-col :span="11">
        <el-input v-model.number="form.Line_start" type="number" placeholder="消息发生的源代码行号开始"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input v-model.number="form.Line_end" type="number" placeholder="消息发生的源代码行号结束"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Topic">
      <el-input v-model="form.Topic" placeholder="消息涉及的 ROS topic 列表"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'RosOut',
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
