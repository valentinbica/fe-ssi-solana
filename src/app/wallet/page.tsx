'use client';
import Page from '../../components/Page/Page';
import { Alert, Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Highlight, themes } from 'prism-react-renderer';

import { Card } from '@/components/Card/Card';
import { useDid } from './useDid';
import { useWallet } from '@solana/wallet-adapter-react';
import 'react-json-view-lite/dist/index.css';

export default function Wallet() {
  const { createDid, getDidDocument } = useDid();
  const { connected } = useWallet();

  const [did, setDid] = useState(null);
  const [didDocument, setDidDocument] = useState({});

  useEffect(() => {
    if (connected) {
      getDidDocument().then((didDoc) => {
        try {
          setDid(didDoc.did);
          setDidDocument(JSON.parse(didDoc.didDocument));
        } catch (ex) {}
      });
    }
  }, [connected, getDidDocument]);

  return (
    <Page title="Wallet">
      <Row>
        <Alert
          showIcon
          message="This is a oversimplified example of SSI used for demo purposes "
        />
      </Row>
      {!did ? (
        <>
          <Row>
            <Typography.Title className="jersey-15-regular">
              You seem not to have Digital Identity yet. Please create one.
            </Typography.Title>
          </Row>
          <Row>
            <Form onFinish={createDid} disabled={!connected}>
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
        </>
      ) : (
        <Space>
          <Row>
            <Card title={did}>
              <Row align="middle" gutter={[0, 20]}>
                <Col lg={12}>
                  <Image
                    src={`https://api.dicebear.com/9.x/pixel-art/png?seed=${did}`}
                    width="40"
                    height="40"
                    alt="avatar"
                  />
                </Col>
                <Col lg={12}>
                  <Typography.Title level={3}>Did document</Typography.Title>
                </Col>
              </Row>
              <Row>
                <Highlight
                  theme={themes.shadesOfPurple}
                  code={JSON.stringify(didDocument, null, 4)}
                  language="javascript"
                >
                  {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre style={style}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </Row>
            </Card>
          </Row>
        </Space>
      )}
    </Page>
  );
}
