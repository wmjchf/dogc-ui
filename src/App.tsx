import * as dayjs from "dayjs";

export const App = () => {
  const execute = () => {
    import(/*webpackChunkName:'test'*/ "./utils/index").then(
      ({ formatDogWang }) => {
        formatDogWang();
      }
    );
  };
  return (
    <div className="rect" onClick={execute}>
      {dayjs().format("YYYY-MM-DD")}
    </div>
  );
};
