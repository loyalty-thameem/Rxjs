import { Observable } from "rxjs";

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.next(4);
  setTimeout(() => {
    subscriber.next(5);
    subscriber.complete();
  }, 3000);
});

console.log("Just before subscriber");

observable.subscribe(\
  // OBSERVER {.....} BELOW CODE
  {
  next(x) {
    console.log("got value ", x);
  },
  error(err) {
    console.log("Something wrong occurred", err);
  },
  complete() {
    console.log("done");
  }
});
console.log("Just after subscriber");
