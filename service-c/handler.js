import simple_unique_id from "simple-unique-id";
import { formatResponse } from "../shared";

export const hello = async (event, context, callback) => {
  const uid = simple_unique_id.generate("test");

  return formatResponse(
    200,
    { id: uid, message: "2.Generated using simple-unique-id pkg" },
    undefined
  );
};
