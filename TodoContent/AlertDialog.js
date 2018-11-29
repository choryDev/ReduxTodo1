import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { connect } from "react-redux";
import * as actions from "../actions";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const propTypes = {
  blank: PropTypes.bool
};

const defaultProps = {
  blank: false
};

class AlertDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.state.open = this.props.blankChecker;
    this.handleClose = this.handleClose.bind(this);
    console.log(this.props.blank);
  }

  handleClose() {
    this.props.handleBlankOFF(false);
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.blank}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"할일을 적어주세요"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              빈칸 입니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              네 적겠습니다
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
AlertDialog.propTypes = propTypes;
AlertDialog.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    blank: state.checkblank.blank
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleBlankOFF: bool => {
      dispatch(actions.blankoff(bool));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertDialog);
