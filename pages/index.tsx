import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { remult } from '../src/common';
import { Task } from '../src/shared/Task';

const taskRepo = remult.repo(Task);

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    const fetchTasks = async (hideCompleted: boolean) => {
      try {
        // https://remult.dev/docs/ref_repository.html#find
        const data = await taskRepo.find( {
          limit: 20, // 페이징
          orderBy: { // 정렬
            completed: 'asc'
          },
          where: { // 필터링
            completed: hideCompleted ? false : undefined
          }
        });
        setTasks(data);
      } catch (e) {
        window.alert('목록을 불러오는 중 문제가 발생했습니다.');
        console.error(e);
      }
    };

    fetchTasks(hideCompleted);
  }, [hideCompleted]);

  console.log(tasks);

  return (
    <div>
      <input
        id='hide-completed'
        type='checkbox'
        checked={hideCompleted}
        onChange={() => setHideCompleted(!hideCompleted)}
      />
      <label htmlFor='hide-completed'>완료된 항목 숨기기</label>
      <ul>
        {tasks.map(({ id, title, completed }) =>
          <li key={id}>
            <input id={id} type="checkbox" checked={completed} />
            <label htmlFor={id}>{title}</label>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Home;
