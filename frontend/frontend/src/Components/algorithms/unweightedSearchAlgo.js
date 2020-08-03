export function unweightedSearchAlgorithm(start, target, nodesToAnimate, boardArray, name) {
    if (!start || !target || start === target) {
        return false;
    }
    let structure = [start];
    let exploredNodes = { start: true };
    while (structure.length) {
        let currentNode = name === "bfs" ? structure.shift() : structure.pop();
        nodesToAnimate.push(currentNode);
        if (name === "dfs") exploredNodes[currentNode.id] = true;
        currentNode.status = "visited";
        if (currentNode.id === target) {
            return "success";
        }
        let currentNeighbors = getNeighbors(currentNode, boardArray, name);
        currentNeighbors.forEach(neighbor => {
            if (!exploredNodes[neighbor]) {
                if (name === "bfs") exploredNodes[neighbor] = true;
                boardArray[neighbor.x][neighbor.y].previousNode = currentNode;
                structure.push(boardArray[neighbor.x][neighbor.y]);
            }
        });
    }
    return false;
}

function getNeighbors(node, boardArray, name) {
    // let coordinates = id.split("-");
    let x = node.row;
    let y = node.col;
    let neighbors = [];
    let potentialNeighbor;
    if (boardArray[x - 1] && boardArray[x - 1][y]) {
        potentialNeighbor = { x: x - 1, y: y };
        if (boardArray[x - 1][y].status !== "wall") {
            if (name === "bfs") {
                neighbors.push(potentialNeighbor);
            } else {
                neighbors.unshift(potentialNeighbor);
            }
        }
    }
    if (boardArray[x][y + 1]) {
        potentialNeighbor = { x: x, y: y + 1 };
        if (boardArray[x][y + 1].status !== "wall") {
            if (name === "bfs") {
                neighbors.push(potentialNeighbor);
            } else {
                neighbors.unshift(potentialNeighbor);
            }
        }
    }
    if (boardArray[x + 1] && boardArray[x + 1][y]) {
        potentialNeighbor = { x: x + 1, y: y };
        if (boardArray[x + 1][y].status !== "wall") {
            if (name === "bfs") {
                neighbors.push(potentialNeighbor);
            } else {
                neighbors.unshift(potentialNeighbor);
            }
        }
    }
    if (boardArray[x][y - 1]) {
        potentialNeighbor = { x: x, y: y - 1 };
        if (boardArray[x][y - 1].status !== "wall") {
            if (name === "bfs") {
                neighbors.push(potentialNeighbor);
            } else {
                neighbors.unshift(potentialNeighbor);
            }
        }
    }
    return neighbors;
}
