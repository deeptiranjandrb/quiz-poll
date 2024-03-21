
import React, { useState,useRef,useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext';
import NameInput from './UI/NameInput';
import Question from './UI/Question';
import ResultGraph from './UI/ResultGraph';


function Student() {
    const [userConnected, setUserConnected] = useState<boolean>(false);
    const [questionDetails, setQuestionDetails] = useState({});
    const [options, setOptions] = useState({});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const[poll, setPoll] = useState({});
    const [totalCount, setTotalCount] = useState(0);
    const [ans, setAns] = useState(0);
    const socket = useSocketContext();
    socket.on('result', (data) =>{
        setPoll(data.options);
        setTotalCount(data.totalCount);
        setAns(data.answer);
        setSubmitted(true);
    })

    socket.on('question', (data) => {
        setOptions(data.options);
        setQuestionDetails(data);
        setSubmitted(false);
        setUserConnected(true);
    });
    let content = <NameInput connected={setUserConnected}/>;
    if(userConnected){
       content= <Question pQuestions={questionDetails} submitted={setSubmitted} options={setOptions} />
    }
    if(submitted){
        content = <ResultGraph options={options} pollParent={poll} totalCountParent={totalCount} ansParent={ans} />
    }

  return (
    <>
       {content }

        </>
  )
}

export default Student