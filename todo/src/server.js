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
    const newTask = new Task();
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
