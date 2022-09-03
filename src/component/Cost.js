import React, { useState, useEffect } from "react";

const Cost = ({ expenses }) => {
  const [totalPrice, setTotalPrice] = useState();
  const [completed, setCompleted] = useState();
  const [newExp, setNewExp] = useState();
  const [inProg, setInprog] = useState()

  useEffect(() => {
    const sum = expenses?.reduce((accumulator, expense) => {
      return accumulator + Number(expense.total);
    }, 0);

    const completedSum = expenses?.filter((expense) => expense.status === "Completed").reduce((accumulator, expense) =>{
      return accumulator + Number(expense.total)
    },0)

    const newExpense =  expenses?.filter((expense) => expense.status === "New").reduce((accumulator, expense) =>{
      return accumulator + Number(expense.total)
    },0)
    const inprog =  expenses?.filter((expense) => expense.status === "Inprogress").reduce((accumulator, expense) =>{
      return accumulator + Number(expense.total)
    },0)
    setNewExp(newExpense)
    setCompleted(completedSum)
    setInprog(inprog)
    setTotalPrice(sum);
  }, [expenses]);

  return (
    <section className="mt-5">
      <div>
        <span className="me-3 fs-4">Completed Amount:</span>
        <span className="fs-4">${completed}</span>
      </div>

      <div>
        <span className="me-3 fs-4">Inprogress Amount:</span>
        <span className="fs-4">${inProg}</span>
      </div>

      <div>
        <span className="me-3 fs-4">New Amount:</span>
        <span className="fs-4">${newExp}</span>
      </div>

      <div>
        <span className="me-3 fs-4">Total Amount:</span>
        <span className="fs-4">${totalPrice}</span>
      </div>
     
    </section>
  );
};

export default Cost;
