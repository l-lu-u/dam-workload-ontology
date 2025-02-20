function trees(graph) {
    const sources = graph.map(d => d.source);
    const targets = graph.map(d => d.target);
    const roots = sources.filter((e, n, I) => I.indexOf(e) === n);

    const trees = roots.map(r => ({ name: r, children: [] }));
    
    const populateTrees = (trees, visited = new Set()) => trees.map(tree => {
        const root = tree.name;

        if (visited.has(root)) return tree; // prevent infinite recursion
        visited.add(root);

        const children = sources
            .reduce((a, e, i) => (e === root && a.push(i), a), [])
            .map(i => ({ name: targets[i], children: [] }));

        tree.children = children;

        children.forEach(subtree => {
            if (subtree.name && roots.includes(subtree.name)) {
                populateTrees([subtree], visited); // recursive call with visited tracking
            }
        });

        return tree;
    });

    return populateTrees(trees);
}