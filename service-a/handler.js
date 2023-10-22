import { GetCommand } from "@aws-sdk/lib-dynamodb";
import ShortUniqueId from "short-unique-id";
import { dynamoDBDocumentClient, formatResponse } from "../shared";

const usersTableName = process.env.usersTableName;
export const hello = async (event, context, callback) => {
  const uid = new ShortUniqueId();

  let user;
  console.log("Users table name is: ", usersTableName);
  try {
    const params = {
      TableName: usersTableName,
      Key: {
        email: "test@test.com",
      },
    };

    const queryCommand = new GetCommand(params);
    const result = await dynamoDBDocumentClient.send(queryCommand);
    console.log(result.Item);
    user = result.Item;
  } catch (err) {
    console.log(err);
  }

  return formatResponse(
    200,
    {
      id: uid,
      message: "16. Generated using short-unique-id pkg",
      user: user,
    },
    undefined
  );
};
