import { remultExpress } from 'remult/remult-express';
import { Task } from '../shared/Task';

export const api = remultExpress({
  bodyParser: false, // 파싱은 next.js가 해주기 때문에 false로 설정
  entities: [Task],
  // initApi 콜백 함수는 데이터베이스 커넥션이 이루어지고
  // 서버가 초기화 동작을 수행할 준비가 되었을 때 딱 한번 호출된다.
  initApi: async remult => {
    // Repository는 엔티티 객체들을 불러오고 생성하는 역할을 하는 저장소 객체
    const taskRepo = remult.repo(Task);

    if (await taskRepo.count() === 0) {
      await taskRepo.insert([
        { title: "아침먹기" },
        { title: "점심먹기", completed: true },
        { title: "저녁먹기" },
        { title: "놀기" },
        { title: "취침", completed: true },
      ]);
    }
  }
});
// Remult를 이용하여 서버의 api 모듈에 Task 엔티티 등록

/**
 * http://localhost:3000/api/tasks 접속 시 테스트 데이터를 확인할 수 있으며,
 * 루트 디렉토리에 db/tasks.json 파일이 생성됨.
 */