// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var task_pb = require('./task_pb.js');

function serialize_task_Empty(arg) {
  if (!(arg instanceof task_pb.Empty)) {
    throw new Error('Expected argument of type task.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_task_Empty(buffer_arg) {
  return task_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_task_Task(arg) {
  if (!(arg instanceof task_pb.Task)) {
    throw new Error('Expected argument of type task.Task');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_task_Task(buffer_arg) {
  return task_pb.Task.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_task_TaskList(arg) {
  if (!(arg instanceof task_pb.TaskList)) {
    throw new Error('Expected argument of type task.TaskList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_task_TaskList(buffer_arg) {
  return task_pb.TaskList.deserializeBinary(new Uint8Array(buffer_arg));
}


var TaskServiceService = exports.TaskServiceService = {
  createTask: {
    path: '/task.TaskService/CreateTask',
    requestStream: false,
    responseStream: false,
    requestType: task_pb.Task,
    responseType: task_pb.Task,
    requestSerialize: serialize_task_Task,
    requestDeserialize: deserialize_task_Task,
    responseSerialize: serialize_task_Task,
    responseDeserialize: deserialize_task_Task,
  },
  getTaskList: {
    path: '/task.TaskService/GetTaskList',
    requestStream: false,
    responseStream: false,
    requestType: task_pb.Empty,
    responseType: task_pb.TaskList,
    requestSerialize: serialize_task_Empty,
    requestDeserialize: deserialize_task_Empty,
    responseSerialize: serialize_task_TaskList,
    responseDeserialize: deserialize_task_TaskList,
  },
};

exports.TaskServiceClient = grpc.makeGenericClientConstructor(TaskServiceService);
