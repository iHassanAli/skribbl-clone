import { createContext, useState } from "react";

import { io } from "socket.io-client";

const socket = io.connect("http://192.168.56.1:3001");

export const GameContext = createContext({
  username: "",
  setUsername: () => {},
  messagesArray: [],
  setmessageesArray: () => {},
  sendMessage: () => {},
  socket: null,
  avatar: {},
  setAvatar: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  playersList: {},
  setPlayersList: () => {},
  isChoosing: false,
  wordsToChooseFrom: [],
  chooseWords: () => {},
  setIsChoosing: () => {},
  time: 60,
  setTime: () => {},
  round: 1,
  setRound: () => {},
  wordToGuessLength: 0,
  setWordToGuessLength: () => {},
  isAllowedToDraw: false,
  setIsAllowedToDraw: () => {},
  correctWord: "",
  setCorrectWord: () => {},
  isTurnOver: false,
  setIsTurnOver: () => {},
  isGameOver: false,
  setIsGameOver: () => {},
});

export const GameContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [messagesArray, setMessagesArray] = useState([]);
  const [avatar, setAvatar] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playersList, setPlayersList] = useState([]);
  const [isChoosing, setIsChoosing] = useState(false);
  const [wordsToChooseFrom, setWordsToChooseFrom] = useState([]);
  const [time, setTime] = useState(60);
  const [round, setRound] = useState(1);
  const [wordToGuessLength, setWordToGuessLength] = useState(0);
  const [isAllowedToDraw, setIsAllowedToDraw] = useState(false);
  const [correctWord, setCorrectWord] = useState("");
  const [isTurnOver, setIsTurnOver] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const chooseWords = (chosenWords) => {
    setIsChoosing(true);
    setWordsToChooseFrom(chosenWords);
  };
  const sendMessage = (message) => {
    setMessagesArray([...messagesArray, { username, message }]);
    socket.emit("send_message", { username, message, color: "black" });
  };
  const value = {
    username,
    setUsername,
    sendMessage,
    messagesArray,
    setMessagesArray,
    socket,
    avatar,
    setAvatar,
    isLoggedIn,
    setIsLoggedIn,
    playersList,
    setPlayersList,
    isChoosing,
    setIsChoosing,
    wordsToChooseFrom,
    chooseWords,
    wordToGuessLength,
    setWordToGuessLength,
    time,
    setTime,
    round,
    setRound,
    isAllowedToDraw,
    setIsAllowedToDraw,
    correctWord,
    setCorrectWord,
    isTurnOver,
    setIsTurnOver,
    isGameOver,
    setIsGameOver,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
