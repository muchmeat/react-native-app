import t, {mixin} from "tcomb-validation";

export function getOptionsOfEnum(type) {
    const enums = type.meta.map;
    return Object.keys(enums).map(value => {
        return {
            value,
            text: enums[value]
        };
    });
}

export function getTypeInfo(type) {
    let innerType = type;
    let isMaybe = false;
    let isSubtype = false;
    let kind;
    let innerGetValidationErrorMessage;

    while (innerType) {
        kind = innerType.meta.kind;
        if (t.Function.is(innerType.getValidationErrorMessage)) {
            innerGetValidationErrorMessage = innerType.getValidationErrorMessage;
        }
        if (kind === "maybe") {
            isMaybe = true;
            innerType = innerType.meta.type;
            continue;
        }
        if (kind === "subtype") {
            isSubtype = true;
            innerType = innerType.meta.type;
            continue;
        }
        break;
    }

    const getValidationErrorMessage = innerGetValidationErrorMessage
        ? (value, path, context) => {
            const result = t.validate(value, type, {path, context});
            if (!result.isValid()) {
                for (let i = 0, len = result.errors.length; i < len; i++) {
                    if (
                        t.Function.is(result.errors[i].expected.getValidationErrorMessage)
                    ) {
                        return result.errors[i].message;
                    }
                }
                return innerGetValidationErrorMessage(value, path, context);
            }
        }
        : undefined;

    return {
        type,
        isMaybe,
        isSubtype,
        innerType,
        getValidationErrorMessage
    };
}

// thanks to https://github.com/epeli/underscore.string

function underscored(s) {
    return s
        .trim()
        .replace(/([a-z\d])([A-Z]+)/g, "$1_$2")
        .replace(/[-\s]+/g, "_")
        .toLowerCase();
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function humanize(s) {
    return capitalize(
        underscored(s)
            .replace(/_id$/, "")
            .replace(/_/g, " ")
    );
}

export function merge(a, b) {
    return mixin(mixin({}, a), b, true);
}

export function move(arr, fromIndex, toIndex) {
    const element = arr.splice(fromIndex, 1)[0];
    arr.splice(toIndex, 0, element);
    return arr;
}

export class UIDGenerator {
    constructor(seed) {
        this.seed = "tfid-" + seed + "-";
        this.counter = 0;
    }

    next() {
        return this.seed + this.counter++; // eslint-disable-line space-unary-ops
    }
}

function containsUnion(type) {
    switch (type.meta.kind) {
        case "union":
            return true;
        case "maybe":
        case "subtype":
            return containsUnion(type.meta.type);
        default:
            return false;
    }
}

function getUnionConcreteType(type, value) {
    const kind = type.meta.kind;
    if (kind === "union") {
        const concreteType = type.dispatch(value);
        if (process.env.NODE_ENV !== "production") {
            t.assert(
                t.isType(concreteType),
                () =>
                    "Invalid value " +
                    t.assert.stringify(value) +
                    " supplied to " +
                    t.getTypeName(type) +
                    " (no constructor returned by dispatch)"
            );
        }
        return concreteType;
    } else if (kind === "maybe") {
        return t.maybe(getUnionConcreteType(type.meta.type, value), type.meta.name);
    } else if (kind === "subtype") {
        return t.subtype(
            getUnionConcreteType(type.meta.type, value),
            type.meta.predicate,
            type.meta.name
        );
    }
}

export function getTypeFromUnion(type, value) {
    if (containsUnion(type)) {
        return getUnionConcreteType(type, value);
    }
    return type;
}

function getUnion(type) {
    if (type.meta.kind === "union") {
        return type;
    }
    return getUnion(type.meta.type);
}

function findIndex(arr, element) {
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === element) {
            return i;
        }
    }
    return -1;
}

export function getComponentOptions(options, defaultOptions, value, type) {
    if (t.Nil.is(options)) {
        return defaultOptions;
    }
    if (t.Function.is(options)) {
        return options(value);
    }
    if (t.Array.is(options) && containsUnion(type)) {
        const union = getUnion(type);
        const concreteType = union.dispatch(value);
        const index = findIndex(union.meta.types, concreteType);
        // recurse
        return getComponentOptions(
            options[index],
            defaultOptions,
            value,
            concreteType
        );
    }
    return options;
}

export function convertUTCTimeToLocalTime(UTCDateString) {
    if (!UTCDateString) {
        return '-';
    }

    function formatFunc(str) {    //格式化显示
        return str > 9 ? str : '0' + str
    }

    let date2 = new Date(UTCDateString);     //这步是关键

    return date2.toLocaleString();
}

function dateFtt(fmt, date) { //author: meizz
    let o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export function indexOfArray(arr, value, key) {
    for (let i = 0; i <= arr.length; i++) {
        let node = key ? arr[i][key] : arr[i];
        if (value === node) {
            return i;
        }
    }
    return -1;
}


/* eslint-disable */
export let breadthFirstRecursion = (treeData, params) => {
    /**
     *  树结构广度优先遍历
     * @param treeData 树形结构数组数据, type=array
     * @params params：参数,用于说明_menus中父子节点的名称, type=object
     * */
    params = {
        sortCodeName: params && params.sortCodeName ? params.sortCodeName : 'sortCode',
        parentName: params && params.parentName ? params.parentName : 'parent',
        childrenName: params && params.childrenName ? params.childrenName : 'children',
    };
    let childrenNodes = [],
        children = params.childrenName,
        nodes = treeData;
    for (let item in treeData) {
        if (treeData[item][children]) {
            let temp = treeData[item][children];
            childrenNodes = childrenNodes.concat(temp);
        }
    }
    if (childrenNodes.length > 0) {
        nodes = nodes.concat(breadthFirstRecursion(childrenNodes, params));
    }
    return nodes;
};

export let breadthFirstRecursionTreeCheckedData = (treeData, id) => {
    if (!treeData || !id) {
        return
    }
    let params = {
        checked: 'checked',
        parentName: 'parent',
        childrenName: 'children',
        id: 'id',
    };
    let childrenNodes = [],
        children = params.childrenName,
        checked = params.checked,
        keyId = params.id;
    for (let item in treeData) {
        if (id == treeData[item][keyId]) {
            treeData[item][checked] = true;
            return treeData;
        } else {
            let temp = treeData[item][children];
            if (temp) {
                childrenNodes = childrenNodes.concat(temp);
            }
            if (childrenNodes.length > 0) {
                return breadthFirstRecursionTreeCheckedData(childrenNodes, id);
            }
        }
    }
};

/**
 * 递归处理树结构数据的checked属性为false
 * @param treeData
 * @param newarr
 */
export function recursionTreeUnChecked(treeData) {
    let i = 0;
    let len = treeData.length;
    for (; i < len; i++) {
        treeData[i]["checked"] = false;
        if (treeData[i].children && treeData[i].children.length > 0) {
            recursionTreeUnChecked(treeData[i].children);
        }
    }
}