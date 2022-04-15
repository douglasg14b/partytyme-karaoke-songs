import { Task } from "./features/tasks/models"

const testTasks: Task[] = [
    {
        name: 'Do Homework',
        description: 'Get chapter 2 done before tomorrow',
        due: '2022-04-08 12:30:00',
        completed: false,
        repeats: false
    },
    {
        name: 'Take Out Trash',
        description: 'Empty the bathroom trash before taking trash to road',
        due: '2022-04-08 12:30:00',
        completed: false,
        repeats: true
    }
]

export {
    testTasks
}