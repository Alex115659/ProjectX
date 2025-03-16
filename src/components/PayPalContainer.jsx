import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../styles/paypal.css";
import { db } from "../firebase/firestore";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

const PayPalDonation = () => {
  const [input, setInput] = useState("");
  const [submitedAmount, setSubmitedAmount] = useState(0);
  const [nickname, setNickname] = useState("");

  async function onFormSubmit(event) {
    event.preventDefault();

    let amountToSend = parseFloat(input);

    if (isNaN(amountToSend) || amountToSend <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    setSubmitedAmount(amountToSend.toFixed(2));

    const sendersRef = collection(db, "senders");
    const q = query(sendersRef, where("nickname", "==", nickname));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("sender founded:", querySnapshot.docs[0].data());
        const senderDoc = querySnapshot.docs[0]; 
        const senderData = senderDoc.data();  
        const newAmount = parseFloat(senderData.amount) + amountToSend

        await updateDoc(doc(db, "senders", senderDoc.id), {
          amount: newAmount.toFixed(2)
        })

        await addDoc(collection(db, "transactions"), {
          nickname: nickname,
          amount: amountToSend,
          date: new Date().toISOString(),
        });
      } else {
          await addDoc(sendersRef, {
          nickname: nickname,
          amount: amountToSend,
        });

        await addDoc(collection(db, "transactions"), {
          nickname: nickname,
          amount: amountToSend,
          date: new Date().toISOString(),
        });

      }
    } catch (error) {
      console.error("Error while checking nickname:", error);
    }
  }

  return (
    <PayPalScriptProvider options={{ "client-id": "AUllT0w2Jc3_fxoDqgbq9pMZGH1qzGJ5MCPPpjj9IhQVEZNGgCGg1jRZowfaKXjmxxuJ6g4xNgQGbjsi" }}>
      <div style={{overflowY: "scroll"}} className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">I don't know why, but send me your money</h1>
        <p className="text-lg mb-6">If you send me money, you will be on the board of top senders.</p>

        <form className="sending-amount" onSubmit={onFormSubmit}>
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="How much do you want to send?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Choose your nickname or already chosen"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>

        {submitedAmount > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="paypal"
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: submitedAmount },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(`Thank you, ${details.payer.name.given_name}! Your donation of $${submitedAmount} is appreciated.`);
                });
              }}
            />
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalDonation;
