const AWS = require("aws-sdk");
const https = require("https");

exports.handler = async () => {
  const FunctionName = process.env.AWS_LAMBDA_FUNCTION_NAME;

  const lambda = new AWS.Lambda();

  console.log("Daddy, where do baby Lambdas come from?");

  const fn = await lambda
    .getFunction({
      FunctionName
    })
    .promise();

  await new Promise(async resolve => {
    https.get(fn.Code.Location, res => {
      let chunks = [];
      res.on("data", d => {
        chunks.push(d);
      });
      res.on("close", async () => {
        const d = new Date();
        await lambda
          .createFunction({
            Code: {
              ZipFile: Buffer.concat(chunks)
            },
            FunctionName: `${FunctionName}-${d.getUTCFullYear()}${d.getUTCMonth() +
              1}${d.getUTCDate()}T${d.getUTCHours()}${d.getUTCMinutes()}${d.getUTCSeconds()}${d.getUTCMilliseconds()}`,
            Handler: fn.Configuration.Handler,
            Role: fn.Configuration.Role,
            Runtime: fn.Configuration.Runtime
          })
          .promise();
        resolve();
      });
    });
  });
};
