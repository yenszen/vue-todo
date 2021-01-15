<template>
  <div class="todos">
    <div class="actions">
      <label for="filters">Hide completed tasks </label>
      <input type="checkbox" name="filters" v-on:click="filter()" />
    </div>

    <div v-if="isEdit" class="edit-form">
      <h3>Edit Todo</h3>
      <input type="text" id="edit-text" />
      <div>
        <button type="button" v-on:click="makeEdit">Save Edit</button>
        <button type="button" v-on:click="editClose">Cancel</button>
      </div>
    </div>

    <div v-if="filterState">
      <div
        v-for="(todo, index) in incompleteTodos"
        v-bind:key="index"
        v-bind:class="completeClass(todo.id)"
      >
        <div class="todo-text" v-on:click="toggleComplete(todo.id)">
          <p>{{ todo.text }}</p>
        </div>
        <button
          type="button"
          v-on:click="
            editId = todo.id;
            isEdit = true;
          "
        >
          Edit
        </button>
        <button type="button" v-on:click="remove(todo.id)">Remove</button>
      </div>
    </div>

    <div v-else>
      <div
        v-for="(todo, index) in todos"
        v-bind:key="index"
        v-bind:class="completeClass(todo.id)"
      >
        <div class="todo-text" v-on:click="toggleComplete(todo.id)">
          <p>{{ todo.text }}</p>
        </div>
        <button
          type="button"
          v-on:click="
            editId = todo.id;
            isEdit = true;
          "
        >
          Edit
        </button>
        <button type="button" v-on:click="remove(todo.id)">Remove</button>
      </div>
    </div>

    <div class="add-todo">
      <input type="text" placeholder="New todo" id="input-text" />
      <button type="submit" v-on:click="add()">Add Todo</button>
    </div>
  </div>
</template>

<script>
import { uuid } from "vue-uuid";

export default {
  data() {
    return {
      todos: [],
      filterState: false,
      isEdit: false,
      editId: null,
    };
  },
  computed: {
    incompleteTodos: function () {
      return this.todos.filter((todo) => todo.completed === false);
    },
  },
  methods: {
    toggleComplete(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
    },
    completeClass(id) {
      let completeClassName = "todo-card";
      const currentTodo = this.todos.find((todo) => todo.id === id);

      if (currentTodo.completed) {
        completeClassName = "todo-card completed";
      }

      return completeClassName;
    },
    add() {
      const inputText = document.getElementById("input-text").value;
      const newTodo = { id: uuid.v4(), text: inputText, completed: false };
      this.todos = [...this.todos, newTodo];
      document.getElementById("input-text").value = "";
    },
    remove(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    filter() {
      this.filterState = !this.filterState;
    },
    makeEdit() {
      const inputText = document.getElementById("edit-text").value;
      const todo = this.todos.find((todo) => todo.id === this.editId);
      todo.text = inputText;
      todo.completed = false;
      document.getElementById("edit-text").value = "";
      this.isEdit = false;
    },
    editClose() {
      this.isEdit = false;
    },
  },
};
</script>

<style>
.todos {
  background-color: #2b292e;
  height: 85vh;
}

button {
  background-color: #083d77;
  color: white;
  border: none;
  border-radius: 5px;
  height: 2rem;
  width: 5rem;
}

button:hover {
  background-color: rgb(6, 39, 71);
}

input {
  height: 1.6rem;
}

input:focus,
button:focus {
  outline-width: 0;
}

.actions {
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1d20;
}

.todo-card {
  width: 90%;
  height: 3rem;
  margin: 1rem auto;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(85, 78, 95);
}

.todo-card:hover {
  background-color: #736a7e;
}

.todo-text {
  width: 50%;
  cursor: pointer;
}

.completed {
  opacity: 0.5;
}

.completed p {
  text-decoration: line-through;
}

.add-todo {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.edit-form {
  width: 75%;
  height: 10rem;
  background: #487aaf;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.edit-form input {
  width: 50%;
  margin: 0 auto;
}

.edit-form div {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
}

/* RESPONSIVE FOR TABLET/DESKTOP VIEWS */
@media only screen and (min-width: 600px) {
  .todo-card,
  .add-todo,
  .edit-form {
    width: 60%;
  }

  .todo-text {
    width: 70%;
  }
}
</style>