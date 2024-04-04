<template>
  <div>
    <h2>上传文件并保存</h2>
    <input type="file" ref="fileInput" name="file" @change="uploadFile" />
    <button @click="saveFile">保存</button>
    <h1></h1>
    <!-- 进度显示 -->
    <!-- <div class="progress-box">
      <span>上传进度：{{ percent.toFixed() }}%</span>
    </div> -->


    <div>
      <el-progress :text-inside="true" :stroke-width="24" :percentage="parseInt(percent)+1" status="success">
      </el-progress>
      <div class="progress-text">进度：{{ percent }}%</div>
    </div>

    <h2>已有数据如下</h2>
    <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        style="width: 100%">
      <el-table-column
          label="id"
          type="index"
          width="100"
      >
        <template slot-scope="scope">
          {{ (scope.$index+1)+(currentPage-1)*pageSize }}
        </template>
      </el-table-column>
      <el-table-column
          prop="bagName"
          label="bagName"
          width="180">
      </el-table-column>
      <el-table-column
          prop="topicName"
          label="topicName"
          width="180">
      </el-table-column>
      <el-table-column
          prop="savePath"
          label="savePath">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-tooltip content="获取数据内容" effect="dark" placement="top">
            <el-button size="mini" icon="el-icon-message" circle type="primary" @click="getJsonData(scope.$index,scope.row.topicName, scope.row.bagName)" />
          </el-tooltip>
          <el-tooltip content="设置查询条件获取数据" effect="dark" placement="top">
            <el-button size="mini" icon="el-icon-search" circle type="warning" @click="findSelectData(scope.$index,scope.row.topicName, scope.row.bagName)" />
          </el-tooltip>
          <el-dialog
              :title="dialogTitle"
              :visible.sync="dialogVisible"
              width="35%"
              :before-close="handleClose">
            <vue-json-viewer :value="dialogViewData" :expand-depth=1 />
            <div class="block" style="margin-top:15px;">
              <el-pagination align='center' @size-change="handleJsonSizeChange" @current-change="handleJsonCurrentChange"
                             :current-page="currentJsonPage"
                             :page-sizes="[2,3,5,10]"
                             :page-size="pageJsonSize"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="dataLength">
              </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
              :title="dialogQueryTitle"
              :visible.sync="dialogQueryVisible"
              width="40%"
              :before-close="handleClose">
            <div>
              <template v-if="selectStruct === 1">
                <RosOut :form="form" ref="myForm"/>
              </template>
              <template v-else-if="selectStruct === 2">
                <ColorSensor :form="form" ref="myForm"/>
              </template>
              <template v-else-if="selectStruct === 3">
                <Pose :form="form" ref="myForm"/>
              </template>
              <template v-else-if="selectStruct === 4">
                <CmdVel :form="form" ref="myForm"/>
              </template>
              <template v-else-if="selectStruct === 5">
                <Imu :form="form" ref="myForm"/>
              </template>
              <template v-else-if="selectStruct === 6">
                <CamInfo :form="form" ref="myForm"/>
              </template>
              <template v-else-if="selectStruct === 7">
                <ImageRaw :form="form" ref="myForm"/>
              </template>
              <template v-else-if="selectStruct === 8">
                <TFMessage :form="form" ref="myForm"/>
              </template>
              <template v-else>
                <Form :form="form" ref="myForm"/>
              </template>
              <el-button type="primary" @click="toSearch">点击查询</el-button>
              <el-button @click="toClean()">清空</el-button>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogQueryVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogQueryVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog
              :title="dialogQueryDataTitle"
              :visible.sync="dialogQueryDataVisible"
              width="35%"
              :before-close="handleClose">
            <vue-json-viewer :value="dialogQueryViewData" :expand-depth=1 />
            <div class="block" style="margin-top:15px;">
              <el-pagination align='center' @size-change="handleQueryJsonSizeChange" @current-change="handleQueryJsonCurrentChange"
                             :current-page="currentQueryJsonPage"
                             :page-sizes="[2,3,5,10]"
                             :page-size="pageQueryJsonSize"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="queryDataLength">
              </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogQueryDataVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogQueryDataVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top:15px;">
      <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[1,5,10,20]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.length">
      </el-pagination>
    </div>
  </div>


</template>

<script>
import {saveBagData} from "@/api/ros/saveBag";
import {getDataStruct} from "@/api/ros/datastruct";
import {getDataFromTopic, queryParamsStruct, querySearchStruct, viewAllData} from "@/api/ros/getData";
import VueJsonViewer from 'vue-json-viewer';
import VueProgressBar from 'vue-progressbar';


