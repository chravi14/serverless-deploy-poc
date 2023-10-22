import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Ulid } from "id128";
import { dynamoDBDocumentClient, formatResponse } from "../shared";

const usersTableName = process.env.usersTableName;
export const hello = async (event, context, callback) => {
  const uid = Ulid.generate();
  let user;
  console.log("Users table name is: ", usersTableName);
  try {
    const params = {
      TableName: usersTableName,
      Item: {
        email: "test@test.com",
      },
    };

    const queryCommand = new PutCommand(params);
    const result = await dynamoDBDocumentClient.send(queryCommand);
    console.log(result.Attributes);
    user = result.Attributes;
  } catch (err) {
    console.log(err);
  }

  return formatResponse(
    200,
    { id: uid?.toRaw(), message: "14. Generated using uniqid pkg", user },
    undefined
  );
};
