import React from "react"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <h1 className="text-3xl">Dashboard</h1>
      <div className="mt-4">
        {children}
      </div>
    </div>
  )
}

export default layout