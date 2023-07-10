/** @type {import('ag-grid-community').GridOptions} */

const athleteData = [
  {
    checkboxSelection: true,
    width: 50,
  },
  { field: 'name' },
  // Using dot notation to access nested property
  { field: 'medals.gold', headerName: 'Gold' },
  // Show default header name
  { field: 'person.age' }
];

const gridOptions = {
  columnDefs: athleteData,
  rowData: getData(),

  defaultColDef: {
    cellRendererSelector: (params) => {
      if (params.node.rowPinned) {
        return {
          component: CustomPinnedRowRenderer,
          params: {
            style: { color: "blue" },
          },
        };
      }
    },
  },

  getRowStyle: (params) => {
    if (params.node.rowPinned) {
      return { fontWeight: "bold" };
    }
  },
  rowSelection: "multiple",

  rowMultiSelectWithClick: true,
  onSelectionChanged: onSelectionChanged,
};

function onSelectionChanged() {
  // var result = [];
  // const selectedRows = gridOptions.api.getSelectedRows();
  // result.push(selectedRows);
  // gridOptions.api.setPinnedTopRowData(result);
  // console.log(result);
  const selectedRows = gridOptions.api.getSelectedRows();
  const pinnedRows = gridOptions.api.getPinnedTopRowCount();
  if (selectedRows.length > pinnedRows) {
    // Add newly selected rows to the top
    const newPinnedRows = selectedRows.slice(pinnedRows);
    console.log(newPinnedRows);
    gridOptions.api.setPinnedTopRowData(newPinnedRows);
  } else if (selectedRows.length < pinnedRows) {
    // Remove deselected rows from the top
    const removedPinnedRows = gridOptions.api.getPinnedTopRowData().slice(selectedRows.length);
    gridOptions.api.removePinnedTopRowData(removedPinnedRows);
  }
 



}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //   .then((response) => response.json())
  //   .then((data) => gridOptions.api.setRowData(data));
});
