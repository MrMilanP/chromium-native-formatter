import*as e from "../../core/platform/platform.js";
import*as t from "./formatter_worker.js";
e.HostRuntime.HOST_RUNTIME.workerScope.onmessage = function(r) {
    const o = r.data.method
      , s = r.data.params;
    if (o)
        switch (o) {
        case "format":
            e.HostRuntime.HOST_RUNTIME.workerScope.postMessage(t.FormatterWorker.format(s.mimeType, s.content, s.indentString));
            break;
        case "parseCSS":
            t.CSSRuleParser.parseCSS(s.content, self.postMessage);
            break;
        case "javaScriptSubstitute":
            e.HostRuntime.HOST_RUNTIME.workerScope.postMessage(t.Substitute.substituteExpression(s.content, s.mapping));
            break;
        case "javaScriptScopeTree":
            e.HostRuntime.HOST_RUNTIME.workerScope.postMessage(t.ScopeParser.parseScopes(s.content, s.sourceType)?.export());
            break;
        default:
            e.assertNever(o, `Unsupport method name: ${o}`)
        }
}
,
e.HostRuntime.HOST_RUNTIME.workerScope.postMessage("workerReady");
//# sourceMappingURL=formatter_worker-entrypoint.js.map
