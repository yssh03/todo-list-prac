"use strict";

require("dotenv").config({ path: "./variables.env" });
require("./config/db");
const Todo = require("./model/todo");

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await Todo.create(JSON.parse(event.body));
    callback(null, {
      statusCode: 200,
      body: "Todo created successfully!.",
    });
  } catch (err) {
    console.log(err.errors.name.properties.message);
    callback(null, {
      statusCode: err.statusCode || 500,
      body: err.errors.name.properties.message.slice(5),
    });
  }
};

module.exports.getOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const todo = await Todo.findById({ _id: event.pathParameters.id });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(todo),
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not fetch the todo.",
    });
  }
};

module.exports.getAll = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const todos = await Todo.find();
    console.log(todos);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(todos),
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not fetch the todos.",
    });
  }
};

module.exports.update = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const data = await Todo.findById({ _id: event.pathParameters.id });
    if (!data) {
      callback(null, {
        statusCode: 200,
        body: "Todo does not exists!",
      });
    }
    await Todo.findByIdAndUpdate(
      event.pathParameters.id,
      JSON.parse(event.body),
      {
        new: true,
      }
    );

    callback(null, {
      statusCode: 200,
      body: "Todo updated successfully!",
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Something went wrong.",
    });
  }
};

module.exports.delete = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = await Todo.findById({ _id: event.pathParameters.id });
    if (!data) {
      callback(null, {
        statusCode: 200,
        body: "Todo does not exists!",
      });
    }

    await Todo.findByIdAndRemove(event.pathParameters.id);
    callback(null, {
      statusCode: 200,
      body: "Todo removed successfully!",
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Something went wrong!",
    });
  }
};
