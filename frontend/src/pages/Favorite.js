import React from 'react'
import { useQuery } from 'react-query'

const Favorite = () => {
  const {data , isLoading , isError} = useQuery('favorite')
  return (
    <div>Favorite</div>
  )
}

export default Favorite