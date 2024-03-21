import { useState} from 'react';
import {  } from "../context/SocketContext"
import QuestionInput from './UI/QuestionInput';
import ResultGraph from './UI/ResultGraph';

function Teacher() {
   const [waiting, setWaiting] = useState(false);
   const [options, setOptions] = useState({});
  return (
    <>
    {waiting ? <ResultGraph options={options} pollParent={{}} totalCountParent={0} ansParent={0}/>:<QuestionInput updateWait={setWaiting} parentOptions={setOptions} />}
    
     {/* <QuestionInput updateWait={setWaiting} /> */}
    </>
  )
}

export default Teacher