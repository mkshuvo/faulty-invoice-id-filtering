'use client';

import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addInvoice } from "../redux/invoiceSlice";

interface InvoiceExtractorProps { }

const InvoiceExtractor: React.FC<InvoiceExtractorProps> = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.invoices.invoices);

  const [multilineString, setMultilineString] = useState<string>("");
  const [extractedInvoices, setExtractedInvoices] = useState<{
    id: number;
    count: number;
    amounts: number[];
    depositedAmounts: number[];
  }[]>([]);
  const [duplicates, setDuplicates] = useState<number[]>([]);
  const [copyIcon, setCopyIcon] = useState<string>("📋");
  const duplicateNumbers: number[] = [];

  const handleExtractInvoices = () => {
    const invoiceMatches = multilineString.match(/Invoice (\d+) payment amount: \$(\d+(\.\d+)?)/g);
    if (invoiceMatches) {
      const extractedInvoicesMap = new Map<number, { id: number; count: number; amounts: number[]; depositedAmounts: number[] }>();

      invoiceMatches.forEach((match) => {
        const [, idStr, amountStr] = match.match(/Invoice (\d+) payment amount: \$(\d+(\.\d+)?)/) || [];
        const id = parseInt(idStr, 10);
        const amount = parseFloat(amountStr);

        const depositedAmount = invoices[id] || 0;

        if (extractedInvoicesMap.has(id)) {
          const existingInvoice = extractedInvoicesMap.get(id)!;
          existingInvoice.count += 1;
          existingInvoice.amounts.push(amount);
          existingInvoice.depositedAmounts.push(depositedAmount);
          duplicateNumbers.push(id);
        } else {
          extractedInvoicesMap.set(id, { id, count: 1, amounts: [amount], depositedAmounts: [depositedAmount] });
        }
        setDuplicates(duplicateNumbers);
        // Dispatch to Redux store
        dispatch(addInvoice({ id, amount }));
      });

      setExtractedInvoices(Array.from(extractedInvoicesMap.values()));
      setCopyIcon('📋');
    } else {
      setExtractedInvoices([]);
    }
  };

  const handleCopyIds = () => {
    const uniqueIds = Array.from(new Set(extractedInvoices.map(({ id }) => id)));
    const allIds = uniqueIds.join(", ");
    navigator.clipboard.writeText(allIds);
    setCopyIcon('✅');
    setTimeout(() => {
      setCopyIcon('📋');
    }, 3000);
  };

  const roundToTwoDecimalPlaces = (value: number) => {
    return Math.round(value * 100) / 100;
  };

  const duplicateInvoices = extractedInvoices.filter(({ count }) => count > 1);


  return (
    <Container className="my-3">
      <h1>
        <span>🔷 </span>Invoice ID Extractor
      </h1>
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
      {extractedInvoices.length > 0 && (
        <Row className="my-3">
          <Col xs={12}>
            <Button variant="" onClick={handleCopyIds}>
              <span className="copyIcon" style={{ fontSize: '3rem' }}>{copyIcon}</span>
            </Button>
            <p>Duplicates:</p>
            <ul>
              {duplicateInvoices.map(({ id,count }) => (
                <li key={id}>Invoice ID: {id} -{">"} Count: {count}</li>
              ))}
            </ul>
            <p>Extracted Invoice IDs:</p>
            <table className="table">
              <ol>
                {extractedInvoices.map(({ id, count, amounts, depositedAmounts }) => (
                  <li key={id}>
                    <strong>Invoice ID: {id}</strong> (Count: {count})
                    <ul>
                      {amounts.map((amount, index) => (
                        <li key={index}>
                          <tr>
                            <th scope="col" style={{ border: '1px solid black' }}>Amount in CSV  -  </th>
                            <th scope="col" style={{ border: '1px solid black' }}>Deposited Amount = </th>
                            <th scope="col" style={{ border: '1px solid black' }}>Difference</th>
                          </tr>
                          <tr>
                            <td scope="row"><span style={{ color: 'green', fontWeight: 'bold' }}>${amount}</span></td>
                            <td><span style={{ color: 'red', fontWeight: 'bold' }}>${depositedAmounts[index]}</span></td>
                            <td>
                              <span style={{ color: amount - depositedAmounts[index] === 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                                ${roundToTwoDecimalPlaces(amount - depositedAmounts[index])}
                              </span>
                            </td>
                          </tr>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default InvoiceExtractor;
