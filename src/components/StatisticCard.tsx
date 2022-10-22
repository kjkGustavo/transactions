import clsx from 'clsx'

type StatisticCardProps = {
  title: string
  value: string
  important?: boolean
}

const StatisticCard = ({ title, value, important }: StatisticCardProps) => (
  <div
    className={clsx(
      important && 'bg-lime-900',
      !important && 'bg-zinc-100',
      'rounded-md px-4 py-2'
    )}
  >
    <span
      className={clsx(
        important && 'text-white',
        !important && 'text-black',
        'text-sm'
      )}
    >
      {title}
    </span>
    <h5 className={clsx(important && 'text-lime-400', 'font-semibold text-xl')}>
      {value}
    </h5>
  </div>
)

export default StatisticCard
