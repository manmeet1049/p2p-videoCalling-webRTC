import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();
  
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      // console.log("Email:", email);
      // console.log("Code:", room);

      socket.emit("room:join", { email, room }); // emiting the room join event to the socket server.
    },
    [email, room, socket]
  );

  const handleJoinRoom = (data) => {
    const { email, room } = data;
    // console.log(email, room);
    navigate(`/room/${room}`)
  };

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);
  return (
    <div>
      LOBBY
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Code:</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
