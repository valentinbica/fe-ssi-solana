import Page from "../../components/Page/Page";
import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useForm } from "antd/es/form/Form";

export default function Issuer() {
  const [form] = useForm();
  return (
    <Page title="Issuer">
      <Row>
        <Col lg={4}>
          <Form form={form}>
            <Form.Item
              name="schemas"
              label="Schema"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select>
                <Select.Option value="diploma">Diploma</Select.Option>
                <Select.Option value="eDoc">Employment Doc</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="did"
              label="DID"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="From"
              label="From"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="To"
              label="To"
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
        </Col>
      </Row>
    </Page>
  );
}
