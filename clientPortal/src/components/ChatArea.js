import { useRef, useState, useEffect } from "react";

export default function CHATAREA(props){

    // const messageInput = useRef();
    const [message, setMessage] = useState(props);

    // const handleMessage = async (e) => {


    // //   let obj = {
    // //     sender: `${current}_cms`, 
    // //     message: messageInput.current.value
    // //   }

    // //   if(obj.message.trim() !== ""){
    // //     if(e.target.value === '85007479-0b50-4308-abdf-394407826dc2' || e.key === "Enter"){
    // //         setMessage((el) => {
    // //           return el = [
    // //             ...el,
    // //             obj,
    // //           ];
    // //         });
    // //         messageInput.current.value = "";
    // //         socket.emit('events_sender', obj);
    // //         socket.off();
    // //     }
    // //   }

    // };

  return (
    <div>
      {/* ======================== INPUT LAYOUT MESSAGE ========================*/}
      <div>
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
            // ref={messageInput}
            // onKeyDown={handleMessage}
          />
          <button
            style={{ width: "125px" }}
            value={"85007479-0b50-4308-abdf-394407826dc2"}
            // onClick={handleMessage}
          >
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
};
