import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

import Logo from './Logo'

type HeaderLinkProps = Pick<LinkProps, 'href'> & {
  active?: boolean
  children: React.ReactNode
}

const routeLinks = [
  {
    label: 'Início',
    href: '/'
  },
  {
    label: 'Vendedores',
    href: '/sellers'
  },
  {
    label: 'Importar',
    href: '/transactions/import'
  }
]

const HeaderLink = ({ href, children, active }: HeaderLinkProps) => {
  const activeClassName = `after:content-[''] after:block after:w-full after:h-0.5 after:bg-lime-400`

  return (
    <li>
      <Link href={href}>
        <a className={clsx(active && activeClassName, 'inline-block relative')}>
          {children}
        </a>
      </Link>
    </li>
  )
}

const Header = () => {
  const { pathname } = useRouter()

  return (
    <header className="bg-white shadow-sm py-4 fixed w-full px-10">
      <div className="container flex w-full justify-between">
        <div>
          <Logo />
        </div>
        <nav className="flex gap-8">
          <ul>
            {routeLinks.map(({ label, href }) => (
              <HeaderLink
                href={href}
                active={pathname === href}
                key={`${label}-${href}`}
              >
                {label}
              </HeaderLink>
            ))}
          </ul>
        </nav>
        <div className="flex">
          <span>Olá, admin</span>
        </div>
      </div>
    </header>
  )
}

export default Header
