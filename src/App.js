import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useState, useEffect} from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;
const SubTask = (props)=>{
    const [subTaskName, setSubTaskName] = useState("");
    const [setlenSubtask] = useState(props.data.task.length);
    // const [subTask, setSubTask] = useState([])
    console.log(props.data)
    console.log(props.data.task.length)

    // const subtaskData = props.data.task
    return (<Space direction="vertical" style={{ width: "100%" }}>
                <Space>
                  <Input placeholder="Enter Subtask Name" style={{ width: 400 }} value={subTaskName} onChange={(event)=>{setSubTaskName(event.target.value)}}/>
                  <Button type="primary" onClick={()=> {
                      props.onAddSubTask(subTaskName, props.index);
                      setlenSubtask(props.data.task.length);
                  }}>Add Subtask
                  </Button>
                </Space>
                <Divider />
        {props.data.task.map((subtask, subTaskIndex)=>(<Row>
            <Col span={16}>
                <Typography.Text>{subtask.name}</Typography.Text>
              </Col>
              <Col span={8}>
                <Button type="primary">Done</Button>{" "}
                <Button type="danger" onClick={()=>{
                    props.onDeleteSubTask(props.index, subTaskIndex);
                    setlenSubtask(props.data.task.length);
                }}>Delete</Button>
              </Col>
        </Row>))}
    </Space>);
}

const Task = (props)=>{
    // console.log(props);
    const taskData = props.data;
    return (
        <React.Fragment>
        {taskData.map((data, index) => (<Space direction="vertical" style={{ marginTop: 24 }}>
                <Card
                    title={data.name}
                    style={{ width: 600 }}
                    extra={
                        <React.Fragment>
                            <Button type="primary" onClick={() => props.onDuplicate(index)}>Duplicate</Button>{" "}
                            <Button type="primary" danger onClick={() => props.onDelete(index)}>
                                Delete
                            </Button>
                        </React.Fragment>
                    }
                >
                    <SubTask index={index} data={data} onAddSubTask={props.onAddSubTask} onDeleteSubTask={props.onDeleteSubTask}/>
                </Card>
            </Space>))}
        </React.Fragment>
    )
}

function App() {
  const exampleModel = [
      {
         "name": "task1",
         "isAllDone": false,
         "task": [
            {
               "name": "subtask1",
               "isDone": false
            }
         ]
      },
      {
         "name": "tast2",
         "isAllDone": false,
         "task": [
            {
               "name": "test2",
               "isDone": false
            }
         ]
      }
   ]
  const [dataState, setData] =  useState(exampleModel);
  const [len, setlen] =  useState(0); // forReRender not good practice i think.
  // const [subtaskLen, setSubtaskLen] = useState(0);
  const [taskName, setTaskname] =  useState("");
  console.log(taskName)
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   // document.title = `You clicked ${} times`;
  // });
  const createTask = (props) => {
        const newTask = {
             "name": taskName,
             "isAllDone": false,
             "task": []
          }
        dataState.push(newTask);
        console.log(dataState);
        setData(dataState);
        setlen(dataState.length);
    }
  const deleteTask = (index) => {
      // const newTask = {
      //        "name": taskName,
      //        "isAllDone": false,
      //        "task": []
      //     }
      console.log(index)
        dataState.splice(index, 1);
// arr.splice(i, 1);
        // console.log(dataState);
        setData(dataState);
        setlen(dataState.length);
  }
  const duplicate = (index) => {
      console.log(index)
      const duplicateTask = dataState[index];
        dataState.push(duplicateTask);
        setData(dataState);
        setlen(dataState.length);
}
  const addSubTask = (subTaskName, index)=> {
      const newsubTask = {
             "name": subTaskName,
             "isDone": false,
      }
      dataState[index].task.push(newsubTask);
      console.log(dataState[index]);
      setData(dataState);
      // setS
    };
  const removeSubTask = (index, indexSubTask)=> {
      dataState[index].task.splice(indexSubTask,1);
      console.log(dataState[index]);
      setData(dataState);
      // setS
    };
  // const data = exampleModel["data"];
  console.log(dataState)
  return (
    <Container>
      <Space>
        <Input style={{ width: 400 }} value={taskName} onChange={(event)=>{setTaskname(event.target.value)}} placeholder="Enter Task Name" />
        <Button type="primary" onClick={createTask}> Create Task</Button>
      </Space>
    <Task data={dataState} onDelete={deleteTask} onDuplicate={duplicate} onAddSubTask={addSubTask} onDeleteSubTask={removeSubTask}/>
    </Container>
  );
}

export default App;
