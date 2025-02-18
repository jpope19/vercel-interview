import React from "react"

function Tile1x1() {
  return (
    <div
      className={`col-span-1 row-span-1 bg-blue-200 text-black flex items-center justify-center text-xl font-bold rounded-lg shadow-md`}
    >
      1x1
    </div>
  )
}

function Tile1x2() {
  return (
    <div
      className={`col-span-1 row-span-2 bg-blue-300 text-black flex items-center justify-center text-xl font-bold rounded-lg shadow-md`}
    >
      1x2
    </div>
  )
}

function Tile1x3() {
  return (
    <div
      className={`col-span-1 row-span-3 bg-blue-400 text-black flex items-center justify-center text-xl font-bold rounded-lg shadow-md`}
    >
      1x3
    </div>
  )
}

function Tile2x1() {
  return (
    <div
      className={`col-span-2 row-span-1 bg-green-200 text-black flex items-center justify-center text-xl font-bold rounded-lg shadow-md`}
    >
      2x1
    </div>
  )
}

function Tile2x2() {
  return (
    <div
      className={`col-span-2 row-span-2 bg-green-300 text-black flex items-center justify-center text-xl font-bold rounded-lg shadow-md`}
    >
      2x2
    </div>
  )
}

function Tile2x3() {
  return (
    <div
      className={`col-span-2 row-span-3 bg-green-400 text-black flex items-center justify-center text-xl font-bold rounded-lg shadow-md`}
    >
      2x3
    </div>
  )
}

function Tile3x1() {
  return (
    <div
      className={`col-span-3 row-span-1 bg-red-200 text-black flex items-center justify-center text-xl font-bold rounded-lg shadow-md`}
    >
      3x1
    </div>
  )
}

function Tile3x2() {
  return (
    <div
      className={`col-span-3 row-span-2 bg-red-300 text-black flex items-center justify-center text-xl font-bold rounded-lg shadow-md`}
    >
      3x2
    </div>
  )
} 

function Tile3x3() {
  return (
    <div
      className={`col-span-3 row-span-3 bg-red-400 text-black flex items-center justify-center text-xl font-bold rounded-lg shadow-md`}
    >
      3x3
    </div>
  )
}

function getTile(colSpan: number, rowSpan: number) {
  if (colSpan === 1 && rowSpan === 1) {
    return <Tile1x1 />
  }
  if (colSpan === 1 && rowSpan === 2) {
    return <Tile1x2 />
  }
  if (colSpan === 1 && rowSpan === 3) {
    return <Tile1x3 />
  }
  if (colSpan === 2 && rowSpan === 1) {
    return <Tile2x1 />
  }
  if (colSpan === 2 && rowSpan === 2) {
    return <Tile2x2 />
  }
  if (colSpan === 2 && rowSpan === 3) {
    return <Tile2x3 />
  }
  if (colSpan === 3 && rowSpan === 1) {
    return <Tile3x1 />
  }
  if (colSpan === 3 && rowSpan === 2) {
    return <Tile3x2 />
  }
  if (colSpan === 3 && rowSpan === 3) {
    return <Tile3x3 />
  }
}

export default function TileGrid() {
  const tiles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    colSpan: Math.floor(Math.random() * 3) + 1, // Random 1-3
    rowSpan: Math.floor(Math.random() * 3) + 1, // Random 1-3
  }))

  return (
    <div className="grid grid-cols-6 auto-rows-[100px] gap-0 w-full h-full p-2 grid-flow-dense bg-gray-200">
      {tiles.map(({ id, colSpan, rowSpan }) => (
        <React.Fragment key={id}>
          {getTile(colSpan, rowSpan)}
        </React.Fragment>
      ))}
    </div>
  )
}
