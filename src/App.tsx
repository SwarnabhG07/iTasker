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

export function App() {

  return (
    <>
      <div
        className="flex min-h-screen w-full items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Navbar />
        <Card className="w-full max-w-2xl">

          <CardHeader>
            <CardTitle>TODO LIST</CardTitle>
            <CardDescription>
              add the todos here
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Todos will render here */}
          </CardContent>

          <div className="flex w-full justify-center pb-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-purple-700 text-white hover:bg-purple-800">
                  Add Task
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Task</PopoverTitle>
                  <PopoverDescription>Write your task here</PopoverDescription>
                  
            
                  <Input 
                    type="text" 
                    placeholder="E.g., Finalize presentation..." 
                    className="mt-3" 
                  />
                  
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </div>

        </Card>
      </div>
    </>
  )
}

export default App;