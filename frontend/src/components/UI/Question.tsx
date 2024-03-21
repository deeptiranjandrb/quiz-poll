import React,{useState, useEffect} from 'react'
import { useSocketContext } from '../../context/SocketContext';
function Question({pQuestions,submitted,options}) {
    
    const [timeLeft, setTimeLeft] = useState<number | null >(60);
    useEffect(() => {
        if(timeLeft === 0){
            setTimeLeft(null);
            options(questionDetails.options);
            submitted(true);
        }
        if(!timeLeft) return;
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
          }, 1000);
        return () => clearInterval(intervalId);
    },[timeLeft]);
    const socket = useSocketContext();
    const [questionDetails, setQuestionDetails] = useState(pQuestions);
    const [selectedOption, setSelectedOption] = useState(0);
    socket.on('question', (data) => {
        setTimeLeft(data.timer);
        setQuestionDetails(data);
    });
    const answerHandler = (key) =>{
            setSelectedOption(key);
    }
    const submitHandler = () => {
        submitted(true);
        options(questionDetails.options);
        if(questionDetails.answer.toString() === selectedOption.toString()){
            socket.emit('student-answer', {result: 'correct', answer: selectedOption.toString()});
        }else{
            socket.emit('student-answer', {result: 'incorrect', answer: selectedOption.toString()});
        }
    }
    let content = (
        <div className='mb-5'>
        <p className="font-bold font-mono text-2xl text-blue-950"><span className="text-pink-950">Waiting for a question...</span> {questionDetails.question}</p>
        </div>
    );
    if(Object.keys(questionDetails).length > 0){
        content = (
            <div>
            <div className='mb-5'>
            <p className="font-bold font-mono text-2xl text-blue-950"><span className="text-pink-950">Question:</span> {questionDetails.question}</p>
            <p className="font-bold font-mono text-2xl text-blue-950"><span className="text-pink-950">timeLeft :</span> {timeLeft}</p>
            </div>
            <div className='grid grid-cols-2 grid-flow-row gap-4'>
            {questionDetails.options && Object.keys(questionDetails.options).map((key, i) => {
                return (<React.Fragment key={key}>
                <button onClick={(e) => answerHandler(key)}className={`${selectedOption.toString() === key ?'bg-green-500': 'bg-rose-900'}  shadow-md hover:bg-slate-800 text-white p-8 pl-4 pr-4 ml-2 rounded-lg`} > {questionDetails.options[key]}</button>
                </React.Fragment>)
            })}
            </div>
            <div className='flex flex-row items-end justify-end mt-6'>
            <button onClick={submitHandler} className="bg-blue-950 shadow-md hover:bg-slate-800 text-white p-4 pl-12 pr-12 ml-2 rounded-lg"> Submit</button>
            </div>
        </div>
        );
    }
  return (
   content
  )
}

export default Question