function trees(graph){
    const sources = graph.map(d=>d.source)
    const targets = graph.map(d=>d.target)
    const roots = sources.filter((e,n,I)=>I.indexOf(e)===n)
    
    const trees = roots.map(r=>({name:r, children:[]}))
    const populateTrees = (trees)=>trees.map(tree=>{
        const root = tree.name
        const children = sources
            .reduce((a,e,i)=>(e===root&&a.push(i),a),[])
            .map(i=>({name:targets[i], children:[]}))

        tree.children = children;
        
        children.map(subtree=>{
            // console.log(subtree)
            if( subtree.name && roots.includes(subtree.name)  ){
                
                return populateTrees([subtree])
            }else{
                
                    return subtree
                }
            })
        //children.forEach(subtree=>console.log(,roots.includes(subtree)))
        return tree;
    })
    //populateTrees(trees)
    // const treesEnriched = populateTrees(trees)
    // const allNodes = treesEnriched.map(tree=>{
    //     const all = 
    //     return tree
    // })
    const out = populateTrees(trees)
    return out
}
