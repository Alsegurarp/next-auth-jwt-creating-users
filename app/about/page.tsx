import React from 'react'

function page() {
  return (
    <div className='h-100 w-full '>
        <div className="px-8 py-2">
        <h2 className="text-3xl mb-4">About page</h2>
        <div className="overflow-x-hidden w-1/2 bg-amber-300 flex flex-col px-4 py-6">
            <pre className='w-1/2 h-3/12'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </pre>
            <pre className="">
                Temporibus nihil, pariatur hic dicta accusamus.
            </pre>
        </div>
        </div>
    </div>
  )
}

export default page