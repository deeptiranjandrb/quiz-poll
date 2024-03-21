import { useEffect, useState, } from 'react'
import { useSocketContext } from '../../context/SocketContext';

function ResultGraph({options,pollParent, totalCountParent, ansParent}) {
    const[poll, setPoll] = useState(pollParent);
    const [totalCount, setTotalCount] = useState(totalCountParent);
    const [ans, setAns] = useState(ansParent);
    const socket = useSocketContext();
    useEffect(() => {
        socket.on('option-update', (data) => {
            setPoll(data.options);
            setTotalCount(data.totalCount);
        });
        socket.on('result', (data) =>{
            console.log(data);
            setPoll(data.options);
            setTotalCount(data.totalCount);
            setAns(data.answer);
        })
    },[])
    
    
    let content = (<></>);
    if(Object.keys(options).length > 0) {

        content =  Object.keys(options).map((option) => {
           return <p className={`${parseInt(ans) === parseInt(option) ? "bg-green-500":"bg-blue-500"} p-2 m-4  text-white w-full rounded-sm`}key={options[option]}>{options[option]}: <span className="ml-4 mr-0">{poll[option]?(Math.round((poll[option]/totalCount) * 100) ):0 } %</span></p>
        }
        );
    }
  return (
    
    <div>
        <h2 className='font-bold font-mono text-2xl text-pink-950'> Polling results</h2>
        {content}
    </div>
  )
}

export default ResultGraph