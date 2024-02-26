import { createContext } from "react";

//In React, context is a way to pass data through the component tree without having to pass props manually at every level. It's designed to share values like themes, user authentication status, or any other kind of global state between components efficiently.

// creating a new context
const noteContext= createContext();
export default noteContext;