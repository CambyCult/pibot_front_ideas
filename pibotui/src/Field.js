import "react-tabulator/css/tabulator.css";
import { ReactTabulator } from "react-tabulator";
import "./field.css";

function Field() {
  const columns = [
    { title: "Item", field: "item", width: 300, responsive: 0 },
    { title: "Size", field: "size", widthGrow: 1, responsive: 0 },
    { title: "Stock", field: "stock", widthGrow: 1, responsive: 0 },
    { title: "reqStock", field: "reqStock", widthGrow: 1, responsive: 1 },
  ];
  var data = [
    { id: 1, item: "Nasal Cannula", size: "Adult", stock: 1, reqStock: 4 },
    { id: 2, item: "Nasal Cannula", size: "Pedi", stock: 3, reqStock: 4 },
    { id: 3, item: "Bandaids", size: 4, stock: 7, reqStock: 12 },
    { id: 4, item: "Whole-Blood", size: "O-", stock: 3, reqStock: 9 },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <ReactTabulator
            maxheight={"100%"}
            maxwidth={"75%"}
            data={data}
            columns={columns}
            layout={"fitDataFill"}
            layoutColumnsOnNewData={"true"}
            responsiveLayout={"collapse"}
            textDirection={"rtl"}
          />
        </div>
        <div className="bottom-Bar">test</div>
      </header>
    </div>
  );
}

export default Field;
