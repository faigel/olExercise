import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(<App tab="home" />);

// 上传到github如果超时：
// git config --global https.proxy http://127.0.0.1:1080
// git config --global http.proxy http://127.0.0.1:1080
// 然后
// git config --global --unset https.proxy
// git config --global --unset http.proxy
