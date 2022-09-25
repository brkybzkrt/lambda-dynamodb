const AWS = require('aws-sdk');
const dynamoDB= new AWS.DynamoDB.DocumentClient();
const Responses= require('../responses');
const moment = require('moment');

const tableName= process.env.tableName;

exports.handler = async (event) => {


  if(!event.pathParameters || !event.pathParameters.ID){
    return Responses._400({message:"There is no employee with this Id"})
  }
let id = event.pathParameters.ID


const params = {
 TableName:tableName,
 Key:{ID:id},
 UpdateExpression: `set isDeleted =:value , updatedOn =:value2`,
 ExpressionAttributeValues:{
     ':value': true,
     ':value2':moment().format()
 }
};

try {

  let data =await dynamoDB.update(params).promise();
return Responses._200({data:data.Item})
} catch (error) {
  return Responses._400({message2:error.message})
}


};
