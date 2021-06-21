"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = void 0;
var State;
(function (State) {
    State["Pending"] = "Pending";
    State["Success"] = "Success";
    State["Failure"] = "Failure";
})(State || (State = {}));
function updateTask(task, completed) {
    return __assign(__assign({}, task), { status: {
            updated: new Date().toISOString(),
            state: completed ? State.Success : State.Failure
        } });
}
exports.updateTask = updateTask;
//# sourceMappingURL=update-task.js.map