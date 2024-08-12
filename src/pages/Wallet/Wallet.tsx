import Page from "../../components/Page/Page";
import { Alert, Row } from "antd";

export default function Wallet() {
  return (
    <Page title="Wallet">
      <Row>
        <Alert
          showIcon
          message="This is a oversimplified example of SSI used for demo purposes "
        />
      </Row>
    </Page>
  );
}
