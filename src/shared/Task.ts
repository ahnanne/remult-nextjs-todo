import { Entity, Fields, Validators, Allow } from 'remult';

// Entity 데코레이터는 Remult에게 이 클래스가 엔티티 클래스임을 알려준다.
// API 라우트와 디폴트 db 콜렉션/테이블 이름으로 사용될 값을 첫 번째 매개변수(key)로 전달한다.
// 또한 엔티티와 관련된 프로퍼티와 동작을 정의하는 옵션을 두 번째 매개변수(options)로 전달한다.
@Entity("tasks", {
  allowApiCrud: Allow.authenticated // CRUD 모두 허용하기 위해 설정
})
export default class Task {
  @Fields.uuid()
    id!: string; // 옵셔널

  @Fields.string({
    // Remult는 이 validate 함수를 서버사이드에서 호출하여 유효성을 검증함.
    validate: Validators.required
    // validate: (task) => {
    //   if (task.title.length < 3)
    //     throw "Too Short";
    // }
  })
    title = '';

  @Fields.boolean()
    completed = false;
}