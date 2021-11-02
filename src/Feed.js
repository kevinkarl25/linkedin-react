import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@mui/icons-material/Create";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import ImageIcon from "@mui/icons-material/Image";
import InputOption from "./InputOption.js";
import Post from "./Post";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";

function Feed() {
  // This is some post for my custom LinkedIn App! 😊

  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) =>
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
      ),
    []
  );

  const sendPost = async (e) => {
    e.preventDefault();

    const inputToSend = input; // prevents spam, instant UI response.
    setInput("");

    if (inputToSend.trim().length > 0) {
      const docRef = await addDoc(collection(db, "posts"), {
        username: "Kevin Obispo",
        description: "This is a test",
        message: inputToSend,
        photoUrl: "",
        timestamp: serverTimestamp(),
      });

      console.log("New post added with ID", docRef.id);
    }
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form action="">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>

        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write Article"
            color="#7FC155E"
          />
        </div>
      </div>

      {/* "data" here is the one we used on snapshot destructuring */}
      {posts.map(
        ({ id, data: { username, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={username}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        )
      )}

      <Post
        name="Kevin Obispo"
        description="This is a test"
        message="Looking pretty damn good!"
      />
    </div>
  );
}

export default Feed;
