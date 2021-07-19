import React, { FC, ChangeEvent, useState } from 'react'
import './App.css';
import { ITask } from './interfaces';
import TodoTask from './components/todotask'
const App: FC = () => {
  const [task, setTask] = useState<string>('')
  const [deadLine, setDeadLine] = useState<number>(0)
  const [todoList, setTodoList] = useState<ITask[]>([])
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target)
    if (event.target.name === 'task') {
      setTask(event.target.value)
    } else {
      setDeadLine(Number(event.target.value))
    }
  }
  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadLine }
    setTodoList([...todoList, newTask])
    setTask('')
    setDeadLine(0)

  }
  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter(task => {
      return task.taskName !== taskNameToDelete
    }))
  }
  console.log(todoList);
  console.log(task, '--->', deadLine);

  return (
    <div className="App">
      <div className='header'>
        <div className='inputContainer'>
          <input type="text" placeholder="task..." value={task} name='task' onChange={handleChange} />
          <input type="number" placeholder="deadline in (days)..." value={deadLine} name='deadline' onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add task</button>
      </div>
      <div className='todoList'>
        {todoList && todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
}

export default App;
