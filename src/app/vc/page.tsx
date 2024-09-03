'use client';
import { Button, Col, Descriptions, Modal, Row, Space } from 'antd';
import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { JsonView, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

import { Card } from '@/components/Card/Card';
import Page from '../../components/Page/Page';

export default function Wallet() {
  return (
    <Page title="VC">
      <Row gutter={12}>
        <Col lg={8}>
          <Card title="did:ebsi:1234">
            <Space direction="vertical">
              <Descriptions title="User Info" column={1}>
                <Descriptions.Item label="Email">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="First Name">
                  1810000000
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  Hangzhou, Zhejiang
                </Descriptions.Item>
              </Descriptions>
              <Button type="link" icon={<EyeOutlined />}>
                See entire VC
              </Button>
            </Space>
          </Card>
        </Col>
        <Col lg={8}>
          <Card title="did:ebsi:1234">
            <Space direction="vertical">
              <Descriptions title="User Info" column={1}>
                <Descriptions.Item label="Email">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="First Name">
                  1810000000
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  Hangzhou, Zhejiang
                </Descriptions.Item>
              </Descriptions>
              <Button type="link" icon={<EyeOutlined />}>
                See entire VC
              </Button>
            </Space>
          </Card>
        </Col>
        <Col lg={8}>
          <Card title="did:ebsi:1234">
            <Space direction="vertical">
              <Descriptions title="User Info" column={1}>
                <Descriptions.Item label="Email">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="First Name">
                  1810000000
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  Hangzhou, Zhejiang
                </Descriptions.Item>
              </Descriptions>
            </Space>
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => {
                Modal.info({
                  title: 'VC',
                  content: (
                    <JsonView
                      data={{}}
                      shouldExpandNode={() => false}
                      style={darkStyles}
                    />
                  ),
                  onOk() {},
                });
              }}
            >
              See entire VC
            </Button>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}
