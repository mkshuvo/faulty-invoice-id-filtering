'use client'
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

interface ListComparatorProps { }

const ListComparator: React.FC<ListComparatorProps> = () => {
  const [list1, setList1] = useState<string>("");
  const [list2, setList2] = useState<string>("");
  const [matched, setMatched] = useState<number[]>([]);
  const [unmatched, setUnmatched] = useState<number[]>([]);

  const handleCompareLists = () => {
    const array1 = list1.split(",").map((num) => parseInt(num.trim(), 10));
    const array2 = list2.split(",").map((num) => parseInt(num.trim(), 10));

    const matchedNumbers: number[] = [];
    const unmatchedNumbers: number[] = [];

    array1.forEach((num1) => {
      if (array2.includes(num1)) {
        matchedNumbers.push(num1);
      } else {
        unmatchedNumbers.push(num1);
      }
    });

    array2.forEach((num2) => {
      if (!array1.includes(num2)) {
        unmatchedNumbers.push(num2);
      }
    });

    setMatched(matchedNumbers);
    setUnmatched(unmatchedNumbers);
  };

  return (
    <Container className="my-3">
      <h1><span>🔷 </span>List Comparator</h1>
      <Row className="my-3">
        <p>Original invoice list</p>
        <Col xs={12}>
          <Form.Control
            as="textarea"
            placeholder="Enter comma-separated integers (List 1)"
            value={list1}
            onChange={(e) => setList1(e.target.value)}
          />
        </Col>
        <Col xs={12}>
          <br />
          <p>Invoice available in pay accounting</p>
          <Form.Control
            as="textarea"
            placeholder="Enter comma-separated integers (List 2)"
            value={list2}
            onChange={(e) => setList2(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={12} md={3}>
          <Button variant="primary" onClick={handleCompareLists}>
            Compare Lists
          </Button>
        </Col>
      </Row>
      {matched.length > 0 && (
        <Row className="my-3">
          <Col xs={12}>
            <p>Matched Numbers: {matched.join(", ")}</p>
          </Col>
        </Row>
      )}
      {unmatched.length > 0 && (
        <Row className="my-3">
          <Col xs={12}>
            <p>Unmatched Numbers: {unmatched.join(", ")}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ListComparator;
