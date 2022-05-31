import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { remult } from '../src/common';
import { Task } from '../src/shared/Task';

const taskRepo = remult.repo(Task);

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // https://remult.dev/docs/ref_repository.html#find
        const data = await taskRepo.find();
        setTasks(data);
      } catch (e) {
        window.alert('목록을 불러오는 중 문제가 발생했습니다.');
        console.error(e);
      }
    };

    fetchTasks();
  }, []);

  console.log(tasks);

  return (
    <div>
      {tasks.map(({ id, title, completed }) =>
        <div key={id}>
          <input id={id} type="checkbox" checked={completed} />
          <label htmlFor={id}>{title}</label>
        </div>
      )}
    </div>
  );
};

export default Home;
