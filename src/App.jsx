import quotes from './quotes.js'
import { useState, useEffect } from 'react'

function App() {
  const [showQuote, setShowQuote] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('')
  const [quoteSource, setQuoteSource] = useState('')
  const [filtered, setFiltered] = useState(quotes);
  const category = ["Motivational", "Humor", "Life"];
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [copy, setCopy] = useState('Copy')



useEffect(() => {
  if (showQuote) {
    localStorage.setItem(
      'currentQuote',
      JSON.stringify({
        quote: showQuote,
        author: quoteAuthor,
        source: quoteSource
      })
    );
  }
}, [showQuote, quoteAuthor, quoteSource]);

useEffect(() => {
  localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
}, [savedQuotes]);


function generateQuote() {
  const sourceArray = filtered.length ? filtered : quotes;
  const randomQuote = sourceArray[Math.floor(Math.random() * sourceArray.length)];
  setShowQuote(randomQuote.text);
  setQuoteAuthor(randomQuote.author);
  setQuoteSource(randomQuote.source);
}


function handleCategorySelect(category) {
  const filteredQuotes = quotes.filter((q) => 
    q.category.toLocaleLowerCase() === category.toLocaleLowerCase()
  );
  setFiltered(filteredQuotes);
}
  
  
 function favoriteQuote() {
  if (showQuote === '') return;

  const alreadySaved = savedQuotes.some(
    (q) => q.quote.toLowerCase() === showQuote.toLowerCase() && q.author.toLowerCase() === quoteAuthor.toLowerCase()
  );

  if (alreadySaved) return;

  setSavedQuotes((prev) => [
    ...prev,
    {
      quote: showQuote,
      author: quoteAuthor,
      source: quoteSource
    }
  ]);
 }
  
  function copyQuote() {
  if (!showQuote) return;

  const textToCopy = `"${showQuote}" — ${quoteAuthor}`;
  
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      setCopy('Copied!')
    setTimeout(() => {
    setCopy('Copy')
    }, 2000)
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
  }
  
  function shareToX() {
    if (!showQuote) return;
    const text = `"${showQuote}" — ${quoteAuthor}`;
    const encodedText = encodeURIComponent(text)
    const url = `https://twitter.com/intent/tweet?text=${encodedText}`;
     window.open(url, '_blank'); // Opens in a new tab
  }
  
    
 



  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Daily Quote
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300 hidden md:inline">Category</span>
            <div className="flex gap-2">
              {category.map((c) => {
                return <button onClick={() => handleCategorySelect(c)} className="cursor-pointer px-3 py-1 rounded-full bg-slate-700 text-sm text-slate-100">{c}</button>
              })}
            </div>
          </div>
        </header>

        {/* Quote Card */}
        <main className="bg-gradient-to-r from-indigo-600/20 to-rose-600/10 border border-white/5 rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl font-bold">
              “
            </div>
            <div className="flex-1">
              <p className="text-lg md:text-xl leading-relaxed text-slate-100 mb-4">
                {`"${showQuote}"`}
              </p>
              <p className="text-sm md:text-base text-slate-300 font-semibold">{`— ${quoteAuthor}`}</p>
            </div>
          </div>

          {/* Quote meta + actions */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-slate-400">Source: <span className="text-slate-300">{quoteSource}</span></div>

            <div className="flex gap-3">
              <button onClick={generateQuote} className=" cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm">New Quote</button>
              <button onClick={favoriteQuote} className=" cursor-pointer px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm">Favorite</button>
              <button onClick={copyQuote} className=" cursor-pointer px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm">{copy}</button>
              <button onClick={shareToX} className=" cursor-pointer px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm">Share on X</button>
            </div>
          </div>
        </main>

        {/* Favorites / Saved */}
        <section className="mt-6">
          <h2 className="text-sm text-slate-300 mb-3 uppercase tracking-wide">Saved Quotes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {savedQuotes.map((s, i) => {
              return <div key={i} className="bg-white/3 rounded-lg p-3">
                <p className="text-sm text-slate-100">{`"${s.quote}"`}</p>
              <p className="text-xs text-slate-300 mt-2">{`— ${s.author}`}</p>
            </div>
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-6 text-center text-xs text-slate-400">
          <div>Built with ❤️ — replace this static markup with your dynamic data and handlers.</div>
        </footer>
      </div>
    </div>
  )
}

export default App