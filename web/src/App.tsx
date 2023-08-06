import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import './App.css'
import globalStateAtom from "./atoms/global-atom";
import vscodeAPIs from "./vscode-apis";

function App() {
  const [globalState, setGlobalState] = useRecoilState(globalStateAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    vscodeAPIs.getInitialValues().then(newData => {
      setGlobalState(newData);
      setIsLoading(false);
    });
  }, []);

  const { view } = globalState;

  const renderView = () => {
    // spinner
    if (isLoading) return <div>Loading....</div>;

    switch (view) {
      case "chatbot_poc_activity_bar_1":
        return <div>Hi I am from react</div>;
    }
  };

  return <div>{renderView()}</div>;


}

export default App
