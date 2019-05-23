import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

class CustomForm extends React.Component {
  handleFormSubmit = (event, reqType, articleID) => {
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;

    switch (reqType) {
      case "post":
        return axios
          .post("http://127.0.0.1:8000/api/", {
            title: title,
            content: content
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));

      case "put":
        return axios
          .put(`http://127.0.0.1:8000/api/${articleID}/`, {
            title: title,
            content: content
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={event =>
            this.handleFormSubmit(
              event,
              this.props.reqType,
              this.props.articleID
            )
          }
        >
          <Form.Item label="Form Layout" />
          <Form.Item label="Title">
            <Input name="title" placeholder="Enter some title ..." />
          </Form.Item>
          <Form.Item label="Content">
            <Input name="content" placeholder="Enter some content ..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CustomForm;
