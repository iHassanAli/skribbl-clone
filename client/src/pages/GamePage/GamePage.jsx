import logo from "../../assets/logo.png";
import Word from "../../components/Word/Word";
import PlayerList from "../../components/PlayerList/PlayerList";
import Canvas from "../../components/Canvas/Canvas";
import Palette from "../../components/Palette/Palette";
import { GameContext } from "../../contexts/GameContext";
import Chat from "../../components/Chat/Chat";
import { useEffect, useContext } from "react";
import "./game-page.styles.scss";
import { CanvasContext } from "../../contexts/CanvasContext";

export default function GamePage() {
  const { setMessagesArray, messagesArray, socket } = useContext(GameContext);
  const { startDrawing, draw, finishDrawing, isDrawing } = useContext(CanvasContext);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      const { username, message } = data;
      setMessagesArray([...messagesArray, { username, message }]);
    });
    socket.on("client_start_drawing", ({offsetX, offsetY}) => {
      startDrawing(offsetX, offsetY);
    });
    socket.on("client_finish_drawing", () => {
      finishDrawing();
      console.log("isDrawing: "+ isDrawing)
    });
    socket.on("client_draw", ({offsetX, offsetY}) => {
      draw(offsetX, offsetY);
    });
  });
  return (
    <div className="game-container">
      <div className="logo-container">
        <img
          style={{ maxWidth: "100%", minHeight: "100%" }}
          src={logo}
          alt="LOGO"
        />
      </div>
      <Word />
      <div className="player-container"></div>
      <div className="main-game-components">
        <PlayerList />
        <Canvas />
        <Chat />
      </div>
      <Palette />
    </div>
  );
}
