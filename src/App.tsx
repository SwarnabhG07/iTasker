import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import bgImage from "./assets/bg.jpeg";
import { Navbar } from "./components/ui/Navbar";
import { v4 as uuidv4 } from 'uuid';
import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Check } from "lucide-react"; 

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
  
  const [showFinished, setShowFinished] = useState(true);


  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });


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
        className="relative flex flex-col min-h-screen w-full items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar />

        <div className="flex flex-1 w-full justify-center items-start p-3 pt-20">
          <Card className="w-full max-w-2xl flex flex-col max-h-[85vh]">

            <CardHeader className="relative ">
              <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <Switch 
                  checked={showFinished} 
                  onCheckedChange={setShowFinished} 
                  id="show-completed" 
                />
                <Label htmlFor="show-completed" className="text-[10px] sm:text-sm">
                  Show Completed
                </Label>
              </div>

              <CardTitle className="text-center text-2xl font-bold">TODO LIST</CardTitle>
              <CardDescription className="text-center">
                Add the Todos here
              </CardDescription>
            </CardHeader>
            
            <div className="flex justify-center items-center w-full px-6 pb-2">
              <Field className="w-full max-w-sm flex flex-col gap-2">
                <FieldLabel htmlFor="progress-upload" className="flex justify-between w-full">
                  <span>Task progress</span>
                  <span>{completedTodos} / {totalTodos}</span>
                </FieldLabel>
                <Progress value={progressPercentage} id="progress-upload" />
              </Field>
            </div>

            <CardContent className="flex flex-col gap-2 flex-1 overflow-y-auto pl-10 pr-6 mr-1 
              [&::-webkit-scrollbar]:w-2 
              [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-background 
              [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 
              hover:[&::-webkit-scrollbar-thumb]:bg-purple-800"
            >
              {todos.map((item) => {
                return (showFinished || !item.isCompleted) && (
                  <div key={item.id} className="flex justify-between items-center border border-slate-700 rounded-xl py-2 px-3">

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
                          size="icon"
                          onClick={() => handleSaveEdit(item.id)}
                          className="bg-green-600 text-white hover:bg-green-700 h-8 w-8"
                          title="Save"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          onClick={() => handleEdit(item.id, item.todo)}
                          className="bg-purple-700 text-white hover:bg-purple-800 h-8 w-8"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}

                      <Button
                        size="icon"
                        onClick={(e) => handleDelete(e, item.id)}
                        className="bg-purple-700 text-white hover:bg-purple-800 h-8 w-8"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>

            <div className="flex justify-center pb-4 pt-2 gap-2 w-full px-6 mt-auto">
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

        <div className="hidden sm:flex fixed bottom-8 right-8 flex-col items-end bg-black/30 backdrop-blur-md p-3 px-5 rounded-2xl border border-white/10 shadow-xl z-50">
          <span className="text-2xl font-bold text-white tracking-widest drop-shadow-md">
            {formattedTime}
          </span>
          <span className="text-sm text-slate-300 font-medium">
            {formattedDate}
          </span>
        </div>

      </div>
    </>
  )
}

export default App;