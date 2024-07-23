
import {Route} from "react-router-dom";
import NewContact from "./containers/NewContact/NewContact.tsx";

const App = () => {
  return (
      <>
          <Route path="/new-dish" element={<NewContact />} />
      </>
  )
};

export default App
