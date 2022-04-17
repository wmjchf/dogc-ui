import React from "react"
import * as dayjs from "dayjs"
export const App = () => {
  const execute = () => {
    import(/*webpackChunkName:'test'*/ "./utls/index").then(
      ({ formatDogWang }) => {
        formatDogWang()
      }
    )
  }
  return (
    <div class="rect" onClick={execute}>
      {dayjs().format("YYYY-MM-DD")}
    </div>
  )
}
