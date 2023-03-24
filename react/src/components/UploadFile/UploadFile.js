import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Container, Spinner } from "react-bootstrap";
import { FILETOS3 } from "../../actions/Files/ActionCreators";

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.setFormRef = (element) => {
      this.formRef = element;
    };
    this.state = {
      selectedFile: [],
      spinner: false,
      fileSizeErrorMsg: "",
      rejectedFiles: [],
    };
  }

  handleUploadForm = async (event, form) => {
    event.preventDefault();
    this.setState({
      spinner: !this.state.spinner,
    });
    const fileData = new FormData();
    this.state.selectedFile.forEach((item) => {
      fileData.append("file", item, item.name);
    });
    await this.props.FILETOS3(fileData, form);
    this.setState({
      spinner: !this.state.spinner,
    });
  };

  handleInput = async (event) => {
    if (this.state.rejectedFiles.length !== 0) {
      this.setState({
        fileSizeErrorMsg: "Limit Exceeded, allowed size 5mb",
      });
    }
    let allowedFileSizeVid = 5,
      fileSizeInBytes,
      fileSizeinMb,
      temp1 = [],
      allowedFiles = [],
      rejectedFiles = [];
    temp1 = [...temp1, ...event.target.files];
    temp1.forEach((item) => {
      fileSizeInBytes = item.size;
      fileSizeinMb = fileSizeInBytes / (1024 * 1024);
      if (fileSizeinMb <= allowedFileSizeVid) {
        allowedFiles.push(item);
      } else {
        rejectedFiles.push(item.name);
      }
    });
    await this.setState({
      selectedFile: allowedFiles,
      rejectedFiles: rejectedFiles,
    });
    if (this.state.rejectedFiles.length !== 0) {
      this.setState({
        fileSizeErrorMsg: "Limit Exceeded, allowed size 5mb",
      });
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col sm={4}></Col>
          <Col sm={4}>
            <Form
              ref={this.setFormRef}
              encType="multipart/form-data"
              onSubmit={(event) => this.handleUploadForm(event, this.formRef)}
            >
              <UploadForm
                handleInput={this.handleInput}
                fileSizeErrorMsg={this.state.fileSizeErrorMsg}
              />
            </Form>
            {(() => {
              if (this.state.spinner === true) {
                return (
                  <center>
                    <Spinner animation="border" />
                  </center>
                );
              } else {
                return <center>{this.props.message}</center>;
              }
            })()}
            <p>
              {this.state.fileSizeErrorMsg.length !== 0
                ? this.state.rejectedFiles.map((item) => {
                    return (
                      <p>
                        {item} = {this.state.fileSizeErrorMsg}
                      </p>
                    );
                  })
                : ""}
            </p>
          </Col>
          <Col am={4}></Col>
        </Row>
      </Container>
    )
  }
}

const UploadForm = (props) => {
  return (
    <React.Fragment>
      <Form.Group
        style={{
          border: "3px solid black",
          boxSizing: "border-box",
          padding: "10px",
          marginTop: "50%",
          borderRadius: "20px",
        }}
      >
        <Form.Label>Upload file to S3</Form.Label>
        <hr />
        <Form.Control
          type="file"
          name="file"
          onChange={props.handleInput}
          multiple
        />
        <br />
        <center>
          <Button
            variant="secondary"
            type="submit"
            disabled={props.fileSizeErrorMsg.length !== 0 ? true : false}
          >
            Submit
          </Button>
        </center>
      </Form.Group>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.UploadFile.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FILETOS3: async (event, fileData, form) => {
      await dispatch(FILETOS3(event, fileData, form));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
