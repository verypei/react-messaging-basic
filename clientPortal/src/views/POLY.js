import { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import Badge from "@mui/material/Badge";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

export default function POLY() {
  const socket = io.connect("http://localhost:3002"); //connected to server
  const messageInput = useRef();

  const [messageEr, setErMessage] = useState([]);
  const [messageErStatus, setErStatusMessage] = useState(false);

  const [messageLab, setLabMessage] = useState([]);
  const [messageLabStatus, setLabStatusMessage] = useState(false);

  const [messagePh, setPhMessage] = useState([]);
  const [messagePhStatus, setPhStatusMessage] = useState(false);

  const [messageInp, setInpMessage] = useState([]);
  const [messageInpStatus, setInpStatusMessage] = useState(false);

  const [messageGeneral, setGeneralMessage] = useState([]);
  const [messageGeneralStatus, setGeneralStatusMessage] = useState(false);

  const division = [
    { div: "inpatient_cms", count: 0 },
    { div: "er_cms", count: 0 },
    { div: "pharmacy_cms", count: 0 },
    { div: "lab_cms", count: 0 },
    { div: "poly_cms", count: 0 },
    { div: "general", count: 0 },
  ];
  const current = "poly_cms";

  // ==================================== USE FX ====================================
  // ----------------------- use fx socket io  receiver -----------------------
  useEffect(() => {
    socket.on("POLY_1", handleReceiveMessage);
    socket.on("GENERAL", handleReceiveMessage);

    return () => {
      socket.off();
    };
  }, [socket, division]);

  // ==================================== FUNCTION ====================================
  const handleReceiveMessage = (obj) => {
    switch (obj.sender) {

      case "pharmacy_cms":
        console.log(division, "---div afer adding num");
        setPhMessage((prev) => {
          return (prev = [...prev, obj]);
        });
        break;

      case "lab_cms":
        console.log("masuk ke lab switch");
        setLabMessage((prev) => {
          return (prev = [...prev, obj]);
        });
        break;

      case "er_cms":
        console.log("masuk ke lab switch");
        setErMessage((prev) => {
          return (prev = [...prev, obj]);
        });
        break;

      case "inpatient_cms":
        console.log("masuk ke lab switch");
        setInpMessage((prev) => {
          return (prev = [...prev, obj]);
        });
        break;

      case "general":
        console.log("masuk ke G switch");
        setGeneralMessage((prev) => {
          return (prev = [...prev, obj]);
        });
        break;
    }
    socket.off();
  };

  const handleMessage = async (e) => {
    let obj = {
      sender: `${current}`,
      message: messageInput.current.value,
    };
    console.log(obj, "mentahan objek---");

    if (obj.message.trim() !== "") {
      if (
        e.target.value === "85007479-0b50-4308-abdf-394407826dc2" ||
        e.key === "Enter"
      ) {
        if (messagePhStatus) {
          setPhMessage((prev) => {
            return (prev = [...prev, obj]);
          });
          messageInput.current.value = "";
          obj.receiver = "PHARMACY_1";
          socket.emit("POLY_CMS_SEND", obj);
          socket.off();
        }
        if (messageLabStatus) {
          setLabMessage((prev) => {
            return (prev = [...prev, obj]);
          });
          messageInput.current.value = "";
          obj.receiver = "LAB_1";
          socket.emit("POLY_CMS_SEND", obj);
          socket.off();
        }
        if (messageErStatus) {
          setErMessage((prev) => {
            return (prev = [...prev, obj]);
          });
          messageInput.current.value = "";
          obj.receiver = "ER_1";
          socket.emit("POLY_CMS_SEND", obj);
          socket.off();
        }
        if (messageGeneralStatus) {
          setGeneralMessage((prev) => {
            return (prev = [...prev, obj]);
          });
          messageInput.current.value = "";
          obj.receiver = "GENERAL";
          console.log(obj, "--obj to send=====>>");
          socket.emit("ER_CMS_SEND", obj);
          socket.off();
        }
        if (messageInpStatus) {
          setInpMessage((prev) => {
            return (prev = [...prev, obj]);
          });
          messageInput.current.value = "";
          obj.receiver = "INP_1";
          console.log(obj, "--obj to send=====>>");
          socket.emit("POLY_CMS_SEND", obj);
          socket.off();
        }
      }
    }
  };

  const activeChat = (value) => {
    console.log(value, "--e inner text--");
    switch (value) {
      case "pharmacy_cms":
        setPhStatusMessage(true);
        setLabStatusMessage(false);
        setErStatusMessage(false);
        setInpStatusMessage(false)
        setGeneralStatusMessage(false);
        break;

      case "lab_cms":
        setLabStatusMessage(true);
        setInpStatusMessage(false)
        setPhStatusMessage(false);
        setErStatusMessage(false);
        setGeneralStatusMessage(false);
        break;

      case "er_cms":
        setErStatusMessage(true);
        setLabStatusMessage(false);
        setInpStatusMessage(false)
        setPhStatusMessage(false);
        setGeneralStatusMessage(false);
        break;

      case "inpatient_cms":
        setInpStatusMessage(true)
        setErStatusMessage(false);
        setLabStatusMessage(false);
        setPhStatusMessage(false);
        setGeneralStatusMessage(false);
        break;

      case "general":
        setGeneralStatusMessage(true);
        setLabStatusMessage(false);
        setPhStatusMessage(false);
        setInpStatusMessage(false)
        setErStatusMessage(false);
        break;
    }
  };

  return (
    <div style={{ height: "100vh", position: "relative", display: "flex" }}>
      {/* ======================== SIDE BAR ========================*/}
      <div style={{ display: "flex", flexDirection: "column", width: "280px" }}>
        {division.map((e, id) => {
          if (e.div !== current) {
            return (
              <div
                key={id}
                style={{
                  width: "280px",
                  background: "#ddd",
                  marginTop: "50px",
                }}
                value={e.div}
                onClick={() => {
                  activeChat(e.div);
                }}
              >
                {e.div}
                <Badge
                  badgeContent={1}
                  className="font-11 hms-badge-danger hms-position-notif"
                >
                  <NotificationsRoundedIcon
                    style={{ fontSize: "1rem", color: "#FFFFFF" }}
                  />
                </Badge>
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
          <button
            style={{ width: "125px" }}
            value={"85007479-0b50-4308-abdf-394407826dc2"}
            onClick={handleMessage}
          >
            send
          </button>
        </div>
      </div>
      {/* ======================== MESSAGE LAYOUT ========================*/}

      {/* pharmacy chat display */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {messagePhStatus &&
          messagePh.map((element, id) => {
            return (
              <div key={id}>
                <h5 style={{ margin: "6rem 1rem 0 0" }}>{element.message}</h5>
                <h6 style={{ color: "red", margin: 0 }}>{element.sender}</h6>
              </div>
            );
          })}
      </div>

      {/* lab chat display */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {messageLabStatus &&
          messageLab.map((element, id) => {
            return (
              <div key={id}>
                <h5 style={{ margin: "6rem 1rem 0 0" }}>{element.message}</h5>
                <h6 style={{ color: "red", margin: 0 }}>{element.sender}</h6>
              </div>
            );
          })}
      </div>

      {/* er chat display */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {messageErStatus &&
          messageEr.map((element, id) => {
            console.log(element, "--element in mapping----");
            return (
              <div key={id}>
                <h5 style={{ margin: "6rem 1rem 0 0" }}>{element.message}</h5>
                <h6 style={{ color: "red", margin: 0 }}>{element.sender}</h6>
              </div>
            );
          })}
      </div>

      {/* inp chat display */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {messageInpStatus &&
          messageInp.map((element, id) => {
            console.log(element, "--element in mapping----");
            return (
              <div key={id}>
                <h5 style={{ margin: "6rem 1rem 0 0" }}>{element.message}</h5>
                <h6 style={{ color: "red", margin: 0 }}>{element.sender}</h6>
              </div>
            );
          })}
      </div>

      {/* general chat display */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {messageGeneralStatus &&
          messageGeneral.map((element, id) => {
            return (
              <div key={id}>
                <h5 style={{ margin: "6rem 1rem 0 0" }}>{element.message}</h5>
                <h6 style={{ color: "red", margin: 0 }}>{element.sender}</h6>
              </div>
            );
          })}
      </div>
    </div>
  );
}
