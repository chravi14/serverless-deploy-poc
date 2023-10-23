import { CognitoJwtVerifier } from "aws-jwt-verify";
import { formatResponse } from "../shared";

const { userPoolId, clientId } = process.env;

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: userPoolId,
  clientId: clientId,
  tokenUse: "id",
});

export const hello = async (event, context, callback) => {
  const token = event.authorizationToken;
  console.log("Authorizer Event is: ", event);
  console.log("Token is: ", token);
  try {
    const payload = await jwtVerifier.verify(token);
    console.log("Payload is: ", JSON.stringify(payload));
    callback(
      null,
      generateIAMPolicy("user", "Allow", event.methodArn, payload.sub)
    );
  } catch (err) {
    callback("Error: Invalid token", err);
  }
};

export const testAuthorizerEndpoint = async (event, context, callback) => {
  console.log(event);
  const clientId = event.requestContext.authorizer.clientId;
  callback(
    null,
    formatResponse(200, {
      message: "Successfully called test authorize endpoint",
      data: clientId,
    })
  );
};

const generateIAMPolicy = (principalId, effect, resourceArn, clientId) => {
  let authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resourceArn) {
    let policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Action: ["execute-api:Invoke"],
          // arn:aws:execute-api:us-east-1:700507370134:5qmo0ol6oa/local/GET/media
          // resourceArn.split("/")[0]
          // Resource: "arn:aws:execute-api:us-east-1:700507370134:*",
          Resource: `${resourceArn.split("/")[0]}/*`,
        },
      ],
    };

    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {
    clientId: clientId,
  };

  console.log(JSON.stringify(authResponse));

  return authResponse;
};
