'use client'

import App from "./App";
import { Loader } from "./components/Loader";

export default function Home() {
  if (typeof window !== 'undefined') {
    return (<App/>
    );
  }
  return <Loader/>;
}
