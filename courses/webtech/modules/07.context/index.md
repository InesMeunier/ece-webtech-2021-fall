---
date: 2020-11-23
duration: 1.5 hours
---

# React Context

When react applications grow and gain more additionnal complexity, sharing data between the components and updating the comportant in sync with new values become cumbersome. Traditionnally, there were solutions to circumvent such as Redux and Mobx. The recent addition of the Context API in React simplify state management.



## State in components

```js
const Greeting = ({user}) => {
  return (
    <span>Hello (user ? {user.username} : 'anonymous')</span>
  )
}
const Counter = ({props} => {
  const [count, setCount] = useState(0);
  const increment = (inc) => {
    setCount(count+inc)
  }
  const [user, setUser] = useState(null);
  return (
    <div>
      <Greeting user={user} />
      <span>{count}</span>
      <button onClick={(e) => {increment(1)}}>Incr by 1</button>
      <button onClick={(e) => {increment(2)}}>Incr by 2</button>
      <button onClick={(e) => {setUser({username: 'david'})}}>Login</button>
    </div>
  )
})
```



## Why

* Share data at all level of the application
* Solve the problem of prop drilling
* Leverage existing hooks such as useState
* Centralize state management

## Prop drilling

* Passing properties through the component hierarchy
* From the top to all level of the tree to the component needing it
* Not all components need those properties
* Pass access to modify the value of those properties

## Before

```
<RootComponent>                  (context key=value)
  <IntermediateComponent>        (context key=value)
    <OtherIntermediateComponent> (context key=value)
      <ChildComponent>           (context key=value)
```

## After

```
<RootComponent>                  (context key=value)
  <IntermediateComponent>                 |
    <OtherIntermediateComponent>          |
      <ChildComponent>           (context key=value)
```

## API

* Instantiation with new Context
* One Context.Privider
* Multiple Context.Consumer
* Consumers may use the `useContext(context)` hook

## Example - Context initialization

```jsx
import React, {useState} from 'react'

export const Context = React.createContext();

export const ContextProvider ({
  children
}) => {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)
  return (
    <Context.Provider value={{
      count: count,
      setCount: (incr) => {
        setCount(count + incr)
      },
      user: user,
      login: (user) => {
        if(user && !user.email){
          throw Error("Invalid user")
        }
        setUser(oauth)
      },
      logout: () => {
        setUser(null)
      }
    }}>{children}</Context.Provider>
  )
}
```

## Example - Provider registration

```jsx
import ContextProvider from './Context'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CookiesProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Example - Consumer hook

```js
import {useContext} from 'react';
import {Context} from './Context'

const LoggedOut () => {
  const {login} = useContext(Context)
  return (
    <button onclick={()=>{ login('guest') }}>Login</button>
  )
}

const LoggedIn () => {
  const {user, logout} = useContext(Context)
  return (
    <div>
      Welcome {user}
      <button onclick={()=>{ logout() }}>Logout</button>
    </div>
  )
}

export default () => {
  const {user} = useContext(Context)
  return user ? <LoggedIn /> : <LoggedOut />
})
```
