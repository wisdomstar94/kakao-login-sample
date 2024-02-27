import { AxiosError, AxiosResponse } from "axios";

// https://developers.kakao.com/docs/latest/ko/kakaologin/trouble-shooting
export interface KakaoErrorResponsePayload {
  error: string;
  error_description: string;
  error_code: string;
}

export interface KakaoRefreshResponsePayload {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
}

export interface KakaoOauthTokenResponsePayload {
  access_token: string;
  token_type: 'bearer',
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

export interface KakaoAccessTokenInfo {
  id: number; // 회원번호
  expires_in: number; // 액세스 토큰 만료 시간(초)	
  app_id: number; // 토큰이 발급된 앱 ID	
}

export class AxiosSuccess<T> {
  response: AxiosResponse;
  payload: T;

  constructor(response: AxiosResponse) {
    this.response = response;
    this.payload = response.data;
  }
}

export class AxiosFailure<T> {
  response: AxiosError;
  payload: T | undefined;
  error: Error | undefined;

  constructor(response: AxiosError) {
    this.response = response;
    this.error = this.response.cause;
    this.payload = response.response?.data as T;
  }
}