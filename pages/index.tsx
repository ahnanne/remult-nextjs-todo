import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { remult } from '../src/common';
import { Task } from '../src/shared/Task';

import { HiddenLabel } from '../src/components/common';

const taskRepo = remult.repo(Task);

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hideCompleted, setHideCompleted] = useState(false);
  
  const handleError = (e: unknown) => {
    window.alert('목록을 불러오는 중 문제가 발생했습니다.');
    console.error(e);
  };

  useEffect(() => {
    const fetchTasks = async (hideCompleted: boolean) => {
      try {
        // https://remult.dev/docs/ref_repository.html#find
        const data = await taskRepo.find({
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
        handleError(e);
      }
    };

    fetchTasks(hideCompleted);
  }, [hideCompleted]);

  const handleTaskChange = (v: Partial<Task>, targetTask: Task) => {
    setTasks(tasks.map(task => {
      if (task === targetTask) {
        return {
          ...targetTask,
          ...v
        };
      } else {
        return task;
      }
    }));
  };

  const updateTask = async (task: Task) => {
    try {
      await taskRepo.save(task); // update database
    } catch (e) {
      handleError(e);
    }
  };

  console.log(tasks);

  return (
    <div>
      <label htmlFor='hide-completed'>완료된 항목 숨기기</label>
      <input
        id='hide-completed'
        type='checkbox'
        checked={hideCompleted}
        onChange={() => setHideCompleted(!hideCompleted)}
      />
      <ul>
        {tasks.map((task) =>
          <React.Fragment key={task.id}>
            <li>
              <HiddenLabel htmlFor={task.id}>{task.title}</HiddenLabel>
              <input
                id={task.id}
                type="checkbox"
                checked={task.completed}
                onChange={(e) => handleTaskChange({ completed: e.target.checked }, task)}
              />
              <HiddenLabel htmlFor={task.id}>{task.title}</HiddenLabel>
              <input
                id={`title-${task.id}`}
                value={task.title}
                onChange={(e) => handleTaskChange({ title: e.target.value }, task)}
              />
            </li>
            <button
              type='button'
              onClick={() => updateTask(task)}
            >
              수정
            </button>
          </React.Fragment>
        )}
      </ul>
    </div>
  );
};

export default Home;
