export interface DBResult {
  data: any;
  errors?: string[];
  message?: string;
}

const commonErrors = new Map<string, string>([
  ['P2002', 'Unique constraint failed'],
]);

export const getErrorDB = (code: string): string => {
  return commonErrors.get(code);
};

const fieldErrors = new Map<string, string>([
  ['users_username_key', 'username is already exist'],
]);

export const getErrorField = (target: unknown): string => {
  return fieldErrors.get(target.toString());
};
