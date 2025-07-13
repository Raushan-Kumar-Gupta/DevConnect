const NavBar = () => {
  return (
    <div className="navbar bg-accent px-4 flex flex-wrap justify-between">
      {/* Left: Logo & Brand */}
      <div className="flex items-center gap-2 flex-1">
        <img
          className="h-10 w-10 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQj6NLXa_dlgM8gscTDF-c6dDDH1YH5ygG9Q&s"
          alt="DevConnect Logo"
        />
        <a className="btn btn-ghost text-xl sm:text-2xl font-bold normal-case">
          DevConnect
        </a>
      </div>

      {/* Right: Search + Avatar */}
      <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-end sm:justify-normal">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full sm:w-40 md:w-60"
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 w-52 p-2 shadow bg-base-100 rounded-box"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
