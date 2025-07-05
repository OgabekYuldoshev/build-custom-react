/** @jsx CustomReact.createElement */

import CustomReact from "./custom-react";
import { App } from "./app";

const root = document.getElementById("app")!;

CustomReact.render(<App />, root);
