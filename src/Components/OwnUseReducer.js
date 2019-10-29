import React, { useState }  from 'react';


const useInputState = () => {
  const [value, setValue] = useState('');
  return {
    value,
    onChange: event => {
      setValue(event.target.value);
    },
    reset: () => setValue('')
  };
};

const TodoForm = ({ saveTodo }) => {
  const { value, reset, onChange } = useInputState();

  return (
    <>
    <div>Add ToDos</div>
      <form
        onSubmit={event => {
          event.preventDefault();
          saveTodo(value);
          reset();
        }}
      >
        <input type="text" onChange={onChange} value={value} />
      </form>
    </>
  );
};

const TodoList = ({ todos, deleteTodo }) => (
  <ul>
    {todos.map((todo, index) => (
      <li key={index.toString()}>
        {todo.name} &nbsp;
         <button
            onClick={() => {
              deleteTodo(index);
            }}
          >
          </button>
      </li>
    ))}
  </ul>
);

function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        name: action.trimmedText,
        completed: false
      }];

    case 'delete':
      const newTodos = state.filter((_, index) => index !== action.index);
      return newTodos;
      
    // ... other actions ...
    default:
      return state;
  }
}


function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}


function OwnUseReducer() {

  const [todos, dispatch] = useReducer(todosReducer, []);
  
  return (
    <>
      <TodoForm
        saveTodo={todoText => {
          const trimmedText = todoText.trim();
          if (trimmedText.length > 0) {
            dispatch({ type: 'add', trimmedText });
          }
        }}
      />

      <TodoList todos={todos} 
        deleteTodo={index => {
          dispatch({ type: 'delete', index });
        }} />
    </>
  );
}


export default OwnUseReducer;