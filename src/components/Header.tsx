const Header = () => (
  <header className="bg-white shadow-sm py-4 fixed w-full px-10">
    <div className="container flex w-full justify-between">
      <div>
        <h1 className="text-black bg-bold uppercase font-bold">
          trans
          <span className="color-lime-400 font-extrabold border-b-2 border-lime-400">
            ações
          </span>
        </h1>
      </div>
      <nav className="flex gap-8">
        <ul>
          <a
            className="inline-block relative after:content-[''] after:block after:w-full after:h-0.5 after:bg-lime-400"
            href=""
          >
            Início
          </a>
        </ul>
        <ul>
          <a className="inline-block relative" href="">
            Vendedores
          </a>
        </ul>
        <ul>
          <a className="inline-block relative" href="">
            Importar
          </a>
        </ul>
      </nav>
      <div className="flex">
        <span>Olá, admin</span>
      </div>
    </div>
  </header>
)

export default Header
