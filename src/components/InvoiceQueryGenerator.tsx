'use client';
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CSVReader from "react-csv-reader";
import { useDispatch } from "react-redux";
import { addInvoice } from "../redux/invoiceSlice";
import { toast } from "react-toastify";


interface Props { }

const InvoiceQueryGenerator: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [invoiceData, setInvoiceData] = useState<{ id: number; amount: number }[]>([]);
  const [createdDate, setCreatedDate] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [copyIconInQuery, setCopyIconInQuery] = useState<string>("📋");
  const [copyIconInList, setCopyIconInList] = useState<string>("📋");

  const handleFileUpload = (data: any, fileInfo: any) => {
    const invoicesColumnIndex = data[0].indexOf("Invoice ID");
    const amountColumnIndex = data[0].indexOf("Amount");

    if (invoicesColumnIndex !== -1 && amountColumnIndex !== -1) {
      const invoicesWithAmounts = data.slice(1).map((row: any) => ({
        id: parseInt(row[invoicesColumnIndex], 10),
        amount: parseFloat(row[amountColumnIndex]),
      })).filter((row: any) => !isNaN(row.id));;

      setInvoiceData(invoicesWithAmounts);
      toast.success('Upload success', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error('Columns "Invoice ID" and "Amount" not found in the CSV file.', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
                      AND ${invoiceData
        .map((data) => `status_reason LIKE '%Invoice ${data.id}%'`)
        .join(" OR ")};`;
    setQuery(query);
    setCopyIconInQuery('📋');
    toast.success('Query Generated!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(query);
    setCopyIconInQuery('✅');
    toast.success('Query Copied!', {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setInterval(() => {
      setCopyIconInQuery('📋');
    }, 3000);
  };

  const handleCopyInvoiceList = () => {
    navigator.clipboard.writeText(invoiceData.map((data) => data.id).join(", "));
    setCopyIconInList('✅');
    toast.success('Invoice List Copied!', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setInterval(() => {
      setCopyIconInList('📋');
    }, 3000);
  };

  // Dispatch invoices with amounts to the Redux store
  React.useEffect(() => {
    invoiceData.forEach((data) => {
      dispatch(addInvoice(data));
    });
  }, [dispatch, invoiceData]);

  return (
    <Container className="my-3">
      <h1>
        <span>🔷 </span>Invoice Query Generator
      </h1>
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
      {invoiceData.length > 0 && (
        <Row>
          <Col xs={12}>
            <Button variant="" onClick={handleCopyInvoiceList}>
              <span className="copyIcon" style={{ fontSize: '3rem' }}>
                {copyIconInList}
              </span>
            </Button>
            <br />
            <ol style={{ columns: "4", listStyleType: "decimal" }}>
              {invoiceData.map((data, index) => (
                <li key={index}>{data.id} <span style={{fontWeight:'bold'}}>-{">"}</span> <span style={{color:'green'}}>${data.amount}</span></li>
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
                  <span className="copyIcon" style={{ fontSize: '3rem' }}>
                    {copyIconInQuery}
                  </span>
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
