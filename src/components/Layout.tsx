import Header from './Header'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <div className="font-poppins h-screen w-screen bg-gray-100 pt-24">
      <main className="container mx-auto shadow-2xl bg-white border-[1px] border-black/20 px-14 py-11 rounded-2xl">
        {children}
      </main>
    </div>
  </>
)

export default Layout
