"use client"

import LoginForm from "./components/login";

const App = () => {
   


    return (
        <div>
            <h1 className="text-center mt-[80px] text-4xl text-primary font-bold">Bienvenido a Middas Libreria</h1>
            <div className="flex justify-center items-center">
                <img src="/middaslogo.png" alt="Middas Logo" className="h-18 md:h-20 w-auto mt-3" />
            </div>
            <LoginForm/>
           
        </div>
    );
};

export default App;
