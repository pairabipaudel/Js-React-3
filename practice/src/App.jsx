import React,{useState,useRef} from 'react'
import './App.css'
const App = () => {
  const [transaction_status, setTransaction_status]=useState('All')
  const [collection,set_collection]=useState([]);
  const [total_money,setTotal_money]=useState(1500);
  const [money_exchange,setMoney_exchange]=useState('');
  const amount_input_get=useRef(null);
  const amount_input_send=useRef(null);
  const text_input_get=useRef(null);
  const text_input_send=useRef(null);


  function sendingMoney()
{
  let remark=text_input_send.current.value;
  let send=amount_input_send.current.value;
  const confirm_send =confirm(`You are sending $${send} from your account.`)

  if(confirm_send){

    if(total_money - Number(send)<0){
      alert("Insufficient Balance");
      
    
    }else{
      alert(`You have sent $${send} succefully.`)
    setTotal_money(prev=> prev- Number(send));
    
    set_collection(prev=>[...prev,{
    type:"send",
    amount: Number(send),
    remark: remark
    }])

    }

    
     amount_input_send.current.value=``
     text_input_send.current.value=``
  }else{
    alert("Your payment has succefully declined");
     amount_input_send.current.value=``
     text_input_send.current.value=``
    
  }
  
 
}

function gettingMoney()
{
  let get=amount_input_get.current.value;
  let remark=text_input_get.current.value;
  setTotal_money(prev=> prev+Number(get))
  set_collection(prev=>[...prev,{type:"get",amount:Number(get),remark:remark}])
  amount_input_get.current.value=``;
  text_input_get.current.value=``
  alert(`You have received $${get} succefully.`)
}
 
  return (
    <div className='full_container'>
      <div className='container'>
      <div className="personal_profile_container">

        <div className="profile_container">

           <div>
            <button className='profile_pic'></button>
           </div>

           <div>
            <p>Good Morning!</p>
            <p>Pairabi Paudel</p>
           </div>

        </div>

        <div className="amount_container">
          <p>Account No: 1234567890</p>
          <p>
            Total Balance:
          </p>
          <p className='balance'>
            ${total_money.toFixed(2)}
          </p>
        </div>

      </div>



     <div className='money_exchange_container'>

         <div className='money_exchange_buttons'>
          <button style={{border: money_exchange==='send'?'3px solid rgb(74, 126, 247)': ''}} onClick={()=>setMoney_exchange('send')}>Send</button>
          <button style={{border: money_exchange==='get'?'3px solid rgb(74, 126, 247)': ''}} onClick={()=>setMoney_exchange('get')}>Get</button>
         </div>

{ money_exchange=='send' &&
      <div className='money_send'>
        <p>If you want to send money:</p>
           <input placeholder='Amount' ref={amount_input_send} type="number" />
            <input placeholder='Remark' type="text" ref={text_input_send} />
            <button onClick={sendingMoney}>Send</button> 
      </div>
}
{ money_exchange=='get' &&
      <div className="money_get">
        <p>If you want to get money:</p>
          <input placeholder='Amount' ref={amount_input_get} type="number" />
          <input placeholder='Remark' type="text" ref={text_input_get} />
          <button onClick={gettingMoney}>Get</button>
      </div>
}

      <div className="transaction_container">
        <nav>
          <button style={{backgroundColor: transaction_status==='All' ? 'rgb(49, 108, 246)': ''}} onClick={()=> setTransaction_status('All')}>All</button>
          <button style={{backgroundColor: transaction_status==='get' ? 'rgb(49, 108, 246)': ''}} onClick={()=> setTransaction_status('get')}>Income</button>
          <button style={{backgroundColor: transaction_status==='send' ? 'rgb(49, 108, 246)': ''}} onClick={()=> setTransaction_status('send')}>Expense</button>
        </nav>


        <div className="transaction_list">
          {
          collection.filter((item)=>{
            if(transaction_status=='All'){
              return true;
            }else{
              return transaction_status===item.type;
            }
          }).map((items,index)=>{
                return (
              <div className='each_transaction' key={index}>

                <div className='text_container' >
                   <p className='display_type'>{items.type}</p>
                   <p  className='display_remark'>{items.remark}</p>
                </div>
                
                <div style={{color: items.type==='send'?'rgb(255, 100, 100)':'rgb(100, 255, 100)'}} className='amount_container_display'>
                  <p  className='display_amount'>${items.amount}</p>
                </div>

              </div>
            )
          })
        }
         
        </div> 
       </div>
       </div>
      </div>
    </div>
  )
}

export default App
