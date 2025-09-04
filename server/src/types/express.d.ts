interface TokenPayload {
  id: number;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};