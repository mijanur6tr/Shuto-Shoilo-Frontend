import React, { useState } from 'react'
import { Hero, Category, Product } from '../components'

export const Home = (props) => {

  const [category,setCategory] = useState("All")

  return(
    <>
    <Hero/>
    <Category category={category} setCategory={setCategory}/>
    <Product category={category}/>
    </>
   )
  }
