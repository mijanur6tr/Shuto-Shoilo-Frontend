import React, { useContext } from 'react'
import { Item } from '../components'
import { ContextStore } from '../context/contextStore'

export const Bookmark = () => {
  const { itemList  } = useContext(ContextStore)

  const selectedItemList = itemList.filter((item) => item.category === "Classic Bookmarks")

  return (
    <div className="px-3 pt-15 sm:px-6 lg:px-8 xl:mx-15">
      <h2 className="py-16 font-bold text-center text-3xl sm:text-4xl">
        Make Your Purchase to beautify Your <span className="text-red-600">LOVE</span>
      </h2>

      <div className="grid gap-6 pb-20 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {selectedItemList.map((item) => (
          <Item
            key={item._id}
           {...item}
          />
        ))}
      </div>
    </div>
  )
}
