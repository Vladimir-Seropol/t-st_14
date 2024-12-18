/* eslint-disable no-useless-escape */
import "./App.css";
import { useState } from "react";
import Selector from "./components/Selector";
import Output from "./components/Output";
import { executeCode } from "./services/server";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import MonacoEditor from "react-monaco-editor";


const taskJS = `
// Ваше решение напишите здесь
function sum(numbers) {
  // Ваше решение
}
`;
const taskJSX = `

 * Задача:
 * Напишите функцию, которая возвращает сумму чисел в массиве.
 *
 * Пример:
 * sum([1, 2, 3]); // должно вернуть 6
`;

const taskPHP = `
// Ваше решение напишите здесь
function getStringLength(str) {
  // Ваше решение
}
`;

const taskPHPX = `
 * Задача:
 * Напишите функцию, которая возвращает длину строки.
 *
 * Пример:
 * getStringLength("hello"); // должно вернуть 5
`;


monaco.languages.register({ id: "php" });
monaco.languages.setMonarchTokensProvider("php", {
  tokenizer: {
    root: [

      [/<\?php/, "tag"],
      [/\?>/, "tag"],

      [/\b(?:echo|print|return|if|else|elseif|while|for|foreach|switch|case|default|break|continue|function|class|public|protected|private|static|new|try|catch|finally|throw|extends|implements|interface|abstract|namespace|use|as|require|include|require_once|include_once|global|isset|unset|empty)\b/, "keyword"],

      [/\b(?:strlen|array|count|in_array|array_push|array_pop|array_merge|explode|implode|str_replace|substr|trim|rtrim|ltrim|json_encode|json_decode)\b/, "builtin-function"],

      [/\$[a-zA-Z_][\w]*/, "variable"],

      [/->\w+/, "property"],

      [/'[^']*'/, "string"],
      [/"[^"\\]*(?:\\.[^"\\]*)*"/, "string"],

      [/\b\d+\.?\d*\b/, "number"],

      [/\/\/[^\n]*/, "comment"], 
      [/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//, "comment"], 

      [/[{}\[\]()]/, "delimiter"],
      [/[+\-*\/=<>!%&|^]/, "operator"],

      [/(\['[^']*'\])|(\[\d+\])/, "array-key"],

      [/\b[a-zA-Z_][\w]*\(/, "function"],
    ],
  },
});


monaco.languages.register({ id: "javascript" });
monaco.languages.setMonarchTokensProvider("javascript", {
  tokenizer: {
    root: [
      [
        /\b(?:var|let|const|function|return|if|else|while|for|switch|case|break|continue|try|catch|finally)\b/,
        "keyword",
      ],
      [/\bconsole\b/, "console"], 
      [/\.log\b/, "log"], 
      [/\bkey\b/, "key"], 
      [/\bobj\b/, "object"], 
      [/\barr\b/, "array"], 
      [/[a-zA-Z_]\w*/, "variable"],
      [/\b\d+\b/, "number"],
      [/"(\d+)"/, "string"],
      [/'(\d+)'/, "string"],
      [/"([^"\\]|\\.)*$/, "string"],
      [/'([^'\\]|\\.)*$/, "string"],
      [/\/\/[^\n]*/, "comment"],
      [/\/\*[^*]*\*+([^/*][^*]*\*+)*\//, "comment"],
      [/[+\-*\/=<>!%&|^]/, "operator"],
      [/[{}()\[\]]/, "@brackets"],
    ],
  },
});

const App = () => {
    const [code, setCode] = useState(taskJS); 
    const [language, setLanguage] = useState("javascript");
    const [result, setResult] = useState({ status: "", output: "" });
  
    const handleRunCode = async () => {
      const executionResult = await executeCode(language, code);
      setResult(executionResult);
    };
  
    const handleLanguageChange = (selectedLanguage) => {
      setLanguage(selectedLanguage);
      if (selectedLanguage === "javascript") {
        setCode(taskJS);
      } else {
        setCode(taskPHP); 
      }
    };
  
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Редактор кода</h1>
        <Selector selected={language} onChange={handleLanguageChange} />
        {/* Блок для отображения задания */}
      <div style={{ margin: "20px 0", background: "#f4f4f4", padding: "15px", color: "#333" }}>
        <h2 style={{ margin: "0" }}>Задание</h2>
        <pre style={{ margin: "0", whiteSpace: "pre-wrap" }}>{language === "javascript" ? taskJSX : taskPHPX}</pre>
      </div>
        <MonacoEditor
          language={language}
          value={code}
          onChange={(newCode) => setCode(newCode)}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
            // theme: "vs-dark",
          }}
          height="200px"
        />
        <button
          onClick={handleRunCode}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Run
        </button>
        <Output result={result} />
      </div>
    );
  };
  
  export default App;
