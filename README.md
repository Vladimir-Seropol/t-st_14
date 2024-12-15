Добрый день.
Этот редактор  для решения предустановленных задач на языках JS и PHP

запуск:
npm i
npm run dev

пример решения задачи на JS :function sum(numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
      total += numbers[i];
    }
    return total; 
  }
  return sum([1, 2, 3]);

  
  пример решения задачи на PHP : 
function getStringLength(string $str): int {
  return strlen($str);
}
echo getStringLength("hello"); 
