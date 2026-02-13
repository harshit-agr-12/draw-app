import { Navbar } from "@/components/Navbar";
import Link  from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-600">Real-time collaboration</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
              Collaborative
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                WhiteBoard Canvas
              </span>
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-500 font-light italic mb-4">
              Ideas shouldn't wait for a refresh.
            </p>
            
            {/* Description */}
            <p className="max-w-2xl text-lg text-gray-600 mb-12 leading-relaxed">
              A high-performance, collaborative whiteboard for developers and designers. 
              <span className="block mt-2 font-medium text-gray-800">
                Bridge the gap between "rough draft" and "final build."
              </span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link 
                href="/signup" 
                className="group px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5"
              >
                Start Creating
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link 
                href="/signin" 
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
            
            {/* Canvas Preview Mockup */}
            <div className="relative w-full max-w-4xl">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-gray-500 font-medium">
                    canvas/room-42
                  </div>
                </div>
                {/* Canvas Area */}
                <div className="relative h-64 md:h-80 bg-white p-8">
                  {/* Decorative shapes */}
                  <div className="absolute top-8 left-8 w-32 h-20 rounded-lg border-2 border-blue-400 bg-blue-50/50"></div>
                  <div className="absolute top-16 left-48 w-24 h-24 rounded-full border-2 border-purple-400 bg-purple-50/50"></div>
                  <div className="absolute bottom-12 right-12 w-40 h-16 rounded-lg border-2 border-green-400 bg-green-50/50"></div>
                  <svg className="absolute top-24 left-32" width="100" height="60">
                    <path d="M0 30 Q50 0 100 30" stroke="#f97316" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                  </svg>
                  {/* Cursor indicators */}
                  <div className="absolute top-20 right-32 flex items-center gap-1">
                    <div className="w-4 h-4 border-l-2 border-t-2 border-indigo-500 -rotate-45"></div>
                    <span className="px-2 py-0.5 bg-indigo-500 text-white text-xs rounded-md">Alex</span>
                  </div>
                  <div className="absolute bottom-20 left-56 flex items-center gap-1">
                    <div className="w-4 h-4 border-l-2 border-t-2 border-pink-500 -rotate-45"></div>
                    <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-md">Sam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">Real-time sync with zero lag. Your strokes appear instantly for everyone in the room.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">True Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">See cursors, selections, and edits from your team in real-time. Work together seamlessly.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 text-green-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Shapes</h3>
              <p className="text-gray-600 leading-relaxed">Rectangles, circles, arrows, freehand - all the tools you need to express your ideas.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>Built with ❤️ for creative minds</p>
        </div>
      </footer>
    </div>
  );
}
