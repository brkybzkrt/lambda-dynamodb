const AWS = require('aws-sdk');
const dynamoDB= new AWS.DynamoDB.DocumentClient();
const Responses= require('../responses')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const tableName= process.env.tableName;

exports.handler = async (event) => {

let data = JSON.parse(event.body);

const params = {
 TableName:tableName,
 Item:{ID:uuidv4(),isDeleted:false,createdOn:moment().format(), ...data}
};

try {
  let {$response:res} =await dynamoDB.put(params).promise();
  return Responses._200({result:res.data})
} catch (error) {
  return Responses._400({message:error.message})
}


};
  