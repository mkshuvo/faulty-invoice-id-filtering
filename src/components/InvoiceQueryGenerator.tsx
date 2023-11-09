'use client';
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CSVReader from "react-csv-reader";
import { create } from "domain";

interface Props { }

const InvoiceQueryGenerator: React.FC<Props> = () => {
  const [invoiceIds, setInvoiceIds] = useState<number[]>([]);
  const [createdDate, setCreatedDate] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [copyIconInQuery, setCopyIconInQuery] = useState<string>("📋");
  const [copyIconInList, setCopyIconInList] = useState<string>("📋");

  const handleFileUpload = (data: any, fileInfo: any) => {
    const invoicesColumnIndex = data[0].indexOf("Invoice ID");

    if (invoicesColumnIndex !== -1) {
      const invoices = data.slice(1)
        .map((row: any) => row[invoicesColumnIndex])
        .filter((id: any) => id.trim() !== "" && !isNaN(id))  // Filter out empty values and non-numeric values
        .map((id: any) => parseInt(id.trim(), 10)); // Convert to numbers

      setInvoiceIds(invoices);
    } else {
      alert('Column "Invoice ID" not found in the CSV file.');
    }
  };

  
  
  const handleGenerateQuery = () => {
    const createdDateValue = createdDate ? `created > '${createdDate}' AND` : '';
    const query = `SELECT * FROM pay_accounting pa 
                    WHERE project_id = -1 
                      AND type = 'deposit' 
                      AND source_uid = -1 
                      AND workorder_id = -1 
                      AND status = 'completed' 
                      ${createdDateValue}
                      AND ${invoiceIds
      .map((id) => `status_reason LIKE '%Invoice ${id}%'`)
      .join(" OR ")};`;
    setQuery(query);
    setCopyIconInQuery('📋');
  };

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(query);
    setCopyIconInQuery('✅');
    setInterval(() => {
      setCopyIconInQuery('📋');
    }, 3000);
  };

  const handleCopyInvoiceList = () => {
    navigator.clipboard.writeText(invoiceIds.join(", "));
    setCopyIconInList('✅');
    setInterval(() => {
      setCopyIconInList('📋');
    }, 3000);
  };

  return (
    <Container className="my-3">
      <h1><span>🔷 </span>Invoice Query Generator</h1>
      <Row className="my-3">
        <Col xs={12} md={4}>
          <CSVReader
            onFileLoaded={handleFileUpload}
            inputId="csv-upload"
            inputStyle={{ display: "none" }}
          />
          <label htmlFor="csv-upload" className="btn btn-primary">
            Upload CSV
          </label>
        </Col>
      </Row>
      {invoiceIds.length > 0 && (
        <Row>
          <Col xs={12}>
            <Button variant="" onClick={handleCopyInvoiceList}>
              <span className="copyIcon" style={{ fontSize: '3rem' }}>{copyIconInList}</span>
            </Button>
            <br />
            <ol style={{ columns: "4", listStyleType: "decimal" }}>
              {invoiceIds.map((id, index) => (
                <li key={index}>{id}</li>
              ))}
            </ol>
          </Col>
        </Row>
      )}

      <Row className="my-3">
        <Col xs={12} md={3}>
          <Button variant="primary" onClick={handleGenerateQuery}>
            Generate Query
          </Button>
        </Col>
        <Col xs={12} md={9}>
          <DatePicker
            className="form-control"
            selected={createdDate ? new Date(createdDate) : null}
            onChange={(date: Date) => {
              setCreatedDate(date ? date.toISOString().substring(0, 10) : "");
            }}
            placeholderText="Enter a date"
          />
        </Col>
      </Row>
      {query && (
        <Row>
          <div className="bg-light p-3 my-3">
            <div className="bg-light p-3 my-3">
              <h4>
                <Button variant="" onClick={handleCopyQuery}>
                  <span className="copyIcon" style={{ fontSize: '3rem' }}>{copyIconInQuery}</span>
                </Button>{" "}
                Generated Query:
              </h4>
              <code>{query}</code>
            </div>
          </div>
        </Row>
      )}
    </Container>
  );
};

export default InvoiceQueryGenerator;
