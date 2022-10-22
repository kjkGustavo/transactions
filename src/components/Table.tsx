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
    <table className="w-full table-auto border-collapse">
      <thead className="border-b-2 border-gray-300">
        {getHeaderGroups().map((headerGroup) => (
          <tr
            className="w-1/3 text-left uppercase font-light font-mono text-sm"
            key={headerGroup.id}
          >
            {headerGroup.headers.map((header) => (
              <th className="pb-3" key={header.id}>
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
      <tbody className="text-black">
        {getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className="w-1/3 text-left py-3" key={cell.column.id}>
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
