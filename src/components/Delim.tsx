'use client'
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
const Delim: React.FC = () => {
  const [numbersString, setNumbersString] = useState('');
  const [commaSeparatedNumbers, setCommaSeparatedNumbers] = useState('');
  const [numbersArray, setNumbersArray] = useState<number[]>([]);
  const [copyIconInCommaSeparatedList, setCopyIconInCommaSeparatedList] = useState<string>('📋');
  const [showList, setShowList] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNumbersString(event.target.value);
  };

  const handleConvert = () => {
    const numbers = numbersString
      .split('\n')
      .map((number) => parseInt(number.trim(), 10))
      .filter((number) => !isNaN(number));

    setNumbersArray(numbers);
    setCommaSeparatedNumbers(numbers.join(', '));
    setShowList(true);
  };

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(commaSeparatedNumbers);
    setCopyIconInCommaSeparatedList('✅');
    toast.success('Numbers Copied!', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    setTimeout(() => {
      setCopyIconInCommaSeparatedList('📋');
    }, 3000);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h1 className="text-left mb-4">🔷 Comma Separator</h1>
          <textarea
            className="form-control"
            placeholder="Enter numbers (new line separated)"
            value={numbersString}
            onChange={handleInputChange}
            rows={5}
          />
          <div className="mt-3">
            <Button className="btn btn-primary" variant="" onClick={handleConvert}>
              Convert
            </Button>
          </div>
          {showList && (
            <>
              <div className="mt-3">
                <Button variant="" onClick={handleCopyQuery}>
                  <span className="copyIcon" style={{ fontSize: '3rem' }}>
                    {copyIconInCommaSeparatedList}
                  </span>
                </Button>{' '}
                <strong>Converted Numbers (Comma-Separated):</strong>
                <br />
                <code>{commaSeparatedNumbers}</code>
              </div>
              <div className="mt-3">
                <strong>List:</strong>
                <ol style={{ columns: 4, listStyleType: 'decimal' }}>
                  {numbersArray.map((number, index) => (
                    <li key={index}>{number}</li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Delim;
