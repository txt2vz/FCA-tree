
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

function hasAttributeOrDescendantAttribute(tree) {
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
function getObjectStringForAttributeSelect(d) {

    let objString = '';
    let isInternalNode = false;

    if (d.children) {
        isInternalNode = d.children.length > 0
    } else if (d._children) {
        isInternalNode = d._children.length > 0
    }

    if (isInternalNode) {
        objStr = d.own_objects.toString();

    } else {

        let objectSet = new Set(d.own_objects);
        d.objects.forEach(item => objectSet.add(item));

        for (let item of objectSet) {
            objString = objString + item + ", ";
        }
        console.log("node " + d.Node + " objectSet " + objectSet.size + " objString " + objString);
    }
    return objStr;
}




