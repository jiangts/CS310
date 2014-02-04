global.setNavTreeData({
    expanded: true,
    children: [
        { text: "Dashboard", leaf: true },
        { text: 'Manage Objects', leaf: true },
        { text: 'Manage Properties', leaf: true },
        { text: "My Properties", expanded: true, children: [
            { text: "Empty Node", leaf: true}
        ] },
        { text: "User Settings", leaf: true }
    ]
});

global.loadNavTree();

Ext.define('Entre.store.NavTree', {
    storeId: 'nav-tree-store',
    root: global.getNavTreeData()
});
