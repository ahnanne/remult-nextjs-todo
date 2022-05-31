import { remultExpress } from 'remult/remult-express';
import { Task } from '../shared/Task';

export const api = remultExpress({
    bodyParser: false, // 파싱은 next.js가 해주기 때문에 false로 설정
    entities: [Task]
});
// Remult를 이용하여 서버의 api 모듈에 Task 엔티티 등록