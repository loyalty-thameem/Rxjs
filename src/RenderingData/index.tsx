import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { interval } from "rxjs";
import { map, take } from "rxjs/operators";
import "./styles.css";
import { of } from "rxjs";
import { fromFetch } from "rxjs/fetch";

const data$ = fromFetch("https://jsonplaceholder.typicode.com/users", {
  selector: (response) => response.json()
});

let myData = [];
data$.subscribe({
  next: (result) => result.map((result) => myData.push(result)),
  complete: () => console.log("done")
});
const source = myData;
// const source = [{ name: "adrian" }, { name: "raj" }];
const names$ = interval(1000).pipe(
  take(10),
  // map((i) => source.slice(i, i + 1))
  map((i) => source.slice(0, i + 1))
);
const useObservable = (observable) => {
  const [state, setState] = useState();
  console.log("state", state);
  useEffect(() => {
    observable.subscribe(setState);
  }, [observable]);

  return state;
};

function App() {
  const names = useObservable(names$);
  return (
    <div className="App">
      {/* <h1>RxJS with React</h1> */}
      <List items={names} />
    </div>
  );
}
const List = ({ items = [], loading = false }) => (
  <ul className={loading ? "loading" : null}>
    {items.map((item) => (
      <li key={item.name}>{item.name}</li>
    ))}
  </ul>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
