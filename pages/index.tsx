import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { ErrorInfo } from 'remult';
import { remult } from '../src/common';
import { Task } from '../src/shared/Task';

import { HiddenLabel } from '../src/components/common';

const taskRepo = remult.repo(Task);

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<(Task & { error?: ErrorInfo<Task> })[]>([]);
  const [hideCompleted, setHideCompleted] = useState(false);
  
  const handleError = (e: any) => {
    const errorMessage = e.message || '목록을 불러오는 중 문제가 발생했습니다.';
    window.alert(errorMessage);
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

  const updateTask = async (targetTask: Task) => {
    try {
      const updatedTask = await taskRepo.save(targetTask); // update database
      setTasks(tasks.map((task) => task === targetTask ? updatedTask : task));
    } catch (e: any) {
      handleError(e);
      setTasks(tasks.map((task) => task === targetTask ? { ...task, error: e } : task));
    }
  };

  const addTask = () => {
    setTasks([...tasks, new Task()]);
  };

  const deleteTask = async (targetTask: Task) => {
    try {
      await taskRepo.delete(targetTask);
      setTasks(tasks.filter((task) => task !== targetTask));
    } catch (e) {
      handleError(e);
    }
  };

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
        {tasks.map((task, idx) => {
          console.log(task);
          return (
            <React.Fragment key={task.id || idx}>
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
                {task.error?.modelState?.title}
              </li>
              <button
                type='button'
                onClick={() => updateTask(task)}
              >
              수정
              </button>
              <button
                type='button'
                onClick={() => deleteTask(task)}
              >
              삭제
              </button>
            </React.Fragment>
          );
        }
        )}
      </ul>
      <button
        type='button'
        onClick={addTask}
      >
        할 일 추가
      </button>
    </div>
  );
};

export default Home;
