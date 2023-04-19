import { moduleOperation } from '../constants/module-operations';

export interface HttpResponse {
  meta: Meta;
  data?: any;
  errors?: any;
}

interface Meta {
  status: 'success' | 'fail';
  message: unknown;
}

const responseMessage = new Map<number, string>([
  [moduleOperation.createUser, 'User added successfully'],
]);

export const getResponseMessage = (code: number): string => {
  return responseMessage.get(code);
};
