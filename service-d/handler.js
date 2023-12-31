import { v4 as uuid } from "uuid";
import { formatResponse } from "../shared";

export const hello = async (event, context, callback) => {
  const uid = uuid();

  return formatResponse(
    200,
    { id: uid, message: "6.Generated using uuid pkg" },
    undefined
  );
};
