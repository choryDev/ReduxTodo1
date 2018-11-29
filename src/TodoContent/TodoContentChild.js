import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import AlertDialog from "./AlertDialog";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";

import { connect } from "react-redux";
import * as actions from "../actions";

const ITEM_HEIGHT = 48;

class TodoContentChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      index: 0,
      updateSwitch: true,
      EditSwitch: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleIndexReturn = this.handleIndexReturn.bind(this);
    this.changeUpdate = this.changeUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updataDataReturn = this.updataDataReturn.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }
  updataDataReturn() {
    //부모에게 값과 인덱스값을 리턴
    if (this.state.data === "" || this.state.data === null) {
      this.props.handleBlankON(true);
    } else {
      this.props.onUpdate(this.state.data, this.state.index);
      this.changeUpdate();
    }
  }
  handleChange(e) {
    //텍스트 필드 적기 위해
    this.setState({
      data: e.target.value
    });
  }
  handleClick(e) {
    this.setState({ anchorEl: e.currentTarget });
    //event.target 은 span태그 event.currentTarget 은 div 반환
  }

  changeUpdate() {
    //내용 변경 함수
    if (this.state.updateSwitch) {
      this.setState({
        data: this.props.contact.data
      });
      this.props.onUpdateOn();
    }
    this.setState({
      updateSwitch: !this.state.updateSwitch
    });
    this.handleClose();
  }

  handleIndexReturn() {
    //삭제하기 위해 인덱스값 리턴
    this.props.onRemove(this.state.index);
    this.handleClose();
  }

  handleClose() {
    //닫기
    this.setState({ anchorEl: null });
  }

  handleAlertClose() {
    //다이어 로그 닫기
    this.setState({ openDialog: false });
  }

  render() {
    const textView = <Typography>{this.props.contact.data}</Typography>;
    const textField = (
      <TextField
        className="TDTextField"
        name="data"
        rows="4"
        margin="normal"
        variant="outlined"
        placeholder="투명글자"
        value={this.state.data}
        onChange={this.handleChange}
        onKeyPress={this.enterKeyPress}
      />
    );

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Card className="TDChild">
        <CardHeader
          action={
            <IconButton onClick={this.handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title="오늘 할일"
        />
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 100
            }
          }}
        >
          {this.state.updateSwitch ? (
            <MenuItem onClick={this.changeUpdate}>수정</MenuItem>
          ) : (
            <MenuItem onClick={this.updataDataReturn}>수정완료</MenuItem>
          )}
          {this.state.updateSwitch ? (
            <MenuItem onClick={this.handleIndexReturn}>삭제</MenuItem>
          ) : (
            <MenuItem onClick={this.changeUpdate}>나가기</MenuItem>
          )}
        </Menu>
        <CardContent>
          {this.state.updateSwitch ? textView : textField}
        </CardContent>
        <AlertDialog blank={this.props.blank} />
      </Card>
    );
  }
}
TodoContentChild.defaultProps = {
  key: -1,
  contact: {
    data: ""
  },
  onRemove: () => {
    console.error("제거가 안되넹");
  },
  onUpdate: () => {
    console.error("업데이트가 안되넹");
  }
};
TodoContentChild.propTypes = {
  contact: PropTypes.object,
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func,
  onUpdateOn: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    blank: state.checkblank.blank
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleBlankON: bool => {
      dispatch(actions.blankon(bool));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoContentChild);
