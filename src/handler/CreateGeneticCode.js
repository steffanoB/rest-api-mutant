'use strict'
const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.createGeneticCode = (event, context, callback) => {

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body); // get request body

    if (typeof data.task != 'string') {
        console.error('Task is not a string'); // should be an array of arrays of string
        const response = {
            statusCode: 400,

            body: JSON.stringify({ "message": "Task is not a string." });
        }

        const params = {
            TableName: 'geneticCodes',
            Items: {
                id: uuid.v1(),
                task: data.task,
                done: false,
                craeatedAt: datetime,
                updatedAt: datetime
            }
        };

        dynamoDb.put(params, (error, data) => {
            if (error) {
                console.error(error);
                callback(new Error(error));
                return;
            }

            const response = {
                statusCode: 201,
                body: JSON.stringify(data.Item)
            };

            callback(null, response);
        });
    }
}



