'use client';
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

interface InvoiceExtractorProps {}

const InvoiceExtractor: React.FC<InvoiceExtractorProps> = () => {
  const [multilineString, setMultilineString] = useState<string>("");
  const [extractedIds, setExtractedIds] = useState<number[]>([]);
  const [copyIcon, setCopyIcon] = useState<string>("📋");

  const handleExtractInvoices = () => {
    const invoiceMatches = multilineString.match(/Invoice (\d+)/g);
    if (invoiceMatches) {
      const invoiceIds = invoiceMatches.map((match) =>
        parseInt(match.replace("Invoice ", ""), 10)
      );
      setExtractedIds(invoiceIds);
      setCopyIcon('📋');
    } else {
      setExtractedIds([]);
    }
  };

  const handleCopyIds = () => {
    navigator.clipboard.writeText(extractedIds.join(", "));
    setCopyIcon('✅');
  };

  return (
    <Container className="my-3">
      <h1><span>🔷 </span>Invoice ID Extractor</h1>
      <Row className="my-3">
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Paste Multiline String:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter multiline string here..."
              value={multilineString}
              onChange={(e) => setMultilineString(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={12} md={3}>
          <Button variant="primary" onClick={handleExtractInvoices}>
            Extract Invoice IDs
          </Button>
        </Col>
      </Row>
      {extractedIds.length > 0 && (
        <Row className="my-3">
          <Col xs={12}>
            <Button variant="" onClick={handleCopyIds}>
              <span className="copyIcon">{copyIcon}</span>
            </Button>
            <p>Extracted Invoice IDs:</p>
            <ol style={{ columns: "4", listStyleType: "decimal" }}>
              {extractedIds.map((id) => (
                <li key={id}>{id}</li>
              ))}
            </ol>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default InvoiceExtractor;
