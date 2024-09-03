'use client';
import Page from '../../components/Page/Page';
import { Button, Col, Form, Input, Row, Select, Spin, Typography } from 'antd';
import { useIssuer } from '@/app/issuer/useIssuer';
import { useEffect, useState } from 'react';
import { useVc } from '@/app/vc/useVc';

export default function Issuer() {
  const [form] = Form.useForm();
  const { registerIssuer, doesIssuerExist } = useIssuer();
  const [issuerExist, setIssuerExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getVc } = useVc();

  useEffect(() => {
    setLoading(true);
    doesIssuerExist()
      .then((does) => {
        setIssuerExist(does);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [doesIssuerExist]);

  return (
    <Page title="Index">
      <Spin spinning={loading}>
        {issuerExist ? (
          <div>
            <Typography.Title className="jersey-15-regular">
              You are a registered issuer
            </Typography.Title>
            <Typography.Title level={4} className="jersey-15-regular">
              Issue a new VC
            </Typography.Title>
            <Row>
              <Col lg={4}>
                <Form
                  form={form}
                  onFinish={() => {
                    console.log(form.getFieldValue('schemas'));
                    console.log(form.getFieldValue('did'));
                    console.log(form.getFieldValue('from'));
                    console.log(form.getFieldValue('to'));

                    getVc('did:sol:1234', 'did:sol:1234', 'diploma');
                  }}
                >
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
                    <Button
                      type="primary"
                      onClick={() => getVc('a', 'b', 'diploma')}
                    >
                      Create
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <Typography.Title className="jersey-15-regular">
              You seem you are not a registered issuer
            </Typography.Title>
            <Button type="primary" size="large" onClick={registerIssuer}>
              Register me as an issuer
            </Button>
          </div>
        )}
      </Spin>
    </Page>
  );
}
