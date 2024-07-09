import { APIGatewayProxyHandler } from 'aws-lambda';
import { matchUser } from './match';
import {
  errInvalidInput,
  errNotFound,
  errInternalServer,
  resultSuccessMsg,
  statusCodeSuccess,
  statusCodeNotFound,
  statusCodeBadRequest,
  statusCodeInternalError,
} from './globals';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const input = JSON.parse(event.body || '{}').input;

    if (!input) {
      return {
        statusCode: statusCodeBadRequest,
        body: JSON.stringify({
          success: false,
          message: errInvalidInput,
          data: {},
        }),
      };
    }

    const result = matchUser(input);

    if (result === errInvalidInput) {
      return {
        statusCode: statusCodeBadRequest,
        body: JSON.stringify({
          success: false,
          message: errInvalidInput,
          data: {},
        }),
      };
    } else if (result === errNotFound) {
      return {
        statusCode: statusCodeNotFound,
        body: JSON.stringify({
          success: false,
          message: errNotFound,
          data: {},
        }),
      };
    }

    return {
      statusCode: statusCodeSuccess,
      body: JSON.stringify({
        success: true,
        message: resultSuccessMsg,
        data: result,
      }),
    };
  } catch (error) {
    return {
      statusCode: statusCodeInternalError,
      body: JSON.stringify({
        success: false,
        message: errInternalServer,
        data: {},
      }),
    };
  }
};
