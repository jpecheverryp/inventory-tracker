import { React, useState, useEffect } from 'react'
import './App.css';
import Users from './components/users';

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  return (
    <>
    <Users users={users} />
    </>
  );
}

export default App;
