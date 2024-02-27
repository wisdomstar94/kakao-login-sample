export async function GET(request: Request) {
  const client_id = process.env.KAKAO_CLIENT_ID;
  const redirect_uri = process.env.KAKAO_REDIRECT_URI;
  const response_type = process.env.KAKAP_RESPONSE_TYPE;

  return Response.redirect(`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`);
}