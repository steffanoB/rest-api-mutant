const db = require("./db");
const {
    GetItemCommand,
    PutItemCommand,
    DeleteItemCommand,
    ScanCommand,
    UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const getGeneticCode = async (event) => {
    const response = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ GeneticCode: event.pathParameters.geneticCode }),
        };
        const { Item } = await db.send(new GetItemCommand(params));

        console.log({ Item });
        response.body = JSON.stringify({
            message: "Successfully retrieved geneticCode.",
            data: (Item) ? unmarshall(Item) : {},
            rawData: Item,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to get geneticCode.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const createGeneticCode = async (event) => {
    
    // send to logic!!
    // la siguiente linea estaba dentro del try
    const body = JSON.parse(event.body);
    isMutant = validateGenticCode => validateGenticCode(body);
    //const body2 = JSON.stringify
    if (isMutant)
    {
        const response = { statusCode: 200 };
        let validationResult = {
            "geneticType": "Mutant"
        }
    }
    else
    {
        const response = { statusCode: 403 };
        let validationResult = {
            "geneticType": "Mutant"
        }
    }
    
    body.push(validationResult);

    try {
        
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(body || {}),
        };
        
        const createResult = await db.send(new PutItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully created geneticCode.",
            createResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to create geneticCode.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const updateGeneticCode = async (event) => {
    const response = { statusCode: 200 };

    try {
        const body = JSON.parse(event.body);
        const objKeys = Object.keys(body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ geneticCodeId: event.pathParameters.geneticCodeId }),
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`]: key,
            }), {}),
            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`:value${index}`]: body[key],
            }), {})),
        };
        const updateResult = await db.send(new UpdateItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully updated geneticCode.",
            updateResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to update geneticCode.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const deleteGeneticCode = async (event) => {
    const response = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ geneticCodeId: event.pathParameters.geneticCodeId }),
        };
        const deleteResult = await db.send(new DeleteItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully deleted geneticCode.",
            deleteResult,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to delete geneticCode.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const getAllGeneticCodes = async () => {
    const response = { statusCode: 200 };

    try {
        const { Items } = await db.send(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME }));

        response.body = JSON.stringify({
            message: "Successfully retrieved all geneitCodes.",
            data: Items.map((item) => unmarshall(item)),
            Items,
        });
    } catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to retrieve geneticCodes.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

module.exports = {
    getGeneticCode,
    createGeneticCode,
    updateGeneticCode,
    deleteGeneticCode,
    getAllGeneticCodes,
};
