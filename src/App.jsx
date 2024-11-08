import React, { useState } from 'react';
import Swal from 'sweetalert2';

const App = () => {
  let [accountBalance, setAccountBalance] = useState(10000);
  let [withdrawAmount, setWithdrawAmount] = useState('');
  const [history, setHistory] = useState([]);

  const withdraw = (amount) => {
    if (!isNaN(amount) && amount > 0 && amount <= accountBalance - 1) {
      const newHistory = [...history, { amount, amountAfter: accountBalance - amount }];
      setAccountBalance(prevBalance => prevBalance - amount);
      setHistory(newHistory);
      setWithdrawAmount('');
      Swal.fire({
        icon: 'success',
        title: 'ถอนเงินเสร็จสิ้น',
        text: 'ทำการถอนเงินเสร็จส้น',
        confirmButtonText: 'ตกลง',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ถอนเงินล้มเหลว',
        text: 'จำนวนเงินของท่านไม่เพียงพอ หรือระบบไม่ให้ถอนหมดบัญชี',
        confirmButtonText: 'ตกลง',
      });
    }
  };

  const clickwithdraw = (amount) => {
    setWithdrawAmount((prevAmount) => (prevAmount ? (parseInt(prevAmount) + amount).toString() : amount.toString()));
  };

  return (
    <div className='bg-gray-200 min-h-screen flex items-center'>
      <div className='container mx-auto px-4'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-6 shadow-lg rounded-xl">
            <h1 className='text-xl font-bold'>ระบบถอนเงิน</h1>
            <p className='text-lg py-3'>ยอดคงเหลือ {accountBalance} บาท</p>
            <div className='grid grid-cols-2 gap-3 text-white'>
              <button onClick={() => clickwithdraw(100)} className='bg-pink-400 p-3 rounded-md'>ถอน 100 บาท</button>
              <button onClick={() => clickwithdraw(500)} className='bg-pink-500 p-3 rounded-md'>ถอน 500 บาท</button>
              <button onClick={() => clickwithdraw(1000)} className='bg-pink-600 p-3 rounded-md'>ถอน 1000 บาท</button>
              <button onClick={() => clickwithdraw(5000)} className='bg-pink-700 p-3 rounded-md'>ถอน 5000 บาท</button>
            </div>
            <p className='mt-5 font-bold'>จำนวนเงินที่ต้องการถอน: </p>
            <div className='grid'>
              <input
                type="number"
                id="amount"
                value={withdrawAmount}
                className='border p-2'
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <button
                onClick={() => withdraw(parseInt(withdrawAmount))}
                className='bg-green-500 mt-2 p-3 rounded-md text-white'
              >
                ถอนเงิน
              </button>
            </div>
          </div>


          <div className="bg-white p-5 shadow-lg rounded-xl">
            <p className='font-bold text-base'>ประวัติการถอนเงิน</p>
            <ul>
              {history.length === 0 ? (
                <li>ยังไม่มีประวัติการถอน</li>
              ) : (
                history.map((entry, index) => (
                  <li key={index} className='flex justify-between'>
                    <span>ถอน: {entry.amount} บาท</span>
                    <span>ยอดเงินคงเหลือ: {entry.amountAfter} บาท</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
