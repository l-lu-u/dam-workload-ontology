//////* REVISION *//////
// a stack-based approach to process nodes iteratively instead of recursively
function trees(graph) {
    const adjacencyList = {};
    graph.forEach(({ source, target }) => {
        if (!adjacencyList[source]) adjacencyList[source] = [];
        adjacencyList[source].push(target);
    });

    const roots = [...new Set(graph.map(d => d.source))];

    function buildTreeIteratively(root) {
        const stack = [{ node: { name: root, children: [] }, visited: new Set() }];
        const rootNode = stack[0].node;

        while (stack.length > 0) {
            const { node, visited } = stack.pop();
            if (visited.has(node.name)) continue; // no cycles
            visited.add(node.name);

            if (adjacencyList[node.name]) {
                adjacencyList[node.name].forEach(childName => {
                    if (!visited.has(childName)) {
                        const childNode = { name: childName, children: [] };
                        node.children.push(childNode);
                        stack.push({ node: childNode, visited });
                    }
                });
            }
        }
        return rootNode;
    }

    return roots.map(root => buildTreeIteratively(root));
}