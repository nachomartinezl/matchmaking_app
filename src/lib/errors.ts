// lib/errors.ts

export class ApiError extends Error {
  status: number;
  response: any;

  constructor(message: string, status: number, response: any = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}