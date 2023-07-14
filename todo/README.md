# 需求: 任务管理应用

假设你要实现一个简单的 **任务管理应用**，其中包含以下功能：

1. 创建任务：
   1. 客户端 可以 向着 服务器 发送 任务请求 => 包括 任务名称 和 描述。
2. 获取任务列表：
   1. 客户端 可以 请求 服务器 返回 所有任务的列表。

> 现在，让我们按照以下步骤一步步实现这个示例, 文件全在 src 目录下。

## 步骤 1：定义 Protocol Buffers 文件

- 首先:
  - **创建** 一个名为 **task.proto** 的文件, 使用 **Protocol Buffers 语法** 定义:
    - **消息类型**
    - **服务**

```protobuf
syntax = "proto3";

package task;

message Empty {}

message Task {
    string name = 1;
    string description = 2;
}

message TaskList {
    repeated Task tasks = 1;
}

service TaskService {
    rpc CreateTask(Task) returns (Task);
    rpc GetTaskList(Empty) returns (TaskList);
}
```

## 步骤 2：生成代码

使用 protoc 命令将 task.proto 文件编译为相应的语言代码。在这里，我们将生成 JavaScript 代码。

```bash
protoc --js_out=import_style=commonjs,binary:. --grpc_out=. --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` task.proto
```

## 步骤 3：实现服务器

在你的项目中创建一个名为 server.js 的 JavaScript 文件，并编写以下服务器代码：

```javascript
const grpc = require('grpc');
const { Task, TaskList } = require('./task_pb.js'); // 从 task_pb.js 中导入 Task 和 TaskList
const { TaskServiceService } = require('./task_grpc_pb.js'); // 从 task_grpc_pb.js 中导入 TaskServiceService

function createTask(call, callback) {
  const task = new Task();
  task.setName(call.request.getName());
  task.setDescription(call.request.getDescription());

  console.log('Received task:', task.toObject());

  // 在这里处理创建任务的逻辑，例如将任务存储在数据库中

  callback(null, task);
}

function getTaskList(call, callback) {
  console.log('Received request to get task list');

  // 在这里处理获取任务列表的逻辑，例如从数据库中检索任务列表

  const taskList = new TaskList();

  // 假设这里有一个任务列表 tasks
  const tasks = [
    { name: 'Task 1', description: 'This is task 1' },
    { name: 'Task 2', description: 'This is task 2' },
  ];

  tasks.forEach((task) => {
    const newTask = new task_pb.Task();
    newTask.setName(task.name);
    newTask.setDescription(task.description);
    taskList.addTasks(newTask);
  });

  callback(null, taskList);
}

function main() {
  const server = new grpc.Server();
  server.addService(TaskServiceService, { createTask, getTaskList });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC server started on port 50051');
}

main();
```

## 步骤 4：实现客户端

在你的项目中创建一个名为 client.js 的 JavaScript 文件，并编写以下客户端代码：

```javascript
const grpc = require('grpc');
const { Task, Empty } = require('./task_pb.js'); // 从 task_pb.js 中导入 Task 和 Empty
const { TaskServiceClient } = require('./task_grpc_pb.js'); // 从 task_grpc_pb.js 中导入 TaskServiceClient

function createTask() {
    const client = new TaskServiceClient('localhost:50051', grpc.credentials.createInsecure());

    const task = new Task();
    task.setName('Task 1');
    task.setDescription('This is task 1');

    client.createTask(task, (error, response) => {
        if (error) {
            console.error('Error:', error.message);
            return;
        }
        console.log('Created task:', response.toObject());
    });
}

function getTaskList() {
    const client = new TaskServiceClient('localhost:50051', grpc.credentials.createInsecure());

    const request = new Empty();

    client.getTaskList(request, (error, response) => {
        if (error) {
            console.error('Error:', error.message);
            return;
        }
        console.log('Task list:', response.toObject());
    });
}

createTask();
getTaskList();
```

## 步骤 5：运行服务器和客户端

在终端中分别执行以下命令以启动服务器和客户端：

```bash
node server.js
```

```bash
node client.js
```

> 你将在服务器和客户端终端窗口中看到相应的输出，表示任务的创建和获取操作已成功。