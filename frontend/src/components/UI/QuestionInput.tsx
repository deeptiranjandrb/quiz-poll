import React,{useState} from 'react'
import { useSocketContext } from '../../context/SocketContext';

function QuestionInput({updateWait, parentOptions}) {
    const [question, setQuestion] = useState('');
    const [checked, setChecked] = useState(0);
    const [options, setOptions] = useState({});
    const [timer, setTimer] = useState<number>(60);
    const socket = useSocketContext();

    const [optionCount, setOptionCount] = useState(0);
    const addOptionHandler = (e) => {
        e.preventDefault();
        setOptionCount(prev => prev + 1);
    }
    const submitQuestion = (e) => {
        e.preventDefault();
        const eventData = {
            question: question,
            options: options,
            answer: checked,
            timer: timer
        }
        socket.emit('question', eventData);
        updateWait(true);
    }
    const optionInputHandler = (e, optionNo) => {
        setOptions(prev => {return {...prev, [optionNo]: e.target.value}});
        parentOptions(prev => {return {...prev, [optionNo]: e.target.value}});
    }
    const checkHandler = (e, checkboxNo) => {
        if(e.target.checked){
            setChecked(checkboxNo);
        }
    }
    const optionsJSX = [];
    if(optionCount > 0 ){
        optionsJSX.push(<React.Fragment key={0}>
           <div className='flex flex-row items-center m-2 p-2 justify-start'>
           <p>Option:</p>
    <p className='pl-44'>isCorrect</p>
   </div>
        </React.Fragment>);
        for(let i = 1; i<=optionCount;i++){
            optionsJSX.push((<React.Fragment key={i}>
    <div key={i} className='flex flex-row items-center m-2 p-2'>
        <input className="shadow bg-slate-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={options[i]} onChange={(e) => optionInputHandler(e, i)}className="shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="question" type="text" />
        <input checked={checked === i} onChange={(e) => checkHandler(e, i)}className='ml-10 w-6 h-6' type="checkbox" />
    </div>
    </React.Fragment>))
        }
    }
  return (
    <div >
    <h2 className="font-bold font-mono text-2xl text-pink-950 border-b-2 mb-3 border-black">Enter Questions and Options</h2>
    <form>
    <div className="mb-4 w-full">
      <label className="block font-bold font-mono text-2xl text-pink-950" htmlFor="question">
        Question:
      </label>
      <input  value={question} onChange={e => setQuestion(e.target.value)} className="shadow bg-slate-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="question" type="text" />
    </div>
    <div className="mb-4 w-full">
      <label className="block font-mono text-2xl text-pink-950 mb-2" htmlFor="question">
        Timer:
      </label>
      <input  value={timer} onChange={e => setTimer(e.target.value)} className="shadow bg-slate-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="timer" type="number" />
    </div>
    {optionsJSX.map(option => option)}
    <button onClick={(e) => addOptionHandler(e)} className='bg-black text-white p-2 pl-4 pr-4 rounded-lg'>Add a Option</button>
    <button onClick={(e) => submitQuestion(e)} className='bg-black text-white p-2 pl-4 pr-4 ml-24 rounded-lg'>{`Ask Question ->`}</button>
  </form>
    </div>
  )
}

export default QuestionInput;