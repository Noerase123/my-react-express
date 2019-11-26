import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Axios from 'axios';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('1/2/19', 3500),
  createData('2/2/19', 300),
  createData('3/2/19', 20000),
  createData('4/2/19', 800),
  createData('5/2/19', 10500),
  createData('6/2/19', 2000),
  createData('7/2/19', 3500),
  createData('8/2/19', 300),
  createData('9/2/19', 300),
  createData('10/2/19', 800),
  createData('11/2/19', 10500),
  createData('12/2/19', 2000)
];

export default function Chart() {
  
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}