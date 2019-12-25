const AWS = require("aws-sdk");

exports.handler = async () => {
  const FunctionName = process.env.AWS_LAMBDA_FUNCTION_NAME;
  const magicVar = process.env.MAGIC_VAR ? parseInt(process.env.MAGIC_VAR) : 0;

  const lambda = new AWS.Lambda();

  console.log(`Magic var is ${magicVar}, updating...`);

  await lambda
    .updateFunctionConfiguration({
      FunctionName,
      Environment: {
        Variables: {
          MAGIC_VAR: magicVar + 1
        }
      }
    })
    .promise();
};
