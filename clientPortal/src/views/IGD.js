import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import {v4} from 'uuid'


export default function IGD() {
  const socket = io.connect('http://localhost:3002');//connected to server
  const messageInput = useRef();
  const [statusMessage, setStatusMessage] = useState(false)
  const [message, setMessage] = useState([]);
  const div = ["inpatient", "er", "poly", "lab", "pharmacy", "general"];
  const current = "er";

  // ==================================== USE FX ====================================
  useEffect(() => {
    socket.on(
      "events_re",
      async (obj) => {
        setStatusMessage(true);
        socket.off();
        setMessage((el) => {
          return (el = [...el, obj]);
        });
        socket.off();
      },
      [statusMessage]
    );
    return () => {
      setStatusMessage(false);
      socket.off();
    };
  }, [statusMessage, socket]);
  
  // ==================================== FUNCTION ====================================
  const handleMessage = async (e) => {

    let obj = {
      sender: `${current} portal`, 
      message: messageInput.current.value
    }
    if(obj.message.trim() !== ""){
      console.log(e.target.value,"--value--");
      if(e.target.value === '85007479-0b50-4308-abdf-394407826dc2' || e.key === "Enter"){
          setMessage((el) => {
            return el = [
              ...el,
              obj,
            ];
          });
          messageInput.current.value = "";
          socket.emit('events_sender', obj);
          socket.off();
      }
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
        ======================== {current.toUpperCase()}{" "}
        ========================
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
          <button style={{ width: "125px" }} 
            value={'85007479-0b50-4308-abdf-394407826dc2'}
            onClick={handleMessage} >
            send
          </button>
        </div>
      </div>
      {/* ======================== MESSAGE LAYOUT ========================*/}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {message.map((element) => {
          return (
            <>
              <h5 style={{ margin: "6rem 1rem 0 0" }}>{element.message}</h5>
              <h6 style={{ color: "red", margin: 0 }}>{element.sender}</h6>
            </>
          );
        })}
      </div>
    </div>
  );
}
