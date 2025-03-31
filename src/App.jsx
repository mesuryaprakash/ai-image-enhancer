import Home from "./components/Home"

function App() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Image Enhancer</h1>
        <p className="text-m text-gray-500">Upload youe image and let ai enhance to in seconds!</p>
      </div>
      <Home />
      <div className="text-s text-gray-500 mt-6">
        <p>Image Enhancer by mesuryaprakash</p>
      </div>
    </div>
  )
}

export default App
