console.log("in getAllAttributes");

var treeData = {
    "Node": 0,
    "attributes": ["needs water to live"],
    "objects": ["corn", "bean", "dog", "reed", "water weeds", "frog", "bream", "fish leech"],
    "own_objects": [],
    "ObjectCount": "8 | 100%",

    "children": [{
        "Node": 4,
        "attributes": ["can move"],
        "objects": ["fish leech", "dog", "frog", "bream"],
        "own_objects": ["fish leech"],
        "ObjectCount": "4 | 50%",

        "children": [{
            "Node": 5,
            "attributes": ["has limbs"],
            "objects": ["bream", "frog", "dog"],
            "own_objects": ["bream", "frog", "dog"],
            "ObjectCount": "3 | 37%"
        }]
    }, {
        "Node": 3,
        "attributes": ["needs chlorophyll"],
        "objects": ["bean", "corn", "reed", "water weeds"],
        "own_objects": ["bean"],
        "ObjectCount": "4 | 50%",

        "children": [{
            "Node": 6,
            "attributes": ["monocotyledon"],
            "objects": ["water weeds", "reed", "corn"],
            "own_objects": ["water weeds", "reed", "corn"],
            "ObjectCount": "3 | 37%"
        }]
    }, {
        "Node": 2,
        "attributes": ["lives on land"],
        "objects": ["dog", "frog", "corn", "bean", "reed"],
        "own_objects": [],
        "ObjectCount": "5 | 62%",

        "children": [{
            "Node": 8,
            "attributes": ["can move", "has limbs"],
            "objects": ["frog", "dog"],
            "own_objects": ["frog"],
            "ObjectCount": "2 | 25%",

            "children": [{
                "Node": 9,
                "attributes": ["breast feeds"],
                "objects": ["dog"],
                "own_objects": ["dog"],
                "ObjectCount": "1 | 12%"
            }]
        }, {
            "Node": 7,
            "attributes": ["needs chlorophyll"],
            "objects": ["corn", "reed", "bean"],
            "own_objects": [],
            "ObjectCount": "3 | 37%",

            "children": [{
                "Node": 11,
                "attributes": ["monocotyledon"],
                "objects": ["reed", "corn"],
                "own_objects": ["reed", "corn"],
                "ObjectCount": "2 | 25%"
            }, {
                "Node": 10,
                "attributes": ["dicotyledon"],
                "objects": ["bean"],
                "own_objects": ["bean"],
                "ObjectCount": "1 | 12%"
            }]
        }]
    }, {
        "Node": 1,
        "attributes": ["lives in water"],
        "objects": ["bream", "fish leech", "water weeds", "reed", "frog"],
        "own_objects": [],
        "ObjectCount": "5 | 62%",

        "children": [{
            "Node": 14,
            "attributes": ["can move"],
            "objects": ["fish leech", "frog", "bream"],
            "own_objects": ["fish leech"],
            "ObjectCount": "3 | 37%",

            "children": [{
                "Node": 15,
                "attributes": ["has limbs"],
                "objects": ["bream", "frog"],
                "own_objects": ["bream", "frog"],
                "ObjectCount": "2 | 25%"
            }]
        }, {
            "Node": 13,
            "attributes": ["needs chlorophyll", "monocotyledon"],
            "objects": ["water weeds", "reed"],
            "own_objects": ["water weeds", "reed"],
            "ObjectCount": "2 | 25%"
        }, {
            "Node": 12,
            "attributes": ["lives on land"],
            "objects": ["frog", "reed"],
            "own_objects": [],
            "ObjectCount": "2 | 25%",

            "children": [{
                "Node": 17,
                "attributes": ["can move", "has limbs"],
                "objects": ["frog"],
                "own_objects": ["frog"],
                "ObjectCount": "1 | 12%"
            }, {
                "Node": 16,
                "attributes": ["needs chlorophyll", "monocotyledon"],
                "objects": ["reed"],
                "own_objects": ["reed"],
                "ObjectCount": "1 | 12%"
            }]
        }]
    }]
};

console.log("gtree o " + JSON.stringify(treeData[0]));


//https://stackoverflow.com/questions/56557350/how-to-process-json-tree

let attributeSet = new Set();

