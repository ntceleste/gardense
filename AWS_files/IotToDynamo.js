console.log('Loading function');
var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();
var table = "gardenseDB";

exports.handler = function(event, context) {
    var putParams = {
        TableName:table,
        Item:{
            "msgID": context.awsRequestId,
            "timestamp": Date.now(),
            "light": event.light,
            "moisture": event.moisture,
            "planterID": event.planterID,
            "temp": event.temp
        }
    };

    console.log("Adding a new message...");
    console.log(putParams);
    dynamo.put(putParams, function(err, data) {
        if (err) {
            console.error("Unable to add message. Error JSON:", JSON.stringify(err, null, 2));
            context.fail();
        } else {
            console.log("Added message:", JSON.stringify(data, null, 2));
            context.succeed();
        }
    });
};