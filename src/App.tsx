import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import bgImage from "./assets/bg.jpeg";
import { Navbar } from "./components/ui/Navbar";
import { v4 as uuidv4 } from 'uuid';
import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Field, FieldLabel } from "@/components/ui/field"


"use client"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TodoItem {
  id: string;
  todo: string;
  isCompleted: boolean;
}

export function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const saveToLS = (newTodos: TodoItem[]) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const handleToggleComplete = (id: string) => {
    const index = todos.findIndex(item => item.id === id);
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  }

  const handleEdit = (id: string, currentText: string) => {
    setEditingId(id);
    setEditValue(currentText);
  }

  const handleSaveEdit = (id: string) => {
    if (!editValue.trim()) return;

    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, todo: editValue } : item
    );

    setTodos(updatedTodos);
    setEditingId(null);
    setEditValue("");
    saveToLS(updatedTodos);
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });

    setTodos(newTodos)
    saveToLS(newTodos);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    if (!todo.trim()) return;

    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos)
    setTodo("")
    saveToLS(newTodos);
  }

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      let savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  const totalTodos = todos.length;
  const completedTodos = todos.filter(item => item.isCompleted).length;
  const progressPercentage = totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100;

  return (
    <>
      <div
        className="flex flex-col min-h-screen w-full items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar />

        <div className="flex flex-1 w-full justify-center items-start p-4 pt-24">
          <Card className="w-full max-w-2xl flex flex-col max-h-[80vh]">

            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">TODO LIST</CardTitle>

              <CardDescription className="text-center">
                Add the Todos here
              </CardDescription>


            </CardHeader>
            <div className="flex justify-center items-center w-full">
              <Field className="w-full max-w-sm flex flex-col gap-2">
                <FieldLabel htmlFor="progress-upload" className="flex justify-between w-full">
                  <span>Task progress</span>
                  <span>{completedTodos} / {totalTodos}</span>
                </FieldLabel>
                <Progress value={progressPercentage} id="progress-upload" />
              </Field>
            </div>


            <CardContent className="flex flex-col gap-4 flex-1 overflow-y-auto pl-10 pr-6 mr-1 
              [&::-webkit-scrollbar]:w-2 
              [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-background 
              [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 
              hover:[&::-webkit-scrollbar-thumb]:bg-purple-800"
            >
              {todos.map((item) => {
                return (
                  <div key={item.id} className="flex justify-between items-center py-2">

                    <div className="flex items-center gap-4 flex-1 mr-4">
                      <Checkbox
                        checked={item.isCompleted}
                        onCheckedChange={() => handleToggleComplete(item.id)}
                        disabled={editingId === item.id}
                      />

                      {editingId === item.id ? (
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(item.id);
                          }}
                          className="h-8"
                        />
                      ) : (
                        <div className={`text-lg break-all ${item.isCompleted ? "line-through text-slate-500" : ""}`}>
                          {item.todo}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {editingId === item.id ? (
                        <Button
                          onClick={() => handleSaveEdit(item.id)}
                          className="bg-green-600 text-white hover:bg-green-700"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleEdit(item.id, item.todo)}
                          className="bg-purple-700 text-white hover:bg-purple-800"
                        >
                          Edit
                        </Button>
                      )}

                      <Button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="bg-purple-700 text-white hover:bg-purple-800"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>

            <div className="flex justify-center pb-6 pt-4 gap-2 w-full px-6 mt-auto">
              <Input
                onChange={handleChange}
                value={todo}
                className="w-[60%]"
                placeholder="E.g., Finalize presentation..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdd();
                }}
              />
              <Button onClick={handleAdd} className="bg-purple-700 text-white hover:bg-purple-800">
                Add Task
              </Button>
            </div>

          </Card>
        </div>
      </div>
    </>
  )
}

export default App;