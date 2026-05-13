import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import bgImage from "./assets/bg.jpeg";
import { Navbar } from "./components/ui/Navbar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TodoItem {
  todo: string;
  isCompleted: boolean;
}

export function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handleEdit = () => {

  }
  
  const handleDelete = () => {

  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }
  
  const handleAdd = () => {
    setTodos([...todos, { todo, isCompleted: false }])
    setTodo("")
  }

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
              <CardTitle>TODO LIST</CardTitle>
              <CardDescription className="flex justify-between items-center">
                add the todos here
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 flex-1 overflow-y-auto pr-4 mr-1 
              [&::-webkit-scrollbar]:w-2 
              [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-background 
              [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 
              hover:[&::-webkit-scrollbar-thumb]:bg-purple-800"
            >
              {todos.map((item, index) => {
                return (
                  <div key={index} className="flex justify-between items-center">
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleEdit} className="bg-purple-700 text-white hover:bg-purple-800">Edit</Button>
                      <Button onClick={handleDelete} className="bg-purple-700 text-white hover:bg-purple-800">Delete</Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>

            <div className="flex justify-center pb-6 pt-4 gap-2 w-full px-6 mt-auto">
              <Input onChange={handleChange} value={todo} className="w-[60%]" placeholder="E.g., Finalize presentation..."></Input>
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