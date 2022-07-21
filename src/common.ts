import axios from "axios";
import { Remult } from "remult";
import jwtDecode from "jwt-decode";

export const remult = new Remult(axios);
// Remult 객체를 생성한다.
// 프론트엔드에선 API 서버와 통신하기 위해 이 Remult 객체를 사용한다.

const AUTH_TOKEN_KEY = "authToken";

// setAuthToken 함수는 디코딩된 사용자 정보를 Remult로 보내고,
// 토큰을 세션 스토리지에 보관한다.
export function setAuthToken (token: string | null) {
  if (token) {
    remult.setUser(jwtDecode(token));
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  else {
    remult.setUser(undefined!);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

// loadAuth는 세션 스토리지에 있는 인증 정보를 로드한다.
export function loadAuth () {
  setAuthToken(sessionStorage.getItem(AUTH_TOKEN_KEY));
}

// axios interceptor는 모든 API 요청 시 헤더로 인증 토큰을 포함하여 요청하기 위해 사용했다.
axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers![ "Authorization" ] = "Bearer " + token;

    return config;
  }
});