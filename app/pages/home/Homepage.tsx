"use client"
export default function Homepage() {

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6 flex md:flex-row flex-col gap-6 w-full items-center justify-between ">
              <div className="md:flex hidden md:flex-col flex-row justify-between  items-start">
                <h1 className="text-md   tracking-tight md:text-3xl">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Admin</p>
              </div>
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-4">
                  <button className="btn btn-sm px-4 py-3 cursor-pointer flex items-center gap-3 font-light text-white rounded-lg bg-[#155DFC] hover:bg-[#8AAEFE]"><span className="text-2xl">+</span>  Add New Drom</button>
                  <button className="btn btn-sm px-4 py-3 cursor-pointer flex items-center gap-3 font-light text-white rounded-lg bg-[#155DFC] hover:bg-[#8AAEFE]"><span className="text-2xl">+</span> Add Payment Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ >
  )
}
