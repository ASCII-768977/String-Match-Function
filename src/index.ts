import { APIGatewayProxyHandler } from 'aws-lambda';
import { matchUser } from './match';

export const handler: APIGatewayProxyHandler = async (event) => {
  const input = JSON.parse(event.body || '{}').input;
  const result = matchUser(input);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
