import { createRoot } from "react-dom/client";
import { Signin } from "./components/Signin/Signin";

const root = document.getElementById("root");

if (!root) {
	throw new Error("root not found");
}

const container = createRoot(root);

container.render(<Signin />);
