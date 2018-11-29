import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import AlertDialog from "./AlertDialog";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

//import { connect, bindActionCreators } from "react-redux";
import { connect } from "react-redux";
import * as actions from "../actions";

class TodoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      check: false,
      todoData: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.todoSaveBtn = this.todoSaveBtn.bind(this);
    this.enterKeyPress = this.enterKeyPress.bind(this);
    this.todoOutBtn = this.todoOutBtn.bind(this);
  }

  handleChange(e) {
    //텍스트필드 내용 변경
    this.setState({
      data: e.target.value
    });
  }

  todoSaveBtn() {
    //버튼 저장하기
    const todoData = {
      data: this.state.data
    };
    if (this.state.data === "" || this.state.data === null) {
      this.setState({
        check: true
      });
      this.props.handleBlankON(this.state.check);
    } else {
      this.props.handleTodoAdd(this.state.data);
      this.setState({
        data: ""
      });
      this.todoOutBtn();
    }
  }

  todoOutBtn() {
    //에디트 창 닫기
    const outCheck = {
      check: this.state.check
    };

    this.props.todoOut(outCheck);
    console.log(this.state.check);
    this.setState({
      check: false
    });
  }

  enterKeyPress(e) {
    //엔터 저장
    if (e.charCode === 13) {
      this.todoSaveBtn();
    }
  }

  render() {
    return (
      <Card className="TDChild">
        <CardHeader title="오늘 할일" />
        <TextField
          className="TDTextField"
          name="data"
          rows="2"
          variant="outlined"
          placeholder={this.state.alert}
          value={this.state.data}
          onChange={this.handleChange}
          onKeyPress={this.enterKeyPress}
        />
        <div id="editButtonArea">
          <p>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={this.todoSaveBtn}
            >
              생성
            </Button>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={this.todoOutBtn}
            >
              취소
            </Button>
            <AlertDialog blank={this.props.blank} />
          </p>
        </div>
      </Card>
    );
  }
}
TodoEdit.propTypes = {
  todoSave: PropTypes.func,
  todoOut: PropTypes.func
};
TodoEdit.defaultProps = {
  todoSave: () => {
    console.error("저장안됨");
  },
  todoOut: () => {
    console.error("안나가짐");
  }
};

const mapStateToProps = state => {
  return {
    blank: state.checkblank.blank,
    todoData: state.todomanage.todoData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleBlankON: bool => {
      dispatch(actions.blankon(bool));
    },
    handleTodoAdd: data => {
      dispatch(actions.todoadd(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoEdit);
