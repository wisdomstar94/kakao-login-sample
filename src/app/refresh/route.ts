import { AxiosFailure, AxiosSuccess, KakaoErrorResponsePayload, KakaoRefreshResponsePayload } from "@/interfaces/common";
import axios, { AxiosHeaders } from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  const refreshToken = body.refreshToken;

  const client_id = process.env.KAKAO_CLIENT_ID;
  const redirect_uri = process.env.KAKAO_REDIRECT_URI;
  const response_type = process.env.KAKAP_RESPONSE_TYPE;
  const client_secret = process.env.KAKAO_CLIENT_SECRET;

  const data = {
    grant_type: 'refresh_token',
    client_id,
    refresh_token: refreshToken,
    client_secret,
  };

  const refresh_result = await axios.request({
    url: `https://kauth.kakao.com/oauth/token`,
    method: 'post',
    headers: new AxiosHeaders({
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    }),
    data,
  }).then(res => {
    return new AxiosSuccess<KakaoRefreshResponsePayload>(res);
  }).catch(res => {
    return new AxiosFailure<KakaoErrorResponsePayload>(res);
  });

  if (refresh_result instanceof AxiosFailure) {
    return new Response(JSON.stringify({ msg: `카카오로부터 토큰을 갱신하는데 실패하였습니다.`, ...refresh_result.payload }), {
      status: refresh_result.response.status,
    });
  }

  console.log('@refresh_result.payload', refresh_result.payload);

  return Response.json({ status: 200 });
}