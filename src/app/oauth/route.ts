import { AxiosFailure, AxiosSuccess, KakaoAccessTokenInfo, KakaoErrorResponsePayload, KakaoOauthTokenResponsePayload } from "@/interfaces/common";
import axios, { AxiosHeaders } from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const client_id = process.env.KAKAO_CLIENT_ID;
  const redirect_uri = process.env.KAKAO_REDIRECT_URI;
  const client_secret = process.env.KAKAO_CLIENT_SECRET;

  const code = searchParams.get('code');

  const data = {
    grant_type: 'authorization_code',
    client_id,
    redirect_uri,
    code,
    client_secret,
  };

  // token 요청
  const token_result = await axios.request({
    url: `https://kauth.kakao.com/oauth/token`,
    method: 'post',
    headers: new AxiosHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }),
    data,
  }).then(res => {
    return new AxiosSuccess<KakaoOauthTokenResponsePayload>(res);
  }).catch(res => {
    return new AxiosFailure<KakaoErrorResponsePayload>(res);
  });

  if (token_result instanceof AxiosFailure) {
    return new Response(JSON.stringify({ msg: `카카오로부터 토큰을 받아오는데 실패하였습니다.`, ...token_result.payload }), {
      status: token_result.response.status,
    });
  }

  console.log('@token_result.payload', token_result.payload);

  // access token 정보 요청
  const access_token_info_result = await axios.request({
    url: `https://kapi.kakao.com/v1/user/access_token_info`,
    method: 'get',
    headers: new AxiosHeaders({
      "Authorization": `Bearer ${token_result.payload.access_token}`,
    }),
  }).then(res => {
    return new AxiosSuccess<KakaoAccessTokenInfo>(res);
  }).catch(res => {
    return new AxiosFailure<KakaoErrorResponsePayload>(res);
  });

  if (access_token_info_result instanceof AxiosFailure) {
    return new Response(JSON.stringify({ msg: `카카오로부터 토큰 정보를 받아오는데 실패하였습니다.`, ...access_token_info_result.payload }), {
      status: access_token_info_result.response.status,
    });
  }

  console.log('@access_token_info_result.payload', access_token_info_result.payload);

  return Response.json({ status: 200 });
}