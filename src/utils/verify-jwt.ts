import jwt from 'jsonwebtoken';

const nextAuthSecret = process.env.NEXTAUTH_SECRET as string;

const verifyJwt = (
  token: string,
): boolean | jwt.Jwt | jwt.JwtPayload | string => {
  let payload;
  try {
    payload = jwt.verify(token, nextAuthSecret);
  } catch (e) {
    return false;
  }
  return payload;
};

export default verifyJwt;
