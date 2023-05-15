import { Repository } from "typeorm";
import { TLogin } from "../../interfaces/login.interface";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createServiceLogin = async (
  loginData: TLogin
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: { email: loginData.email },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordValid = compareSync(loginData.password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      adminPermission: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1d",
      subject: String(user.id),
    }
  );

  return token;
};
