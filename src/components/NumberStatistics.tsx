'use client';
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

interface NumberStatisticsProps { }

const NumberStatistics: React.FC<NumberStatisticsProps> = () => {
  const [integerList, setIntegerList] = useState<string>("");
  const [statistics, setStatistics] = useState<{ number: number; count: number }[]>([]);
  const [uniqueNumbers, setUniqueNumbers] = useState<number[]>([]);

  const handleGenerateStatistics = () => {
    const numbers = integerList.split(",").map((num) => parseInt(num.trim(), 10));

    // Calculate frequency of each number
    const frequencyMap = new Map<number, number>();
    numbers.forEach((num) => {
      frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    });

    // Convert frequency map to array
    const statisticsArray: { number: number; count: number }[] = [];
    frequencyMap.forEach((count, number) => {
      if (count > 1) {
        statisticsArray.push({ number, count });
      }
    });

    // Sort the statistics array by number
    statisticsArray.sort((a, b) => a.number - b.number);

    setStatistics(statisticsArray);
    setUniqueNumbers(Array.from(frequencyMap.keys()).sort((a, b) => a - b));
    toast.info('Done!', {
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

  return (
    <Container className="my-3">
      <h1><span>🔷 </span>Number Frequency</h1>
      <Row className="my-3">
        <Col xs={12}>
          <Form.Group>
            <Form.Label>Enter comma-separated integers:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={integerList}
              onChange={(e) => setIntegerList(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={12} md={3}>
          <Button variant="primary" onClick={handleGenerateStatistics}>
            Generate Statistics
          </Button>
        </Col>
      </Row>
      {statistics.length > 0 && (
        <Row className="my-3">
          <Col xs={12}>
            <p>Number Frequency (if more than 1):</p>
            <ul>
              {statistics.map((item) => (
                <li key={item.number}>
                  Number {item.number}: {item.count} times
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      )}
      {uniqueNumbers.length > 0 && (
        <Row className="my-3">
          <Col xs={12}>
            <p>Unique Numbers:</p>
            <ol style={{ listStyleType: "decimal" }}>
              {uniqueNumbers.map((num) => (
                <li key={num}>{num}</li>
              ))}
            </ol>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default NumberStatistics;
