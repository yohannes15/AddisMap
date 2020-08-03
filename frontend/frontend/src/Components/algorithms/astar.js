export function astar(start, target, nodesToAnimate, boardArray, name) {
    if (!start || !target || start === target) {
        return false;
    }
    boardArray[start.row][start.col].distance = 0;
    boardArray[start.row][start.col].totalDistance = 0;
    boardArray[start.row][start.col].direction = "up";

    let unvisitedNodes = [];
    boardArray.forEach((rows, rowNum) => {
        rows.forEach((cols, colNum) => {
            unvisitedNodes.push(cols);
        });
    });

    while (unvisitedNodes.length) {
        let currentNode = closestNode(boardArray, unvisitedNodes);
        while (currentNode.status === "wall" && unvisitedNodes.length) {
            currentNode = closestNode(boardArray, unvisitedNodes);
        }
        if (currentNode.distance === Infinity) {
            return false;
        }
        nodesToAnimate.push(currentNode);
        currentNode.status = "visited";
        if (currentNode.id === target.id) {
            return "success!";
        }
        updateNeighbors(currentNode, boardArray, target);
    }
}

function closestNode(boardArray, unvisitedNodes) {
    let currentClosest, index;
    for (let i = 0; i < unvisitedNodes.length; i++) {
        const node = boardArray[unvisitedNodes[i].row][unvisitedNodes[i].col];
        if (!currentClosest || currentClosest.totalDistance > node.totalDistance) {
            currentClosest = node;
            index = i;
        } else if (currentClosest.totalDistance === node.totalDistance) {
            if (currentClosest.heuristicDistance > node.heuristicDistance) {
                currentClosest = node;
                index = i;
            }
        }
    }
    unvisitedNodes.splice(index, 1);
    return currentClosest;
}

function updateNeighbors(node, boardArray, target) {
    let neighbors = getNeighbors(node, boardArray);
    for (let neighbor of neighbors) {
        if (target) {
            updateNode(node, boardArray, neighbor, target);
        } else {
            updateNode(node, boardArray[neighbor.x][neighbor.y]);
        }
    }
}

function updateNode(currentNode, boardArray, targetNode, actualTargetNode) {
    let distance = getDistance(currentNode, boardArray[targetNode.x][targetNode.y]);
    if (!boardArray[targetNode.x][targetNode.y].heuristicDistance) {
        boardArray[targetNode.x][targetNode.y].heuristicDistance = manhattanDistance(boardArray[targetNode.x][targetNode.y], actualTargetNode);
    }
    let distanceToCompare = currentNode.distance + boardArray[targetNode.x][targetNode.y].weight + distance[0];
    if (distanceToCompare < boardArray[targetNode.x][targetNode.y].distance) {
        boardArray[targetNode.x][targetNode.y].distance = distanceToCompare;
        boardArray[targetNode.x][targetNode.y].totalDistance = boardArray[targetNode.x][targetNode.y].distance + boardArray[targetNode.x][targetNode.y].heuristicDistance;
        boardArray[targetNode.x][targetNode.y].previousNode = currentNode;
        boardArray[targetNode.x][targetNode.y].path = distance[1];
        boardArray[targetNode.x][targetNode.y].direction = distance[2];
    }
}

function getNeighbors(node, boardArray) {
    let x = node.row;
    let y = node.col;
    let neighbors = [];
    let potentialNeighbor;
    if (boardArray[x - 1] && boardArray[x - 1][y]) {
        potentialNeighbor = { x: x - 1, y: y };
        if (boardArray[x - 1][y].status !== "wall") neighbors.push(potentialNeighbor);
    }
    if (boardArray[x + 1] && boardArray[x + 1][y]) {
        potentialNeighbor = { x: x + 1., y: y };
        if (boardArray[x + 1][y].status !== "wall") neighbors.push(potentialNeighbor);
    }
    if (boardArray[x][y - 1]) {
        potentialNeighbor = { x: x, y: y - 1 };
        if (boardArray[x][y - 1].status !== "wall") neighbors.push(potentialNeighbor);
    }
    if (boardArray[x][y + 1]) {
        potentialNeighbor = { x: x, y: y + 1 };
        if (boardArray[x][y + 1].status !== "wall") neighbors.push(potentialNeighbor);
    }
    return neighbors;
}


