async function traverse(startNode, endNode) {

  async function createDelay(timeOut) {
    await new Promise(resolve => setTimeout(resolve, timeOut));
  }

  let numArrStart = startNode.substring(5).split("-");
  let startPos = {
    row: parseInt(numArrStart[0]),
    col: parseInt(numArrStart[1]),
  };
  let queue = [];
  queue.push(startPos);
  let parentForCell = {};

  while (queue.length > 0) {
    let { row, col } = queue.shift();
    if (`cell-${row}-${col}` === endNode) {
      break;
    }
    let neighbours = [
      { row: row - 1, col: col },
      { row: row, col: col + 1 },
      { row: row + 1, col: col },
      { row: row, col: col - 1 },
    ];



    let delay = parseInt($('input[name="speed"]:checked').val());
    console.log("delay = ", delay);

    for (let i = 0; i < neighbours.length; ++i) {

      await createDelay(delay);

      let nRow = neighbours[i].row;
      let nCol = neighbours[i].col;

      if (nRow < 0 || nRow > $("#rows").val() - 1) {
        continue;
      }
      if (nCol < 0 || nCol > $("#columns").val() - 1) {
        continue;
      }
      if ($(`#cell-${nRow}-${nCol}`).hasClass("obstacle")) {
        continue;
      }

      let cell = `cell-${nRow}-${nCol}`;
      if ($("#" + cell).hasClass("visited")) {
        continue;
      }
      parentForCell[cell] = {
        key: `cell-${row}-${col}`,
      };

      $("#" + cell).addClass("visited");
      queue.push(neighbours[i]);

    }
    // console.log(queue);
  }
  let path = [];
  let current = endNode;

  while (current !== startNode) {
    path.push(current);
    current = parentForCell[current].key;
  }
  path.forEach((element) => {
    setTimeout(() => {
      $("#" + element).addClass("path");
    }, 1000);
  });
}

$(() => {
  $("#startAlgorithm").on("click", () => {
    $(".grid").addClass("stopInteractions");
    let startNode = $(".start").attr("id");
    let endNode = $(".end").attr("id");
    traverse(startNode, endNode);
  });
});