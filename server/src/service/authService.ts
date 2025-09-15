import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../models/user";

interface JwtPayload {
  id: number;
  username: string;
}

export const registerUser = async (username: string, password: string ) => {
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new Error("Username already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(username, hashedPassword);

   if (!user) {
    throw new Error("Failed to create user");
  }
  
  const token = jwt.sign(
    { id: user.id, username: user.username } as JwtPayload,
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { token, user: { 
    id: user.id, username: user.username 
    } 
  };
};

export const loginUser = async (username: string, password: string) => {
  const user = await findUserByUsername(username);
  if (!user){
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  } 
  
  const token = jwt.sign(
    { id: user.id, username: user.username } as JwtPayload,
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { token, user: { 
    id: user.id, username: user.username 
    } 
  };
};