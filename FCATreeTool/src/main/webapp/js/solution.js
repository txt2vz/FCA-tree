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

const goodAtt = 'breast';


function prune(tree, result) {
    //let result = {};
    // let childa = [];
   // console.log("treee " + JSON.stringify(tree));
   //  if (Array.isArray(result)){
   //      console.log("yes array Node "+ tree.Node + " children? " + tree.children);
   //      var b = {};
   //      b.Node = tree.Node;
   //      b.attributes = tree.attributes;
   //      result.push(b);
   //  } else {

        result.Node = tree.Node;
        result.attributes = tree.attributes;
   // }

    if (tree.children) {
     //   console.log ("tree.children " + JSON.stringify(tree.children));

        result.children =  [];// // ['C'];
       // tree.children.forEach(prune, result);
        var x=0;

         for (child of tree.children){
        //     console.log("obj ent child " +Object.entries(child))
            // console.log(" child " + JSON.stringify(child));
           //  console.log(" child.Node " + child.Node);


            // console.log("child is array " + Array.isArray(result.children[x] ));
            // console.log("child.children  child.node " + child.Node + " ? " + child.children);
     //        console.log("XON " +  JSON.stringify(  result.children[x][0]));
            // console.log("child XXXXXXXXXXXXXXXXXX  contains? " + JSON.stringify(child).includes(goodAtt) + " " + JSON.stringify(child)  )

            // if (true){//}  (JSON.stringify(child).includes(goodAtt) ) {
                 if  (JSON.stringify(child).includes(goodAtt) ) {
                 //if (result.children[])
                   //  result.children=[];

                   //  result.children[x] = [];
                 result.children[x] = {};


                 prune(child, result.children[x]);
                   //  result.children[x].push({});
                    // prune(child, result.children[x][0]);
                // }
                 x++;
             }


           //  x++;

        //     let x = prune(child, result.children);
        //     console.log("resutl " + JSON.stringify(result) + "x c " + x.Node +  " att " + x.attributes[0]);
        //     //result.children.push(x);
        //
        //     //result.children.push(prune(child, result.children));
        //    // result.children.push(child, result);
         }
    }

    return result;
}

let result = {};
let p = prune(treeData, result);

console.log("pp " + JSON.stringify(p));

const myObj = {
    "nodes": [
        {
            "id":1,
            "children":[
                {
                    "id":3,
                    "children":[
                        {"id":4, "children":[]},
                        {"id":5, "children":[{"id":6, "children":[]}]}
                    ]
                },
                {"id":2, "children":[]}
            ]
        }
    ]
}

let noteArray = Object.entries(myObj.nodes);
let pushArray = [];

for(const [noteKey, noteValue] of noteArray) {
    pushArray.push({"id": noteValue.id});

    for(const [childKey, childValue] of Object.entries(noteValue.children)) {
        pushArray.push({"id": childValue.id});

        for(const [child2Key, child2Value] of Object.entries(childValue.children)) {
            pushArray.push({"id": child2Value.id});
        }
    }
}

//console.log(JSON.stringify(pushArray));

