import ShortUniqueId from "short-unique-id";
import { formatResponse } from "../shared";

export const hello = async (event, context, callback) => {
  const uid = new ShortUniqueId();

  return formatResponse(
    200,
    {
      id: uid,
      message: "8. Generated using short-unique-id pkg",
      bucketNames: [
        process.env.serviceBS3BucketName,
        process.env.serviceCS3BucketName,
      ],
    },
    undefined
  );
};
