import React, { useState, useEffect } from "react";

const Cost = ({ expenses }) => {
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    const sum = expenses?.reduce((accumulator, expense) => {
      return accumulator + Number(expense.total);
    }, 0);
    console.log(sum);
    setTotalPrice(sum);
  }, [expenses]);

  return (
    <section className="mt-5">
      <div>
        <span className="me-3 fs-3">Total Amount:</span>
        <span className="fs-4">${totalPrice}</span>
      </div>
    </section>
  );
};

export default Cost;
