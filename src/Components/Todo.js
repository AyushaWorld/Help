import React, { useState,useEffect } from 'react'
import axios from 'axios';
import ShowTodo from './ShowTodo'
import './Todo.css'
function Todo() {

    const [task, setTask] = useState("add some task");
    const [data, setData] = useState([]);
    // const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axios.get('https://jsonplaceholder.typicode.com/users/1/todos');
            setData(response);
            console.log("response======",response);
          } catch (error) {
            console.error("error----",error)
          }
          setLoading(false);
        };
        fetchData();
      }, []);
      
    // const onChangeHandler = (e) => {
    //     setTask(e.target.value)
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        const newData = task;
        // console.log("nerrrrrrr0",newData);
        setData([...data, newData])
        // setTask('')
    }

    const deleteItem =(a)=>{
        const finalData = data.filter((curEle,index)=>{
            return index !== a;
        })
        setData(finalData)
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center main-row">
                <div className="col shadow main-col bg-white">
                    <div className="row bg-primary text-white">
                        <div className="col  p-2">
                            <h4 className='text-center'>Think To do</h4>
                        </div>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="row justify-content-between text-white p-2">
                            <div className="form-group flex-fill mb-2 col-9">
                                <input id="todo-input" type="text" className="form-control" value={task} onChange={(e)=>setTask(e.target.v)} />
                            </div>
                            <button type="submit" className="btn btn-primary mb-2 ml-2 col-3">Add todo</button>
                        </div>
                    </form>

                    {data.map((value, index) => {
                        {/* console.log("asassssssssssssssss",value) */}
                        return <ShowTodo
                            key={index}
                            id={value.userId}
                            task={value.title}
                            onSelcet={deleteItem}
                        />
                    })}


                </div>
            </div>
        </div>
    )
}

export default Todo
