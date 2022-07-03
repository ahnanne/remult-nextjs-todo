import { BackendMethod, Remult } from "remult";
import Task from "./Task";

export default class TasksController {
  @BackendMethod({ allowed: true })
  static async setAll(completed: boolean, remult?: Remult) {
    // 이때 두번째 매개변수 remult는, 프론트 단에서 호출되는 시점에는 생략됨.
    // @BackendMethod 데코레이터로 수식한 함수에는
    // 서버사이드에서 서버의 Remult 객체가 주입됨.
    const taskRepo = remult!.repo(Task);

    for (const task of await taskRepo.find()) {
      await taskRepo.save({ ...task, completed });
    }
  }
}