function readData() {
    var url = "./data.xlsx";
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function (e) {
        var work_book = XLSX.read(req.response);
        var sheet_name = work_book.SheetNames;

        var sheet_data = XLSX.utils.sheet_to_json(
            work_book.Sheets[sheet_name[0]],
            { header: 1 }
        );

        if (sheet_data.length > 1) {
            sheet_data.shift();
            sheet_data.sort(function (a, b) {
                if (a[0] != b[0]) {
                    return a[0] - b[0];
                } else {
                    return a[2] - b[2];
                }
            });
            var table_output = "";

            for (var row = 0; row < sheet_data.length; row++) {
                table_output += `<tr>
                <th scope="row">${row + 1}</th>
                <td>${sheet_data[row][0]}</td>
                <td>
                    <a href="${sheet_data[row][3]}" target="_blank"><img
                        height="100px"
                        src="${sheet_data[row][1]}"
                        alt="${sheet_data[row][2]}"
                        title="${sheet_data[row][2]}"
                        onerror="this.src='default.png';"
                    /></a>
                </td>
                <td>${sheet_data[row][2]}</td>
                <td>
                    <a
                        href="${sheet_data[row][3]}"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Link</a
                    >
                </td>
            </tr>
            `;
            }
            console.log(table_output);
            $("#table_data").html(table_output);
        }
    };
    req.send();
}

$(document).ready(function () {
    readData();
});
