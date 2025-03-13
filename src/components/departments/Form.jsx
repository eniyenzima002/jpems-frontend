const Form = () => {
    <div className="flex flex-col justify-center items-center gap-7 py-16">
            <div className="w-full md:w-1/2 m-auto border-b">
                <h2 className="pb-2">Hi <span className="capitalize"></span></h2>
                <h2>Role: <span className="text-sm text-yellow-400"></span></h2>
                <p className="text-sm font-light py-2">Welcome to your profile - details and settings</p>
            </div>
            <div className="w-full md:w-1/2 m-auto mt-12">Please, update profile.</div>
            <form
                className="w-full md:w-1/2 m-auto shadow-2xl"
            >
                
                <div className="pb-4">
                    <div className="pb-2 text-sm">Username</div>
                    <input 
                        type="text"
                        placeholder="Enter username..."
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <div className="pb-4">
                <div className="pb-2 text-sm">Email</div>
                    <input 
                        type="email"
                        placeholder="Enter email..."
                        required
                        className="w-full bg-transparent px-2 text-sm h-10 focus:outline-none rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <div className="pb-4">
                <div className="pb-2 text-sm">Password</div>
                    <input 
                        type="password" 
                        placeholder="Enter password..."
                        required
                        className="w-full bg-transparent px-2 text-sm focus:outline-none h-10 rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <div className="pb-4">
                <div className="pb-2 text-sm">Confirm Password</div>
                    <input 
                        type="password" 
                        placeholder="Confirm password..."
                        required
                        className="w-full bg-transparent px-2 text-sm focus:outline-none h-10 rounded-lg border-2 border-slate-500 shadow-2xl shadow-teal-700"
                    />
                </div>

                <button
                    type="submit"
                    className="border-2 border-slate-500 w-full p-1 rounded-lg text-slate-400 text-lg shadow-2xl shadow-teal-700"
                > 
                </button>

            </form>
        </div>
}
export default Form