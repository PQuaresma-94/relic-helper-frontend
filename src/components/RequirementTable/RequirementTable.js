import React from "react";
import "./RequirementTable.css";
import { useMemo } from "react";
import { useTable } from "react-table";
import { RELICDATA, RELICMATERIALIMAGES } from "../../utils/constants";

/**
 * Props:
 *  - requirements: Array<{ relicTier, ... }>
 *  - currentRelics: Array<number>
 */
const RequirementsTable = ({ requirements, currentRelics }) => {
  // Helper: sum materials from relic (fromLevel+1) to relicTier
  const sumMaterialsRange = (fromLevel, toLevel) => {
    if (toLevel <= fromLevel) return {};
    const startIdx = RELICDATA.findIndex(
      (r) => r.relic === `R${fromLevel + 1}`
    );
    const endIdx = RELICDATA.findIndex((r) => r.relic === `R${toLevel}`);
    return RELICDATA.slice(startIdx, endIdx + 1).reduce((acc, curr) => {
      Object.entries(curr).forEach(([k, v]) => {
        if (k !== "relic") acc[k] = (acc[k] || 0) + v;
      });
      return acc;
    }, {});
  };

  // Aggregate needed materials across all characters
  const totalMaterialsNeeded = useMemo(() => {
    return requirements.reduce((teamAcc, char, i) => {
      const have = currentRelics[i] ?? 0;
      const need = char.relicTier;
      const delta = sumMaterialsRange(have, need);
      Object.entries(delta).forEach(([mat, qty]) => {
        teamAcc[mat] = (teamAcc[mat] || 0) + qty;
      });
      return teamAcc;
    }, {});
  }, [requirements, currentRelics]);

  // Prepare table data
  const data = useMemo(
    () =>
      Object.entries(totalMaterialsNeeded).map(([property, value]) => ({
        property,
        imageUrl: RELICMATERIALIMAGES[property],
        value,
      })),
    [totalMaterialsNeeded]
  );

  // Define columns
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
        Header: (data) =>
          // dynamic title based on completion
          data.flatRows.every((r) => r.values.value === 0)
            ? "🎉 All Set! 🎉"
            : "Needed",
        accessor: "value",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Check if all materials are zero (completed)
  const allDone = rows.length > 0 && rows.every((r) => r.values.value === 0);

  return (
    <div className="table">
      {/* Title adjusts based on completion */}
      <div className="table__title">
        {allDone
          ? "🎉 All Materials Collected! 🎉"
          : "Materials You Still Need"}
      </div>

      {allDone ? (
        <div className="table__celebration">
          <p>You’ve collected all relic materials for this team!</p>
        </div>
      ) : (
        <div className="table__container">
          <table className="table__section" {...getTableProps()}>
            <thead>
              {headerGroups.map((hg) => (
                <tr {...hg.getHeaderGroupProps()}>
                  {hg.headers.map((col) => (
                    <th {...col.getHeaderProps()} className="table__header">
                      {col.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="table__row">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequirementsTable;
