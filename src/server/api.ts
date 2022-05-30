import { remultExpress } from 'remult/remult-express';

export const api = remultExpress( {
    bodyParser: false, // 파싱은 next.js가 해주기 때문에 false로 설정
} );