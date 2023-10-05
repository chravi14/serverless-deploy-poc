import uniqid from "uniqid";
import { formatResponse } from "../shared";

export const hello = async (event, context, callback) => {
  const uid = new uniqid();

  return formatResponse(
    200,
    { id: uid, message: "2. Generated using uniqid pkg" },
    undefined
  );
};
