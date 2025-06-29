import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;  // Extracting the id from params
  return (
 <h1 className='text-3xl'>User Profile: {id}</h1>
  )
}

export default page