function getDistance(nodeOne, nodeTwo) {
    let x1 = nodeOne.row;
    let y1 = nodeOne.col;
    let x2 = nodeTwo.row;
    let y2 = nodeTwo.col;
    if (x2 < x1 && y1 === y2) {
        if (nodeOne.direction === "up") {
            return [1, ["f"], "up"];
        } else if (nodeOne.direction === "right") {
            return [2, ["l", "f"], "up"];
        } else if (nodeOne.direction === "left") {
            return [2, ["r", "f"], "up"];
        } else if (nodeOne.direction === "down") {
            return [3, ["r", "r", "f"], "up"];
        } else if (nodeOne.direction === "up-right") {
            return [1.5, null, "up"];
        } else if (nodeOne.direction === "down-right") {
            return [2.5, null, "up"];
        } else if (nodeOne.direction === "up-left") {
            return [1.5, null, "up"];
        } else if (nodeOne.direction === "down-left") {
            return [2.5, null, "up"];
        }
    } else if (x2 > x1 && y1 === y2) {
        if (nodeOne.direction === "up") {
            return [3, ["r", "r", "f"], "down"];
        } else if (nodeOne.direction === "right") {
            return [2, ["r", "f"], "down"];
        } else if (nodeOne.direction === "left") {
            return [2, ["l", "f"], "down"];
        } else if (nodeOne.direction === "down") {
            return [1, ["f"], "down"];
        } else if (nodeOne.direction === "up-right") {
            return [2.5, null, "down"];
        } else if (nodeOne.direction === "down-right") {
            return [1.5, null, "down"];
        } else if (nodeOne.direction === "up-left") {
            return [2.5, null, "down"];
        } else if (nodeOne.direction === "down-left") {
            return [1.5, null, "down"];
        }
    }
    if (y2 < y1 && x1 === x2) {
        if (nodeOne.direction === "up") {
            return [2, ["l", "f"], "left"];
        } else if (nodeOne.direction === "right") {
            return [3, ["l", "l", "f"], "left"];
        } else if (nodeOne.direction === "left") {
            return [1, ["f"], "left"];
        } else if (nodeOne.direction === "down") {
            return [2, ["r", "f"], "left"];
        } else if (nodeOne.direction === "up-right") {
            return [2.5, null, "left"];
        } else if (nodeOne.direction === "down-right") {
            return [2.5, null, "left"];
        } else if (nodeOne.direction === "up-left") {
            return [1.5, null, "left"];
        } else if (nodeOne.direction === "down-left") {
            return [1.5, null, "left"];
        }
    } else if (y2 > y1 && x1 === x2) {
        if (nodeOne.direction === "up") {
            return [2, ["r", "f"], "right"];
        } else if (nodeOne.direction === "right") {
            return [1, ["f"], "right"];
        } else if (nodeOne.direction === "left") {
            return [3, ["r", "r", "f"], "right"];
        } else if (nodeOne.direction === "down") {
            return [2, ["l", "f"], "right"];
        } else if (nodeOne.direction === "up-right") {
            return [1.5, null, "right"];
        } else if (nodeOne.direction === "down-right") {
            return [1.5, null, "right"];
        } else if (nodeOne.direction === "up-left") {
            return [2.5, null, "right"];
        } else if (nodeOne.direction === "down-left") {
            return [2.5, null, "right"];
        }
    }
}

function manhattanDistance(nodeOne, nodeTwo) {
    let xOne = nodeOne.row;
    let xTwo = nodeTwo.row;
    let yOne = nodeOne.col;
    let yTwo = nodeTwo.col;

    let xChange = Math.abs(xOne - xTwo);
    let yChange = Math.abs(yOne - yTwo);

    return (xChange + yChange);
}

export function getNodesInShortestPathOrderAStar(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    if (nodesInShortestPathOrder.length === 1) {
        return [];
    }
    return nodesInShortestPathOrder;
}

function animateShortestPath(nodesInShortestPathOrder, afterDoneCallback) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            const addClass = ['shortest-path'];

            if (node.isStart) {
                addClass.push('shortest-path-start');
            }

            if (node.isFinish) {
                addClass.push('shortest-path-finish');
            }

            document.getElementById(`node-${node.row}-${node.col}`).classList.add(...addClass);
            if (i === nodesInShortestPathOrder.length - 1) {
                afterDoneCallback();
            }
        }, 50 * i);
    }
}

export function animateAStar(visitedNodesInOrder, nodesInShortestPathOrder, afterDoneCallback) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder, afterDoneCallback);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).classList.add('visited');
        }, 10 * i);
    }
}