import Form from './structTemplete/MyForm.vue'
import RosOut from "./structTemplete/rosout.vue"
import ColorSensor from "./structTemplete/ColorSensor.vue"
import Pose from "./structTemplete/Pose.vue"
import CmdVel from "./structTemplete/CmdVel.vue"
import Imu from "./structTemplete/Imu.vue"
import CamInfo from "./structTemplete/CamerInfo.vue"
import ImageRaw from "./structTemplete/ImageRaw.vue";
import TFMessage from "./structTemplete/TFMessage.vue";
export default {
  name: "ROSBagList",
  components: {
    CmdVel,
    VueJsonViewer,
    VueProgressBar,
    Form,
    RosOut,
    ColorSensor,
    Pose,
    Imu,
    CamInfo,
    ImageRaw,
    TFMessage
  },
  data() {
    return {
      progress: 0,
      percentCount:0,
      percent:0,
      dialogQueryDataTitle:'',
      dialogQueryDataVisible: false,
      selectBagName:"",
      selectTopicName:"",
      selectStruct: 0,
      dialogTitle :'',
      dialogQueryTitle :'',
      dialogData :[],
      dialogJsonData : [],
      dialogViewData : [],
      dialogVisible: false,
      dialogQueryVisible: false,
      intPageSize:10,
      file: null, // 上传的文件对象
      fileName: "", // 上传的文件名
      path :"",// 保存的文件路径
      uploadMessage :"",
      dataLength:0,
      rosData:[],
      rosDataLen:0,
      bagName :[],
      con_bagName:"",
      con_topic:"",
      allData:[],
      topicList:[],
      params:{
        bagName:'example.bag'
      },
      tableData: [
      ],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5,// 每页的数据条数
      currentJsonPage: 1, // 当前页码
      totalJson: 20, // 总条数
      pageJsonSize: 3, // 每页的数据条数
      form: {},
      allQueryData:[],// 搜索条件框
      queryForm:{},
      queryDataLength:0,
      dialogQueryData:[],
      dialogQueryJsonData:[],
      dialogQueryViewData:[],
      currentQueryJsonPage:1,
      pageQueryJsonSize:3,
    };
  },
  created() {
    //  this.getBagName()
    this.getRosData()
  },
  methods: {
    startProgress() {
      const interval = setInterval(() => {
        this.progress += 10;
        if (this.progress >= 100) {
          clearInterval(interval);
        }
      }, 1000);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleJsonSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentJsonPage = 1;
      this.pageJsonSize = val;

      const bagName = this.con_bagName
      const topic = this.con_topic
      const start = this.currentJsonPage*this.pageJsonSize-this.pageJsonSize
      const width = this.pageJsonSize
      getDataFromTopic({bagName, topic, start, width}).then(response=>{
        this.allData = response.data["allData"]
        this.dialogData = JSON.parse(this.allData)
        this.dialogJsonData = this.dialogData.map(arr => {
          return flattenArray(arr);
        });

        const start = 0
        if((this.pageJsonSize*this.currentJsonPage<this.dataLength)){
          this.dialogViewData = this.dialogJsonData.slice(start, start+this.pageJsonSize)
        }else{
          this.dialogViewData = this.dialogJsonData.slice(start, this.dialogJsonData.length)
        }
      }).catch(error =>{
        alert(error)
      })


    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleJsonCurrentChange(val) {
      console.log(`当前页: ${val}`);
      console.log(`当前大小: ${this.pageJsonSize}`);
      this.currentJsonPage = val;
      const bagName = this.con_bagName
      const topic = this.con_topic
      const start = this.currentJsonPage*this.pageJsonSize-this.pageJsonSize
      const width = this.pageJsonSize
      getDataFromTopic({bagName, topic, start, width}).then(response=>{
        this.allData = response.data["allData"]
        this.dialogData = JSON.parse(this.allData)
        this.dialogJsonData = this.dialogData.map(arr => {
          return flattenArray(arr);
        });
        // console.log(this.dialogJsonData)
        const start = 0
        if((this.pageJsonSize*this.currentJsonPage<this.dataLength)){
          this.dialogViewData = this.dialogJsonData.slice(start, start+this.pageJsonSize)
        }else{
          this.dialogViewData = this.dialogJsonData.slice(start, this.dialogJsonData.length)
        }
      }).catch(error =>{
        alert(error)
      })

    },
    getJsonData(row, topicName, bagName){
      this.con_topic = topicName
      this.con_bagName = bagName
      this.currentJsonPage = 1
      this.dialogTitle = bagName+"下指定topic: "+topicName+"数据结构如下"
      this.dialogVisible = true
      let topic = topicName
      let start = 0
      const width = this.pageJsonSize
      getDataFromTopic({bagName, topic, start, width}).then(response=>{
        this.allData = response.data["allData"]
        this.dataLength = response.data["length"]
        console.log("this.dataLength", this.dataLength)
        this.dialogData = JSON.parse(this.allData)
        console.log("this.dialogData", this.dialogData)
        this.dialogJsonData = this.dialogData.map(arr => {

          return flattenArray(arr);
        });
        const start = (this.currentJsonPage-1)*this.pageJsonSize
        if((start+this.pageJsonSize)<this.dataLength){
          this.dialogViewData = this.dialogJsonData.slice(start, start+this.pageJsonSize)
        }else{
          this.dialogViewData = this.dialogJsonData.slice(start, this.dataLength)
        }
      }).catch(error =>{
        alert(error)
      })

      console.log(row)
      console.log(topicName)
      console.log(bagName)

    },
    findSelectData(row, topicName, bagName) {
      this.selectTopicName = topicName
      this.selectBagName = bagName
      this.form = {}
      this.form = getDataStruct(topicName)
      console.log(topicName)
      if(topicName=="/rosout"||topicName=="/rosout_agg"){
        this.selectStruct = 1
      }else if(topicName=="/turtle1/color_sensor" || topicName=="/turtle2/color_sensor"){
        this.selectStruct = 2
      }else if(topicName=="/turtle1/pose" || topicName=="/turtle2/pose"){
        this.selectStruct = 3
      }else if(topicName=="/turtle1/cmd_vel" || topicName=="/turtle2/cmd_vel"){
        this.selectStruct = 4
      }else if(topicName=="/visensor/imu"){
        this.selectStruct = 5
      }else if(topicName=="/visensor/left/camera_info"){
        this.selectStruct = 6
      }else if(topicName=="/visensor/left/image_raw"){
        this.selectStruct = 7
      }else if(topicName=="/tf"||topicName == "/tf_static"){
        this.selectStruct = 8
      }else{
        this.selectStruct = 0
      }
      console.log("this.selectStruct", this.selectStruct)
      // console.log("````", this.form)
      // console.log(row)
      // console.log(topicName)
      // console.log(bagName)
      let topic = topicName
      this.dialogQueryTitle = "请设置该" + bagName+"下指定topic: "+topicName+"的查询条件"
      this.dialogQueryVisible = true
      // queryParamsStruct({bagName, topic}).then(response=>{
      //   const paramsData = response.data["paramsData"]
      //   // console.log(paramsData)
      //   // console.log(typeof paramsData)
      // }).catch(error =>{
      //   alert(error)
      // })
    },
    handleQueryJsonCurrentChange(val){
      this.currentQueryJsonPage = val
      const bagName = this.selectBagName
      const topic = this.selectTopicName
      const start = this.currentQueryJsonPage*this.pageQueryJsonSize-this.pageQueryJsonSize
      const width = this.pageQueryJsonSize
      const form = this.queryForm
      querySearchStruct({form, topic, bagName,start, width}).then(response=>{
        this.allQueryData = response.data["allData"]
        this.dialogQueryData = JSON.parse(this.allQueryData)
        this.dialogQueryJsonData = this.dialogQueryData.map(arr=>{
          return flattenArray(arr)
        })
        const start = 0
        if((this.pageQueryJsonSize*this.currentQueryJsonPage<this.queryDataLength)){
          this.dialogQueryViewData = this.dialogQueryJsonData.slice(start, start+this.pageQueryJsonSize)
        }else{
          this.dialogQueryViewData = this.dialogQueryJsonData.slice(start, this.dialogQueryJsonData.length)
        }

      }).catch(error =>{
        alert(error)
      })
    },
    handleQueryJsonSizeChange(val){
      this.currentQueryJsonPage = 1
      this.pageQueryJsonSize = val
      const bagName = this.selectBagName
      const topic = this.selectTopicName
      const start = this.currentQueryJsonPage*this.pageQueryJsonSize-this.pageQueryJsonSize
      const width = this.pageQueryJsonSize
      const form = this.queryForm
      querySearchStruct({form, topic, bagName,start, width}).then(response=>{
        this.allQueryData = response.data["allData"]
        this.dialogQueryData = JSON.parse(this.allQueryData)
        this.dialogQueryJsonData = this.dialogQueryData.map(arr=>{
          return flattenArray(arr)
        })
        const start = 0
        if((this.pageQueryJsonSize*this.currentQueryJsonPage<this.queryDataLength)){
          this.dialogQueryViewData = this.dialogQueryJsonData.slice(start, start+this.pageQueryJsonSize)
        }else{
          this.dialogQueryViewData = this.dialogQueryJsonData.slice(start, this.dialogQueryJsonData.length)
        }
        // console.log("this.allQueryData:", this.allQueryData)
      }).catch(error =>{
        alert(error)
      })
    },
    toSearch() {
      console.log('点击查询!');
      console.log(this.form); // 输出表单数据对象
      this.queryForm = this.form
      this.dialogQueryDataTitle = "通过查询条件对获取到该topic:"+this.selectTopicName+"下的Data如图所示"
      this.dialogQueryVisible = false
      this.dialogQueryDataVisible = true
      let form = this.form
      let topic = this.selectTopicName
      let bagName = this.selectBagName
      let start = 0
      const width = this.pageQueryJsonSize
      console.log("---------")
      querySearchStruct({form, topic, bagName,start, width}).then(response=>{
        this.allQueryData = response.data["allData"]
        this.queryDataLength = response.data["length"]
        this.dialogQueryData = JSON.parse(this.allQueryData)
        console.log(this.dialogQueryData)
        this.dialogQueryJsonData = this.dialogQueryData.map(arr=>{
          return flattenArray(arr)
        })
        const start =(this.currentQueryJsonPage-1)*this.pageQueryJsonSize
        if((start+this.pageQueryJsonSize)<this.queryDataLength){
          this.dialogQueryViewData = this.dialogQueryJsonData.slice(start, start+this.pageQueryJsonSize)
        }else{
          this.dialogQueryViewData = this.dialogQueryJsonData.slice(start, this.queryDataLength)
        }

        // console.log("this.allQueryData:", this.allQueryData)
      }).catch(error =>{
        alert(error)
      })
    },
    toClean(){
      console.log("topic为：", this.selectTopicName)
      this.form = getDataStruct(this.selectTopicName)
    },
    uploadFile(event) {
      this.file = event.target.files[0];
      this.fileName = this.file.name;
    },

    saveFile(){
      const file = this.$refs.fileInput.files[0];
      const chunkSize = 1024 * 1024; // 1MB
      const totalChunks = Math.ceil(file.size / chunkSize);
      if (file.size<=chunkSize){
        this.percent = 99
      }
      let currentChunk = 0;
      (async () => {
        while (currentChunk < totalChunks) {
          const start = currentChunk * chunkSize;
          const end = Math.min(start + chunkSize, file.size);
          const chunk = file.slice(start, end);
          const formData = new FormData();
          formData.append('fileName', file.name);
          formData.append('file', chunk);
          formData.append('totalChunks', totalChunks);
          formData.append('currentChunk', currentChunk);
          try {
            const response = await saveBagData(formData);
            this.path = "";
            this.uploadMessage = response.message;
            if (response.data.code === 0) {
              this.percentCount = 100 / totalChunks;
            }
            this.percent += this.percentCount;
            if (response.data.code === 1) {
              this.percent = 99
              alert(response.data.message);
              window.location.reload(); // 重新加载页面
            }
          } catch (error) {
            alert(error);
          }
          currentChunk++;
        }
      })();
    },

    // saveFile(){
    //   const file = this.$refs.fileInput.files[0];
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   saveBagData(formData).then(response =>{
    //     this.path = response.data["path"]
    //     this.uploadMessage = response.message
    //     alert(this.path);
    //   }).catch(error =>{
    //     alert(error)
    //   })
    // },
    getRosData(){
      viewAllData().then(response =>{
        this.rosData = response.data["rosData"]
        this.rosDataLen = response.data["total"]
        for (let i = 0; i < this.rosDataLen; i++){
          for (let j = 0; j < this.rosData[i]["topic_name"].length; j++){
            let metadata = {}
            metadata["bagName"] = this.rosData[i]["bag_name"]
            metadata["savePath"] = this.rosData[i]["save_path"]
            metadata["topicName"] = this.rosData[i]["topic_name"][j]
            this.tableData.push(metadata)
          }
        }
        console.log("this.rosData", this.rosData)
        console.log("this.tableData", this.tableData)

      }).catch(error =>{
        alert(error)
      })
    },

    traverse(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === "object") {
            this.traverse(obj[key]);  // 递归调用遍历嵌套对象
          } else {
            console.log(key + " : " + obj[key]);
          }
        }
      }
    }
  }


};
function flattenArray(arr) {
  return arr.map(item => {
    if (Array.isArray(item.Value)) {
      if (isFloatArray(item.Value)) {
        item.Value = item.Value; // 不展平浮点数数组
      } else {
        item.Value = flattenArray(item.Value.flat()); // 使用 flat() 方法对非浮点数数组进行展平
      }
    }
    return { [item.Key]: item.Value };
  }).reduce((prev, curr) => {
    return Object.assign(prev, curr);
  }, {});
}

function isFloatArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (typeof val !== 'number' || Number.isInteger(val)) {
      return false;
    }
  }
  return true;
}
</script>

<style>
.progress-text {
  position: relative;
  top: -40px; /* 根据进度条高度调整位置 */
  text-align: center;
  font-size: 13px;
  color: #606266;
}
</style>
