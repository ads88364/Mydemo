import React, { useState } from 'react';
import './productSort.scss';
function ProductSort({ onSort }) {
  const [sortDirection, setsortDirection] = useState('close')
  const [ok, setok] = useState(true)

  return (
    <>
      <div className="rental-title">
        <span>排序</span>
        <ul className="sort-group">
          <li className="sort-item">
            <button
              onClick={() => {
                onSort('rent')
                if (ok) {
                  setsortDirection('up')
                  setok(false)
                } else {
                  setsortDirection('down')
                  setok(true)
                }
              }}>租金 {sortDirection === 'up' && '▲'}{sortDirection === 'down' && '▼'}</button>
          </li>
          <li className="sort-item">
            <button
              onClick={() => {
                onSort('rating')
                setsortDirection('close')
                setok(true)
              }}>評分</button>
          </li>
          <li className="sort-item">
            <button
              onClick={() => {
                onSort('latest')
                setsortDirection('close')
                setok(true)
              }}>最新上架</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProductSort;
