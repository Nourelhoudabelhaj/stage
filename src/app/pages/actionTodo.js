import {EventExport} from "@/app/Exports/ModelExports";
import {atomWithImmer} from "jotai-immer";

export const EventExports12 = atomWithImmer([
]);
export const getTodoList = async () => {
    // Simulating an API call
    return [{ id: 1, title: 'Event 1', type: 'Exports', start: '2023-07-20', completed: false, end: '2023-07-27' },
        { id: 2, title: 'Event 2', type: 'Imports', start: '2023-07-20', completed: false, end: '2023-07-27' }];
};
export const updateTodo = (id) => (state) => {
    const todo = state.find((item) => item.id === id);
    //console.log(state);
    if (todo) {
        console.log(todo.completed);

        todo.completed = !todo.completed;
    }
};
