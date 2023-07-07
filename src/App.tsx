import "./App.css"
import Header from "@/components/Header"
import useGetExchangeRates from "@/hooks/useGetExchangeRates"

function App() {
  const currencyRates = useGetExchangeRates()

  return (
    <>
      <h1 className="main-header">Currency converter</h1>
      <Header currencyRates={currencyRates} />
    </>
  )
}

export default App
