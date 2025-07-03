import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * str.length)
      pass += str.charAt(idx)
    }
    setPassword(pass)
    setCopied(false)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, password.length)
    window.navigator.clipboard.writeText(password).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md bg-gray-700 rounded-xl shadow-xl p-6 text-gray-100">
        <h1 className="text-2xl font-bold text-center mb-4">🔐 Password Generator</h1>

        <div className="flex mb-4">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            readOnly
            className="flex-1 bg-gray-600 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={copyPasswordToClipboard}
            className={`px-4 flex items-center justify-center rounded-r-lg transition
              ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>

        <div className="space-y-4 mb-4">
          <div className="flex items-center justify-between">
            <label htmlFor="range" className="font-medium">Length: {length}</label>
            <input
              id="range"
              type="range"
              min="6"
              max="50"
              value={length}
              onChange={e => setLength(+e.target.value)}
              className="w-2/3 accent-indigo-400 cursor-pointer"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(p => !p)}
                className="h-5 w-5 accent-indigo-500"
              />
              <span>Numbers</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed(p => !p)}
                className="h-5 w-5 accent-indigo-500"
              />
              <span>Symbols</span>
            </label>
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 py-2 rounded-lg text-lg font-semibold transition transform hover:scale-105"
        >
          Regenerate
        </button>
      </div>
    </div>
  )
}

export default App
