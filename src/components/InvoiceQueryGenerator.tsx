'use client';
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface Props { }

const InvoiceQueryGenerator: React.FC<Props> = () => {
  const [invoiceIds, setInvoiceIds] = useState<string>("");
  const [createdDate, setCreatedDate] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [copyIcon, setCopyIcon] = useState<string>("📋");
  const handleGenerateQuery = () => {
    const invoiceArray = invoiceIds.split(",").map((id) => id.trim());
    const query = `SELECT * FROM pay_accounting pa WHERE project_id = -1 AND type = 'deposit' AND source_id = -1 AND workorder_id = -1 AND status = 'completed' AND created > '${createdDate}' AND ${invoiceArray
      .map((id) => `status_reason LIKE '%Invoice ${id}%'`)
      .join(" OR ")};`;
    setQuery(query);
    setCopyIcon('📋');
  };

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(query);
    setCopyIcon('✅');
  };

  return (
    <Container className="my-3">
      <h1>Invoice Query Generator</h1>
      <Row className="my-3">
        <Col xs={12} md={8}>
          <Form.Control
            placeholder="Enter comma-separated invoice IDs (e.g. 222452, 223468, 224499)"
            value={invoiceIds}
            onChange={(e) => setInvoiceIds(e.target.value)}
          />
        </Col>
        <Col xs={12} md={4}>
          <DatePicker className="form-control"
            selected={createdDate ? new Date(createdDate) : null}
            onChange={(date: Date) => {
              setCreatedDate(date ? date.toISOString().substring(0, 10) : "");
            }}
          />
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={12} md={3}>
          <Button variant="primary" onClick={handleGenerateQuery}>
            Generate Query
          </Button>
        </Col>
      </Row>
      {query && (
        <Row>
          <div className="bg-light p-3 my-3">
            <div className="bg-light p-3 my-3">
              <h4><Button variant="" onClick={handleCopyQuery}>
                <span className="copyIcon">{copyIcon}</span></Button> Generated Query:</h4>
              <code>{query}</code>
            </div>
          </div>
        </Row>
      )}
    </Container>
  );
};

export default InvoiceQueryGenerator;


