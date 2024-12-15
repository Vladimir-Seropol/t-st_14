export const executeCode = async (language, code) => {
    if (language === "javascript") {
      try {
        const logs = [];
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          logs.push(args.join(" "));
          originalConsoleLog(...args);  
        };
  
        // Выполнение переданного кода
        const evalResult = new Function(code)(); 
  
        console.log = originalConsoleLog;  
  
        console.log('evalResult:', evalResult); 
  
        // Проверка на корректность суммы
        if (typeof evalResult === 'number') {
          return { status: "success", output: `Правильное решение! Сумма: ${evalResult}` };
        } else {
          return {
            status: "error",
            error: `Ошибка: неверный результат. Получено: ${evalResult}`  
          };
        }
  
      } catch (error) {
        return {
          status: "error",
          error: `Ошибка выполнения кода: ${error.message}`  
        };
      }
    } else if (language === "php") {
      try {
        const response = await fetch("http://localhost:5000/execute.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to execute PHP code");
        }
  
        const data = await response.json();
  
        // Проверка задачи: PHP
        if (data.output.includes('getStringLength("hello")')) {
          if (data.output.trim() === "5") {
            return { status: "success", output: "Правильное решение!" };
          } else {
            return { status: "error", error: "Ошибка: неверный результат." };
          }
        }
  
        return data;
      } catch (error) {
        return { status: "error", error: error.message };
      }
    } else {
      return { status: "error", error: "Unsupported language." };
    }
  };
  