import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center">
          {/* Header Section */}
          <div className="mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
              Welcome
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
              Choose your destination to continue your journey
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* FCIALL Card */}
            <Link
              to="/fci"
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-blue-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-200 transition-colors duration-300">
                  <ExternalLink className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  FCI
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Access the FCI platform and explore its comprehensive features
                </p>
                
                <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-200">
                  <span>Continue to FCI</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
            <Link
              to="/fciall"
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-yellow-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-yellow-200 transition-colors duration-300">
                  <ExternalLink className="w-8 h-8 text-yellow-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  FCIALL
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Access the FCIALL platform and explore its comprehensive features
                </p>
                
                <div className="inline-flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700 transition-colors duration-200">
                  <span>Continue to FCIALL</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>

            {/* OKSS Card */}
            <Link
              to="/okss"
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-teal-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-teal-200 transition-colors duration-300">
                  <ExternalLink className="w-8 h-8 text-teal-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  OKSS
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Navigate to the OKSS system and manage your operations
                </p>
                
                <div className="inline-flex items-center text-teal-600 font-semibold group-hover:text-teal-700 transition-colors duration-200">
                  <span>Continue to OKSS</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="text-sm text-slate-500">
            <p>Select an option above to proceed to your desired destination</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;