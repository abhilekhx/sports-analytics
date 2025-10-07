import { registerRootComponent } from "expo";
import Home from "./src/app/index";
import "expo-router/entry";
import App from "./App";

console.log("app");
registerRootComponent(Home);
