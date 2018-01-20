module uniLib {

    /**
     * @private
     */
    var getDefinitionByNameCache = {};

    export function getDefinitionByName(name: string): any {
        if (!name)
            return null;
        var definition = getDefinitionByNameCache[name];
        if (definition) {
            return definition;
        }
        var paths = name.split(".");
        var length = paths.length;
        definition = __uglobal;
        for (var i = 0; i < length; i++) {
            var path = paths[i];
            definition = definition[path];
            if (!definition) {
                return null;
            }
        }
        getDefinitionByNameCache[name] = definition;
        return definition;
    }

    export function test(name: string): void {
        var regstr: string = "^" + name + ".";
        for (var i in getDefinitionByNameCache) {
            if (i.match(regstr)) {
                console.error("匹配成功:" + i);
            }
        }
    }

    export function delDefinitionByName(name: string): void {
        if (!name)
            return null;
        var regstr: string = "^" + name + ".";
        if (name.indexOf(".") == -1) {
            for (var i in getDefinitionByNameCache) {
                if (i.match(regstr)) {
                    getDefinitionByNameCache[i] = null;
                    delete getDefinitionByNameCache[i];
                }
            }
        } else {
            getDefinitionByNameCache[name] = null;
            delete getDefinitionByNameCache[name];
        }
    }


    export function getQualifiedSuperclassName(value) {
        if (!value || (typeof value != "object" && !value.prototype)) {
            return null;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        var superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        var superClass = getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }

    export function getQualifiedClassName(value) {
        var type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        if (prototype.hasOwnProperty("__class__")) {
            return prototype["__class__"];
        }
        var constructorString = prototype.constructor.toString().trim();
        var index = constructorString.indexOf("(");
        var className = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__class__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }

}

var __uglobal = __uglobal || this;