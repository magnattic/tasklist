import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { db } from "../firebase";
import { TaskActions } from "../store/api.actions";
import { store, TaskState } from "../store/reducer";
import { Task } from "./task";
import { taskManager } from "./task-store";
import { TodoListSortable } from "./TodoList";
import { Container, Row, Col } from "react-bootstrap";

const { getTodos, addTask, removeTask } = taskManager(db);

getTodos(tasks => store.dispatch(TaskActions.tasksChanged({ tasks })));

const comp: FunctionComponent<{ tasks: Task[] }> = React.memo(props => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2>TodoList ({props.tasks.length})</h2>
          <TodoListSortable
            tasks={props.tasks}
            onTaskAdded={addTask}
            onTaskRemove={removeTask}
            onSortEnd={(sort) => console.log('sort end', sort)}
            distance={1}
          />
        </Col>
      </Row>
    </Container>
  );
});

const mapStateToProps = (state: TaskState) => ({ tasks: state.tasks });

export const Taskpage = connect(mapStateToProps)(comp);
