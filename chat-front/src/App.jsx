import { useEffect } from "react";
import { Message, Messages } from "./components";
import { useState } from "react";
import { getRandomColor } from "./helpers/getRandomColor";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [{ color, user_name }, setUser] = useState({});
  useEffect(() => {
    setUser({
      color: `bg-${getRandomColor()}-100`,
      user_name: `user_${Math.floor(Math.random() * 100)}`,
    });
  }, []);

  useEffect(() => {
    async function init() {
      const resp = await fetch("http://127.0.0.1:8000/messages");
      const json = await resp.json();
      setMessages(json);
    }
    init();
  }, []);

  useEffect(() => {
    window.Echo.channel("messages").listen(
      "MessageCreated",
      function ({ message }) {
        setMessages((oldMessage) => [...oldMessage, message]);
      }
    );
    return () => {
      window.Echo.leaveChannel("messages");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function init() {
      const resp = await fetch("http://127.0.0.1:8000/messages", {
        body: new FormData(e.target),
        headers: {
          "X-Socket-ID": window.Echo.socketId(),
        },
        method: "post",
      });
      const json = await resp.json();
      console.log(resp);
      setMessages((oldMessage) => [...oldMessage, { ...json, own: true }]);
      e.target.reset();
    }
    init();
  };

  return (
    <div className="container mx-auto mt-16">
      <div className="rounded-2xl border shadow-2xl p-4 flex flex-col gap-y-4">
        <span className="text-slate-50 text-4xl font-bold">Chat</span>
        <Messages>
          {messages?.map((props) => (
            <Message key={props.id} {...props} />
          ))}
        </Messages>
        <form onSubmit={handleSubmit}>
          <div className="relative bg-slate-50 rounded-2xl  w-full">
            <input value={color} name="color" type="hidden" />
            <input value={user_name} name="user_name" type="hidden" />
            <textarea
              name="message"
              className="w-full h-full p-4 rounded-2xl"
            ></textarea>
            <button className="absolute right-0 h-full border-l border-slate-300 bg-slate-200 p-4 rounded-e-2xl">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
