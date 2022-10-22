import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

type TableProps<TData> = {
  columns: ColumnDef<TData>[]
  data: TData[]
  isLoading?: boolean
}

const Table = <TData,>({ columns, data, isLoading }: TableProps<TData>) => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  if (isLoading) {
    return <h1>Carregando...</h1>
  }

  return (
    <table className="min-w-full">
      <thead className="border-b-[1px] border-gray-200">
        {getHeaderGroups().map((headerGroup) => (
          <tr
            className="w-1/3 text-left py-1 px-2 uppercase font-light font-mono text-sm"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {!header.isPlaceholder
                  ? flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="text-black/75">
        {getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className="w-1/3 text-left py-3 px-2" key={cell.column.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
