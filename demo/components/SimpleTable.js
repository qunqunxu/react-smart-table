import React, { PropTypes } from 'react';
import { Table, Column } from 'react-smart-table';
import styles from './SimpleTable.css';

const data = [
  {name: 'A', age: 10, stature: 120, weight: 30},
  {name: 'B', age: 12, stature: 140, weight: 32},
  {name: 'C', age: 11, stature: 124, weight: 31},
  {name: 'D', age: 9, stature: 110, weight: 28},
  {name: 'E', age: 10, stature: 118, weight: 27},
  {name: 'F', age: 12, stature: 124, weight: 29},
];

function SimpleTable() {
  const keys = Object.keys(data[0]);

  return (
    <Table data={data} className={styles.container}>
      {
        keys.map(entry => (
          <Column dataKey={entry} name={entry} key={`col-${entry}`}/>
        ))
      }
    </Table>
  );
}

export default SimpleTable;
