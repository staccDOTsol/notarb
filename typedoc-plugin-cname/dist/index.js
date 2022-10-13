"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typedoc_1 = require("typedoc");
const events_1 = require("typedoc/dist/lib/output/events");
function load(host) {
    const app = host.application;
    app.options.addDeclaration({
        name: 'cname',
        help: 'Add CNAME file to the output directory with the provided content',
        type: typedoc_1.ParameterType.String,
        defaultValue: '',
    });
    app.renderer.once(events_1.RendererEvent.END, (context) => {
        const cnameValue = app.options.getValue('cname');
        if (typeof cnameValue === 'string' && cnameValue.length > 0) {
            fs_1.default.writeFileSync(path_1.default.resolve(context.outputDirectory, 'CNAME'), cnameValue);
        }
    });
}
exports.load = load;