function getAttributessFromArray(tree) {

    if (tree.attributes) {
        for (attribute of treeData.attributes) {
            attributeSet.add(attribute);
        }
    }

    if (tree.children) {

        tree.children.forEach((node) => {

            if (node.attributes) {

                for (attribute of node.attributes) {
                    attributeSet.add(attribute);
                }
            }

            if (node.children && Array.isArray(node.children))
                getAttributessFromArray(node.children)
        })
    }
}

//getSetOfAttributes(treeData.children);
getAttributessFromArray(treeData);
// for (attribute of treeData.attributes) {
//     attributeSet.add(attribute);
// }

//attributeSet.add(treeData.attributes);

console.log("attset " + [...attributeSet].join(' ')
);
//console.log("set is: " + new Array(...attributeSet).join(', '));

const userAttribute = "can move";
//let userAttribute = "needs water to live";
//let userAttribute = "lives on land";

function checkAttribute(att) {
    return att == userAttribute;
}

function checkNodeArray(nda) {
    return nda.attributes.some(checkAttribute);
}

function hasDescendantAttribute(tree) {

    if (tree.attributes) {
        if (tree.attributes.some(checkAttribute)) return true;
    }

    if (tree.children) {
        if (tree.children.some(checkNodeArray)) {
            return true
        }
        return hasDescendantAttribute(tree.children)
    }
    return false;
}

let y = hasDescendantAttribute(treeData[0]);
//console.log('y ' + y);

//https://stackoverflow.com/questions/62254418/how-to-delete-prune-all-tree-nodes-where-the-nodes-do-not-exist-in-a-separate

// function filter(tree) {
//     let output = [];
//     for (i in tree) {
//         //if(list.indexOf(tree[i].attributes[0]) >= 0){
//         //   console.log("i " + i + " Stringify " + JSON.stringify(tree[i]));
//         //   console.log("tf " + (JSON.stringify(tree[i])).includes('can move'));
//        // console.log(" tree[ " + i + "].attributes[0] " + tree[i].attributes[0] + " " + tree[i].attributes[0].includes('land'));
//         console.log("childeren? " + tree[i].children);
//
//         if (tree[i].attributes[0].includes('a') ) {
//
//
//             // if ( (JSON.stringify(tree[i])).includes('can move')){
//
//             // console.log ("treei " + JSON.stringify(tree[i]));
//           //    if (true){
//             // if(hasAttributeOrDescendantAttribute(tree[i])){
//             //   console.log("FOUNDDDDD DONE ");
//             tree[i].children = filter(tree[i].children);
//             output.push(tree[i]);
//         } else {
//             //   console.log("NOT FOUND ");
//             output = output.concat(filter(tree[i].children));
//         }
//     }
//     return output;
// }
function filter(tree) {
    let output = [];
    for (i in tree) {
        //if(list.indexOf(tree[i].attributes[0]) >= 0){
        //   console.log("i " + i + " Stringify " + JSON.stringify(tree[i]));
        //   console.log("tf " + (JSON.stringify(tree[i])).includes('can move'));
        // console.log(" tree[ " + i + "].attributes[0] " + tree[i].attributes[0] + " " + tree[i].attributes[0].includes('land'));
        //   console.log("childeren? " + tree[i].children);

        if (tree[i].attributes[0].includes('a')) {


            // if ( (JSON.stringify(tree[i])).includes('can move')){

            // console.log ("treei " + JSON.stringify(tree[i]));
            //    if (true){
            // if(hasAttributeOrDescendantAttribute(tree[i])){
            //   console.log("FOUNDDDDD DONE ");
            tree[i].children = filter(tree[i].children);
            output.push(tree[i]);
        } else {
            //   console.log("NOT FOUND ");
            output = output.concat(filter(tree[i].children));
        }
    }
    return output;
}

var cnt = filter(treeData);


console.log("cnt " + JSON.stringify(cnt));

