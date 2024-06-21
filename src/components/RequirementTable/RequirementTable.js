import "./RequirementTable.css";
import { useMemo } from "react";
import { RELICDATA, RELICMATERIALIMAGES } from "../../utils/constants";
import { useTable } from "react-table";

const RequirementsTable = ({ requirements }) => {
  const relicTierArray = requirements.map((char) => char.relicTier);

  const sumMaterialsForRelicLevel = (relicLevel) => {
    const index = RELICDATA.findIndex(
      (relic) => relic.relic === `R${relicLevel}`
    );

    return RELICDATA.slice(0, index + 1).reduce((acc, curr) => {
      Object.keys(curr).forEach((key) => {
        if (key !== "relic") {
          acc[key] = (acc[key] || 0) + curr[key];
        }
      });
      return acc;
    }, {});
  };

  const totalMaterials = relicTierArray.reduce((totalAcc, relicLevel) => {
    const materialsForLevel = sumMaterialsForRelicLevel(relicLevel);
    Object.keys(materialsForLevel).forEach((key) => {
      totalAcc[key] = (totalAcc[key] || 0) + materialsForLevel[key];
    });
    return totalAcc;
  }, {});

  const data = useMemo(
    () =>
      Object.keys(totalMaterials).map((key) => ({
        property: key,
        imageUrl: RELICMATERIALIMAGES[key],
        value: totalMaterials[key],
      })),
    [totalMaterials]
  );

  // Setting up the columns
  const columns = useMemo(
    () => [
      {
        Header: "Relic Material",
        accessor: "property",
        Cell: ({ row }) => (
          <img
            src={row.original.imageUrl}
            alt={row.original.property}
            className="table__image"
          />
        ),
      },
      {
        Header: "Total",
        accessor: "value",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="table">
      <div className="table__title">Requirements Table</div>
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

export default RequirementsTable;
