function populateAttributeDropdown(attributeSet) {

    let attributes = Array.from(attributeSet).sort();
    attributes.unshift('none');
    $('#attributeDropdown').empty().trigger("change");

    $("#attributeDropdown").select2({
        data: attributes,
        width: '15%'
    });

    $("#attSelectSpan").show();
}

function getAllParentalAttributes(d) {
    if (d.parent) {
        return getAllParentalAttributes(d.parent) + ', ' + d.attributes.toString();
    } else {
        return d.attributes.toString();
    }
}

function getAllOwnObjectsFromChildren(d, objectSet, rootN) {

    const c = (rootN) ? d._children : d.children;

    let isInternalNode = false;

    if (d.children) {
        isInternalNode = d.children.length > 0
    } else if (d._children) {
        isInternalNode = d._children.length > 0
    }

    if (isInternalNode) {

        if (c) {
            for (child of c) {

                if (child.own_objects) {
                    d.own_objects.forEach(obj => objectSet.add(obj));
                }
                getAllOwnObjectsFromChildren(child, objectSet, false);
            }
        } else {
            if (d.own_objects) {
                d.own_objects.forEach(obj => objectSet.add(obj));
            }
        }
    }
    else {
        if (d.objects) {
            d.objects.forEach(obj => objectSet.add(obj));
        }
    }
}

function getSetOfAttributes(tree, attSet) {

    if (tree.attributes) {
        tree.attributes.forEach(attr => {
            attSet.add(attr)
        });
    }

    if (tree.children) {
        tree.children.forEach(child =>
            getSetOfAttributes(child, attSet));
    }
    return attSet;
}

function hasAttributeOrDescendantAttribute(tree) {
    if (tree.attributes) {
        if (tree.attributes.some(attr => attr == $("#attributeDropdown option:selected").text()))
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

        if (d._children)
            return d.objects.sort();
        else
            return d.own_objects.sort();

    } else {

        let objectSet = new Set(d.own_objects);
        d.objects.forEach(item => objectSet.add(item));
        objString = Array.from(objectSet).sort();

    }

    // objString = getAllOwnObjectsFromChildren(d).toString() + 'XX';
    return objString.toString();
}