// my q https://stackoverflow.com/questions/62344025/prune-json-tree-with-javascript
//
// let whitelist = ['can move', 'has legs'];
// const prunedNode = nodev => {
//     //const pruned = whitelist.includes(nodev.attributes[0]) ? nodev : null;
//     const pruned = nodev.attributes[0] == 'can move' ? nodev : null;
//
//     if (pruned) {
//    // if (nodev.attributes &&   nodev.attributes[0] == 'can move'){
//         nodev.children = nodev.children.reduce((prunedChildren, child) => {
//             const prunedChildNode = prunedNode(child);
//             if (prunedChildNode) {
//                 prunedChildren.push(prunedChildNode);
//             }
//             return prunedChildren;
//         }, []);
//     }
//
//     return pruned;
// };
//
// console.log(  "zzz! !" + prunedNode(treeData));

var x = treeData[0]

console.log(" x " + JSON.stringify(x));


function prune(tree, result) {
    //let result = {};
    // let childa = [];

    result.Node = tree.Node;
    result.attributes = tree.attributes;

    if (tree.children) {
        result.children = [];
        tree.children.forEach(prune, result);
        // for (child of tree.children){
        //     let x = prune(child, result.children);
        //     console.log("resutl " + JSON.stringify(result) + "x c " + x.Node +  " att " + x.attributes[0]);
        //     //result.children.push(x);
        //
        //     //result.children.push(prune(child, result.children));
        //    // result.children.push(child, result);
        // }
    }

    return result;
}

let result = {};
let p = prune(treeData, result);

//console.log("p is  ");
//console.log(JSON.stringify(p));

function getPartsW(array, leafes) {
    var result = [];
    array.forEach(o => {
        var children;
        if (leafes.includes(o.attributes[0])) {
            result.push(o);
            return;
        }
        if (o.children) {
            children = getPartsW(o.children, leafes);
            if (children.length) {
                result.push(Object.assign({}, o, {children}));
            }
        }
    });
    return result;
}

var atts = ['can move', '0-1-0-1', '0-1-0-2'];

var pruned2 = getPartsW(treeData, atts);

console.log("helo");
console.log("pruned2 " + JSON.stringify(pruned2));


//https://stackoverflow.com/questions/55090371/create-a-pruned-copy-of-tree-in-javascript
// function getParts(array, leafes) {
//     var result = [];
//     array.forEach(o => {
//         var children;
//         if (leafes.includes(o.key)) {
//             result.push(o);
//             return;
//         }
//         children = getParts(o.children, leafes);
//         if (children.length) {
//             result.push(Object.assign({}, o, {children}));
//         }
//     });
//     return result;
// }

const
    treeData2 = [{
        title: '0-0',
        key: '0-0',
        children: [{
            title: '0-0-0',
            key: '0-0-0',
            children: [{title: '0-0-0-0', key: '0-0-0-0', children: []}, {
                title: '0-0-0-1',
                key: '0-0-0-1',
                children: []
            }, {title: '0-0-0-2', key: '0-0-0-2', children: []}]
        }, {
            title: '0-0-1',
            key: '0-0-1',
            children: [{title: '0-0-1-0', key: '0-0-1-0', children: []}, {
                title: '0-0-1-1',
                key: '0-0-1-1',
                children: []
            }, {title: '0-0-1-2', key: '0-0-1-2', children: []}]
        }, {title: '0-0-2', key: '0-0-2', children: []}]
    }, {
        title: '0-1',
        key: '0-1',
        children: [{title: '0-1-0-0', key: '0-1-0-0', children: []}, {
            title: '0-1-0-1',
            key: '0-1-0-1',
            children: []
        }, {title: '0-1-0-2', key: '0-1-0-2', children: []}]
    }, {title: '0-2', key: '0-2', children: []}],

    leafNodes = ['0-0-1-2', '0-1-0-1', '0-1-0-2'];
//  pruned = getParts(treeData2, leafNodes);

//console.log("pruned " + JSON.stringify(pruned));

var sitePersonel = {};
var employees = []
sitePersonel.z = "ho";
sitePersonel.employees = employees;

//console.log(sitePersonel);

var firstName = "John";
var lastName = "Smith";
var employee = {
    "firstName": firstName,
    "lastName": lastName
}
sitePersonel.employees.push(employee);
//console.log(sitePersonel);

var manager = "Jane Doe";
sitePersonel.employees[0].manager = manager;
//console.log(sitePersonel);

//console.log(JSON.stringify(sitePersonel));