import {useState} from 'react'
import { useSocketContext } from '../../context/SocketContext';

function NameInput({connected}) {
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string>('');
    const socket = useSocketContext();
    socket.on('student-exists', (data) => {
        setError(data.message);
        connected(false);
    });
    socket.on('student-connected', () => {
        setError('');
        connected(true);
    });
    const submitHandler = (e) => {
        // sessionStorage.setItem('student-name', name);
        socket.emit('student-connection', {name: name});
    }
  return (
    <div className='w-full'>
    <div className="flex flex-row items-center justify-center mb-4 w-full">
      <label className="font-bold font-mono text-2xl text-pink-950" htmlFor="question">
        Enter Your Name:
      </label>
      <input   value={name} onChange={(e) => setName(e.target.value)}className="shadow appearance-none border rounded w-80 bg-slate-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="question" type="text" />
     <button onClick={(e) => submitHandler(e)} className='bg-black text-white p-2 pl-4 pr-4 ml-2 rounded-lg'>Continue</button>
    </div>
    {(error !== '') && (
    <div className="flex flex-row items-center justify-center mb-4 w-full">
    <p className='font-mono  text-red-600'>{error}</p>
    </div>)}
    </div>
  )
}

export default NameInput