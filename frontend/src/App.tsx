// @ts-nocheck
import {  useState,useEffect } from 'react'
import Student from './components/Student';
import Teacher from './components/Teacher';

function App() {
  const [user, setUser] = useState<string| null>(sessionStorage.getItem('user'));
  useEffect(() => {
    sessionStorage.setItem('user', user);
  },[user]);
  let content = (
      <div >
        <h1 className='font-bold font-mono text-2xl text-pink-950'>Are you a teacher or student?</h1>
        <div className='flex flex-row justify-center'>
          <button onClick={() =>setUser('teacher')} className='font-mono bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg p-10 m-4 hover:shadow-gray-800'>Teacher</button>
          <button onClick={() =>setUser('student')} className='font-mono bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg  p-10 m-4 hover:shadow-gray-800'>Student</button>
        </div>
        
      </div>
  )
  if(user === 'student'){
    content = (<>
    <Student />
    </>);
  }else if(user === 'teacher'){
    content = (<>
    <Teacher />
    </>);
  }
  return (
    <div className='h-screen bg-gradient-to-r from-cyan-500 to-blue-500 to-cy w-full flex flex-col items-center justify-center'>
      {content}
    </div>
    
  )
}

export default App
