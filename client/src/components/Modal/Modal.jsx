import "./modal.styles.scss";
import loading from "../../assets/loading.gif";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

export default function Modal() {
  const {
    isChoosing,
    setIsChoosing,
    setIsAllowedToDraw,
    setCorrectWord,
    wordsToChooseFrom,
    socket,
    playersList,
    isTurnOver,
  } = useContext(GameContext);
  const sendChoice = (e) => {
    setIsChoosing(false);
    setIsAllowedToDraw(true);
    setCorrectWord(e.target.value);
    socket.emit("send_choice", e.target.value);
  };

  return (
    <div className="modal-container">
      {isChoosing ? (
        <div className="choose-words">
          Choose One of the 3 Words{" "}
          <div className="choices">
            {wordsToChooseFrom.map((word, i) => (
              <button value={word} onClick={sendChoice} key={i}>
                {word}
              </button>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {playersList.length < 2 ? (
        <div className="waiting">
          <div>Waiting for other players to join</div>
          <img src={loading} alt="loading" />
        </div>
      ) : (
        ""
      )}
      {isTurnOver ? (
        <div>
          {playersList.map((player) => (
            <div>
              {player.username} {player.score}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
