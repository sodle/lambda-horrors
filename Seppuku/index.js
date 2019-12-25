const AWS = require("aws-sdk");
const fs = require("fs");

exports.handler = async () => {
  const FunctionName = process.env.AWS_LAMBDA_FUNCTION_NAME;

  const lambda = new AWS.Lambda();

  console.log("Goodbye, cruel world!");

  await lambda
    .deleteFunction({
      FunctionName
    })
    .promise();
};
