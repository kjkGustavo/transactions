import NextLink, { LinkProps as NextLinkProps } from 'next/link'

type LinkProps = NextLinkProps & {
  children: React.ReactNode
}

const Action = ({ children, ...props }: LinkProps) => (
  <NextLink {...props}>
    <a className="bg-lime-400 border-lime-500 border hover:bg-lime-300 transition-all duration-300 font-light px-4 py-2 leading-4 rounded-md text-sm box-border">
      {children}
    </a>
  </NextLink>
)

export default Action
