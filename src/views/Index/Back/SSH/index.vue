<template>
  <div class="ssh-container">
    <div class="history">
      <h3>SSH History</h3>
      <el-scrollbar wrap-style="max-height: 200px;">
        <el-card>
          <!-- 显示SSH历史记录 -->
          <el-timeline>
            <el-timeline-item v-for="item in sshHistory" :key="item.id">
              {{ item.command }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-scrollbar>
    </div>

    <div class="command">
      <el-input v-model="commandInput" placeholder="Enter SSH Command" />
      <el-button @click="executeCommand" type="primary">Execute</el-button>
      <el-button @click="clearCommand" type="danger">Clear</el-button>
    </div>

    <div class="output">
      <h3>Command Output</h3>
      <el-scrollbar wrap-style="max-height: 200px;">
        <el-card>
          <!-- 显示SSH执行结果 -->
          <el-timeline>
            <el-timeline-item v-for="output in commandOutput" :key="output.id">
              {{ output.result }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { reqSSH } from '@/api'; // 假设你的api文件路径正确

export default {
  data() {
    return {
      sshHistory: [],      // 存储SSH历史记录
      commandInput: '',    // 存储用户输入的SSH命令
      commandOutput: [],   // 存储SSH命令执行结果
    };
  },
  methods: {
    async executeCommand() {
      // 执行SSH命令逻辑
      const command = this.commandInput.trim();
      if (command) {
        try {
          // 使用await等待异步请求结果
          const result = await this.queryCommand(command);
          this.commandOutput.push({ id: Date.now(), result });

          // 存储SSH历史记录
          this.sshHistory.push({ id: Date.now(), command });

          // 清空输入框
          this.commandInput = '';
        } catch (error) {
          console.error('Error executing command:', error);
        }
      }
    },
    clearCommand() {
      // 清空SSH命令输入框
      this.commandInput = '';
    },
    async queryCommand(command) {
      // 执行SSH命令并返回结果
      try {
        // 使用await等待异步请求结果
        const response = await reqSSH({ cmd: command });
        console.log('Response:', response.data.data);
        return `Command: ${command} \n Output: ${response.data.data}`;
      } catch (error) {
        console.error('Error querying command:', error);
        return `Command: ${command} \n Output: [Error occurred]`;
      }
    },
  },
};
</script>


<style scoped>
.ssh-container {
  display: flex;
  justify-content: space-between;
}

.history,
.output {
  flex: 1;
  margin-right: 10px;
}

.command {
  flex: 1;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.el-scrollbar__wrap {
  max-height: 200px;
}
</style>
