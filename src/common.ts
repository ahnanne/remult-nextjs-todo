import axios from "axios";
import { Remult } from "remult";

export const remult = new Remult( axios );
// Remult 객체를 생성한다.
// 프론트엔드에선 API 서버와 통신하기 위해 이 Remult 객체를 사용한다.