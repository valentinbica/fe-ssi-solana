import Page from "../../components/Page/Page";
import { Alert, Row } from "antd";

export default function Issuer() {
  return (
    <Page title="Issuer">
      <Row>
        <Alert
          showIcon
          message="This is a oversimplified example of SSI used for demo purposes "
        />
      </Row>
    </Page>
  );
}
