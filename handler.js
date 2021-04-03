'use strict';
const AWS = require('aws-sdk');
const msql = require('mysql');
const s3 = new AWS.S3();
const connection = mysql.createConnection({
  host: "myprofilepagedb.cvml7bxcvw7m.us-east-2.rds.amazonaws.com",
  user: "myprofilepagedb",
  password: "myprofilepagedb",
  database: "myprofilepagedb",
})
)
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'I know how to create Lambda functions now!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.hello2 = async (event) => {
  var buckets = await s3.listBuckets().promise();
  const dstBucket = 'myprofilepagecontactdata';
  const dstKey    = event.first_name+'_'+event.last_name;
  const formData = JSON.stringify(event);
  const destparams = {
    Bucket: dstBucket,
    Key: dstKey,
    Body: formData,
    ContentType: "application/json; charset=utf-8"
};
const putResult = await s3.putObject(destparams).promise();
let query = "INSERT INTO contactme_data(message) VALUES ('" + message + "')",
await connection.query(query, function(error, results, fields) {
    console.log('error log: ' + error);
    console.log('results log: ' + results);
});
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Your message has been captured!', 
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
