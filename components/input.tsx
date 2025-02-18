'use client'

import { useEffect, useState } from "react"

function Input() {
  const [value, setValue] = useState('')
  const [strings, setStrings] = useState<string[]>([])
  const [filteredStrings, setFilteredStrings] = useState<string[]>([])

  console.log(strings)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    fetch('/wordlist.txt')
      .then(res => res.text())
      .then(data => {
        setStrings(data.split('\n'))
      })
  }, [])

  useEffect(() => {
    const filteredStrings = strings.filter(str => str.startsWith(value))
    setFilteredStrings(filteredStrings)
  }, [value])

  return <div>
    <input type="text" value={value} onChange={onChange} />
    <div>
      {filteredStrings.map(str => (
        <div key={str}>{str}</div>
      ))}
    </div>
  </div>
}

export default Input
