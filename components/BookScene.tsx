export default function BookScene({ onOpen }: { onOpen: () => void }) {
  
  const handleOpen = () => {
    // The music is already playing, so we just move to the next scene
    onOpen();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950">
      <div 
        onClick={handleOpen}
        className="cursor-pointer group perspective-[1200px] flex flex-col items-center"
      >
        <div className="relative w-64 h-80 sm:w-72 sm:h-96 bg-zinc-900 rounded-r-3xl rounded-l-md shadow-2xl border-l-[12px] border-pink-800 transition-transform duration-700 ease-out group-hover:rotate-y-[-15deg] group-hover:scale-105">
          <div className="absolute inset-0 bg-pink-950 rounded-r-3xl rounded-l-sm flex flex-col items-center justify-center p-6 border-2 border-pink-900 border-l-0 shadow-[inset_6px_0_15px_rgba(0,0,0,0.6)]">
            <div className="border-4 border-dashed border-pink-500/50 w-full h-full flex flex-col items-center justify-center p-4 rounded-2xl bg-black/20">
              
              <h2 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 text-center leading-tight drop-shadow-sm mb-4">
                OPEN<br/>ME
              </h2>
              <span className="text-4xl animate-bounce mt-4">✨</span>
              
            </div>
          </div>
          <div className="absolute right-[-6px] top-3 bottom-3 w-1.5 bg-zinc-200 rounded-r-sm shadow-[inset_1px_0_2px_rgba(0,0,0,0.3)]"></div>
        </div>
      </div>
    </div>
  );
}