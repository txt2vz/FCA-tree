
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




