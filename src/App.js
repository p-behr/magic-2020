import React, {useState} from 'react';
import UserList from "./components/UserList";
import UserProvider from "./hooks/UserProvider";
import Footer from "./components/Footer";

const defaultUrl = {
  "get" : "/data/users.json",
  "post" : "",
  "alert" : false
}

function App() {

  const [url , setUrl] = useState(defaultUrl);

  const submitNewUrl = (newUrl) => {
    setUrl(newUrl);
  }

  return (
    <>
      <header>
          <h1>Authority Maintenance</h1>
      </header>


      <main>
        <UserProvider url={url}>
          <UserList />
        </UserProvider>
      </main>

      <Footer currentUrl={url} onSubmit={submitNewUrl} />
    </>
  );
}

export default App;
