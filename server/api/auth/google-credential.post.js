import { OAuth2Client } from 'google-auth-library';
// 只有post方法才能使用
export default defineEventHandler(async (event) => {
  const body = await readBody(event);// 讀取請求的body
  const oauth2Client = new OAuth2Client();

  const ticket = await oauth2Client.verifyIdToken({
    idToken: body.credential
  });// 驗證token

  const payload = ticket.getPayload();// 用戶訊息

  if (!payload) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid token'
    });
  }

  return {
    id: payload.sub,
    name: payload.name,
    avatar: payload.picture,
    email: payload.email,
    emailVerified: payload.email_verified
  };
});