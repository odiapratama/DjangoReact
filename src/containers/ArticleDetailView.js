import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card, Form } from "antd";
import CustomForm from "../components/Form";

class ArticleDetail extends React.Component {
  state = {
    article: {}
  };

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: newProps.token
      };
      axios.get("http://127.0.0.1:8000/api/").then(res => {
        this.setState({
          articles: res.data
        });
        console.log(res.data);
      });
    }
  }

  handleDelete = event => {
    if (this.props.token != null) {
      const articleID = this.props.match.params.articleID;
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: this.props.token
      };
      axios.delete(`http://127.0.0.1:8000/api/${articleID}/`);
      this.props.history.push("/");
      this.forceUpdate();
    } else {
      //SHOW MESSAGE HERE
    }
  };

  render() {
    return (
      <div>
        <Card title={this.state.article.title}>
          <p>{this.state.article.content}</p>
        </Card>
        <CustomForm
          reqType="put"
          articleID={this.props.match.params.articleID}
          btnText="Update"
        />
        <Form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">
            Delete
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(ArticleDetail);
