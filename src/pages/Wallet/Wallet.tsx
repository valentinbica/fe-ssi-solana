import Page from "../../components/Page/Page";
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import React from "react";
import styles from "./styles.module.css";

export default function Wallet() {
  return (
    <Page title="Wallet">
      <Row>
        <Alert
          showIcon
          message="This is a oversimplified example of SSI used for demo purposes "
        />
      </Row>
      <Typography.Title className="jersey-15-regular">
        You seem not to have Digital Identity yet. Please create one.
      </Typography.Title>
      <Row>
        <Form>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <Row>
        <Col span={8}>
          <Card title="did:ebsi:1234" bordered className={styles.card}>
            <Descriptions title="User Info" column={1}>
              <Descriptions.Item label="Email">Zhou Maomao</Descriptions.Item>
              <Descriptions.Item label="First Name">
                1810000000
              </Descriptions.Item>
              <Descriptions.Item label="Last Name">
                Hangzhou, Zhejiang
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}
