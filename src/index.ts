import { APIGatewayProxyHandler } from 'aws-lambda';
import { matchUser } from './match';

export const handler: APIGatewayProxyHandler = async (event) => {
  const input = JSON.parse(event.body || '{}').input;
  const result = matchUser(input);

  if (typeof result === 'string') {
    // Handle invalid input or no match found
    if (result === 'Invalid input') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: 'Invalid input',
          data: {},
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          message: 'No Match found',
          data: {},
        }),
      };
    }
  }

  // Handle match found
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: 'Match found',
      data: result,
    }),
  };
};
