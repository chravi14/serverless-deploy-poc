import uniqid from "uniqid";
import { formatResponse } from "../shared";

export const hello = async (event, context, callback) => {
  const uid = new uniqid();

  return formatResponse(
    200,
    { id: uid, message: "Generated using uniqid pkg" },
    undefined
  );
};
