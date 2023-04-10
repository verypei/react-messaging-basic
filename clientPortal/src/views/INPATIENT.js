import { useRef, useState } from "react";

export default function INPATIENT() {
  const messageInput = useRef();
  const [message, setMessage] = useState([]);
  const div = ["inpatient", "er", "poly", "lab", "pharmacy",'general'];
  const current = "inpatient";

  // ==================================== FUNCTION ====================================

  const handleMessage = async (e) => {
    if (e.key === "Enter" || !e.key) {
      await setMessage((el) => {
        return el = [
          ...el,
          { sender: `${current} portal`, message: messageInput.current.value },
        ];
      });
      messageInput.current.value = "";
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative", display: "flex" }}>
      <h1
        style={{
          height: "15vh",
          position: "absolute",
          display: "flex",
          marginTop: "10px",
        }}
      >
        ======================== {current.toUpperCase()} ========================
      </h1>
      {/* ======================== SIDE BAR ========================*/}
      <div style={{ display: "flex", flexDirection: "column", width: "280px" }}>
        {div.map((e) => {
          if (e !== current) {
            return (
              <div
                style={{
                  width: "280px",
                  background: "#ddd",
                  marginTop: "50px",
                }}
              >
                {e}
              </div>
            );
          }
        })}
      </div>
      {/* ======================== INPUT LAYOUT MESSAGE ========================*/}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "calc(100% - 280px)",
          overflowX: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            bottom: "0",
          }}
        >
          <input
            placeholder="enter"
            style={{ height: "40px", width: "999px" }}
            ref={messageInput}
            onKeyDown={handleMessage}
          />
          <button style={{ width: "125px" }} onClick={handleMessage}>
            send
          </button>
        </div>
      </div>
      {/* ======================== MESSAGE LAYOUT ========================*/}
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "100px" }}
      >
        {message.map((element)=>{
          return (
            <>
              <h5 style={{ margin: '6rem 1rem 0 0'}}>{element.message}</h5>
              <h6 style={{color:"red", margin: 0}}>{element.sender}</h6>
            </>
          )
        })}
      </div>
    </div>
  );
}
