import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Chat from "./Chat";
import { BrowserRouter, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import GraphQLProvider from "./GraphQLProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}

function GraphQLApp() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const app = searchParams.get("app");
  let port = parseInt(searchParams.get("port"), 10) || 8080;

  if (!app) {
    throw new Error("Missing 'app' query parameter");
  }

  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error("Invalid port number");
  }

  return (
    <GraphQLProvider chainId={id} applicationId={app} port={port}>
      <Chat chainId={id} />
    </GraphQLProvider>
  );
}

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path=":id" element={<GraphQLApp />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
