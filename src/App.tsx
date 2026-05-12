import { Button } from "@/components/ui/button";
import bgImage from "./assets/bg.jpeg"; 

export function App() {
  return (
    <>
      <div 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div>hello</div>
      </div>
    </>
  )
}

export default App;