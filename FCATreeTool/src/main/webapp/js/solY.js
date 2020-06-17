console.log("in solY");

const treeData = {
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

console.log("json tree: " + JSON.stringify(treeData[0]));

//let attributeSet = new Set();

function getSetOfAttributes(tree, attSet) {

    if (tree.attributes) {
        tree.attributes.forEach(attr => {attSet.add(attr)});
    }

    if (tree.children) {
        tree.children.forEach(child =>
            getSetOfAttributes(child , attSet));
    }
    return attSet;
}

const z = getSetOfAttributes(treeData,  new Set());
console.log("Attribute set z2 " + [...z].join(', ')  + " sZIE IS " + z.size);


//const userAttribute = "breast feeds";

function hasAttributeOrDescendantAttribute(tree) {
  //  console.log("att down " + $("#attributeDropdown").val());
    if (tree.attributes) {
        if (tree.attributes.some(attr => attr == $("#attributeDropdown option:selected").text() ))
            return true;
    }

    if (tree.children) {
        if (tree.children.some(hasAttributeOrDescendantAttribute)) return true;

    }
    return false;
}

function prune(tree, result) {

//    console.log("prunnng " + userAttribute);

    result.Node = tree.Node;
    result.attributes = tree.attributes;
    result.objects = tree.objects;
    result.ObjectCount = tree.ObjectCount;
    result.own_objects = tree.own_objects;

    if (tree.children) {

        result.children = [];

        for (child of tree.children) {

            if (hasAttributeOrDescendantAttribute(child)) {
                result.children.push({});
                prune(child, result.children[result.children.length - 1]);
            }
        }
    }

    return result;
}

let p = prune(treeData, {});

console.log("pp " + JSON.stringify(p));


