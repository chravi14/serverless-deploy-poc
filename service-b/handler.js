import { Ulid } from "id128";
import { formatResponse } from "../shared";

export const hello = async (event, context, callback) => {
  const uid = Ulid.generate();

  return formatResponse(
    200,
    { id: uid?.toRaw(), message: "4. Generated using uniqid pkg" },
    undefined
  );
};
