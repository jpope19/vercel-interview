'use client'

import { getWordsButCached } from "@/server/actions/words"
import { cache, useEffect, useRef, useState } from "react"

function Input() {
  const [value, setValue] = useState('')
  const [filteredStrings, setFilteredStrings] = useState<string[]>([])
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>()
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    q(e.target.value)
  }

  const q = async (query: string) => {
    setValue(query)
    setSelectedWord(null)

    if (typingTimeout) clearTimeout(typingTimeout)

    if (!query) {
      setFilteredStrings([])

      return
    }

    // Set a new timeout to trigger the search after user stops typing
    setTypingTimeout(
      setTimeout(async () => {
        setLoading(true)
        const res = await getWordsButCached(query)

        setFilteredStrings(res)
        setLoading(false)
      }, 500)
    )
  }

  useEffect(() => {
    document.addEventListener('click', (event) => {
      const node = event.target as Node

      if (ref.current && ref.current.contains(node)) {
        return
      }

      setShow(false)
    })
  }, [])

  useEffect(() => {
    console.log('show', show)
  }, [show])

  return <div className='text-white' ref={ref}>
    {selectedWord && <div className='bg-red-500 p-2 rounded-md'>Selected:{selectedWord}</div>}
    <input className='w-full bg-black border-2 border-white rounded-md p-2' type="text" value={value} onChange={onChange} onFocus={() => setShow(true)} />
    {!selectedWord && show &&
      <div className='relative'>
        <div className='absolute top-2 left-0 w-full bg-black rounded-md p-2'>
          <div className={`${loading ? 'opacity-50' : ''}`}>
            <div className='text-lg font-medium'>Results: ({filteredStrings.length})</div>
            {filteredStrings.slice(0, 10).map(str => (
              <div className='cursor-pointer border-b border-white/15 p-2' key={str} onClick={() => { setSelectedWord(str); console.log(str) }}>{str}</div>
            ))}
            {filteredStrings.length === 0 && <div className='p-2'>No results found</div>}
          </div>
        </div>
      </div>
    }
  </div>
}

export default Input
