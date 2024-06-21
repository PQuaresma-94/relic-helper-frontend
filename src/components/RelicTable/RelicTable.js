import "./RelicTable.css";
import { useMemo } from "react";
import { RELICDATA, RELICMATERIALIMAGES } from "../../utils/constants";
import { useTable } from "react-table";

const RelicTable = () => {
  const data = useMemo(() => RELICDATA, []);
  const columns = useMemo(() => {
    const materialColumns = Object.keys(RELICMATERIALIMAGES).map((key) => ({
      Header: (
        <img
          src={RELICMATERIALIMAGES[key]}
          alt={key}
          className="table__image"
        />
      ),
      accessor: key,
    }));

    return [
      {
        Header: "Relic Level",
        accessor: "relic",
      },
      ...materialColumns,
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="table">
      <h2 className="table__title">Relic Table</h2>
      <div className="table__container">
        <table className="table__section" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="table__header" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="table__row" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RelicTable;
