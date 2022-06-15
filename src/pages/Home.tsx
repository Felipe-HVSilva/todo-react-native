import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditArgs = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const updatedTask = tasks.map((task) => ({ ...task }));

    const taskIsExistis = updatedTask.find(
      (task) => task.title === newTaskTitle
    );

    if (taskIsExistis) {
      Alert.alert(
        "Task Cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome."
      );
      return;
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, task]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditArgs) {
    const updatedTilteTask = tasks.map((task) => ({ ...task }));

    const foundItem = updatedTilteTask.find((item) => item.id === taskId);

    if (!foundItem) {
      return;
    }

    foundItem.title = taskNewTitle;

    setTasks(updatedTilteTask);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundItem = updatedTasks.find((item) => item.id === id);

    if (!foundItem) {
      return;
    }

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover Item",
      "Você tem certeza que deseja remover este item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            const updatedTask = tasks.filter((task) => task.id !== id);
            setTasks(updatedTask);
          },
          style: "cancel",
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
