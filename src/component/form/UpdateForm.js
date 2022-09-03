import { useEffect, useState } from "react";
import axios from "axios";

const UpdateForm = ({ closeUpdateForm, expenses, setExpenses }) => {
  const baseURL = "https://my-project-fake-api.herokuapp.com/expensedata";

  const [data, setData] = useState({
    id: "",
    date: "",
    merchant: "",
    total: "",
    status: "",
    comment: "",
    receipt:""
  });

  useEffect(() => {
    const getData = localStorage.getItem("expense");
    const newData = JSON.parse(getData);
    setData({
      id: newData.id,
      date: newData.date,
      merchant: newData.merchant,
      total: newData.total,
      status: newData.status,
      comment: newData.comment,
      receipt:newData.receipt,
    });
  }, []);

  const UpdateData = (e) => {
    e.preventDefault();
    axios.put(`${baseURL}/${data.id}`, data);
    const unselectedExpenses = expenses.filter((item) => item.id !== data.id);
    setExpenses([data, ...unselectedExpenses]);
    closeUpdateForm();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <div className="formWrapper table-responsive">
      {
        <div className="closeBtn" onClick={() => closeUpdateForm()}>
          X
        </div>
      }
      <form onSubmit={UpdateData}>
         <div className="formContainer">
         <div>
            <div className="inputWrapper">
            <label>Date</label> <br />
            <input
              className="input"
              name="date"
              type={`date`}
              value={data.date}
              onChange={handleChange}
            />
            </div>

            <div className="inputWrapper">
              <label>Merchant</label> <br />
              <input
                name="merchant"
                type={`text`}
                className="input"
                value={data.merchant}
                onChange={handleChange}
                placeholder="merchant"
              />
            </div>

            <div className="inputWrapper">
              <label>Total</label> <br />
              <input
                name="total"
                className="input"
                type={`number`}
                value={data.total}
                placeholder="total"
                onChange={handleChange}
              />
            </div>

            <div className="inputWrapper">
              <label>Status</label> <br />
              <select 
              name="status"
              className="input"
              type={`text`}
              value={data.status}
              placeholder="status"
              onChange={handleChange}
              >
                  <option >New </option>
                  <option>Inprogress</option>
                  <option>Completed</option>
              </select>
            </div>

            <div className="inputWrapper">
              <label>Comment</label> <br />
              <textarea
                name="comment"
                className="input"
                type={`text`}
                value={data.comment}
                onChange={handleChange}
              />
            </div>
         </div>
         <div>
          <div className="inputWrapper">
            <label>Upload Receipt</label> <br />
            <input
              name="merchant"
              type={`file`}
              value=""
              className="input"
            />
          </div>

          <div className="receiptContainer">
            <img src={data.receipt} alt={data.merchant} />
          </div>
        </div>

         </div>

         <button className="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
