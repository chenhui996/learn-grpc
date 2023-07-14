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
