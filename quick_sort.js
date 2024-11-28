const fs = require("fs");
const { performance } = require("perf_hooks"); // Importa performance para medir o tempo

// Função de leitura do arquivo
function readArrayFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, "utf-8");
    // Converte os dados do arquivo para um array de números separados por espaços
    const array = data
      .split(/\s+/) // Divide a string por espaços (ou quebras de linha)
      .map((num) => parseFloat(num.trim())); // Remove espaços extras e converte para números
    return array;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
    return null;
  }
}

// Função de Quick Sort
function quickSort(array) {
  if (array.length <= 1) {
    return array; // Base da recursão: arrays com 1 ou 0 elementos já estão ordenados
  }

  const pivot = array[array.length - 1]; // Escolhe o último elemento como pivot
  const left = []; // Elementos menores que o pivot
  const right = []; // Elementos maiores ou iguais ao pivot

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  // Recursivamente ordena as partes e combina com o pivot
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Principal
function main() {
  const filename = "array_data.txt";
  const array = readArrayFromFile(filename);

  if (array) {
    console.log("Array original:", array);

    // Medindo o tempo de execução do Quick Sort
    const startTime = performance.now(); // Início
    const sortedArray = quickSort(array);
    const endTime = performance.now(); // Fim

    console.log("Array ordenado:", sortedArray);
    console.log(`Tempo de execução do Quick Sort: ${(endTime - startTime).toFixed(4)} ms`);
  } else {
    console.error("Falha ao processar o arquivo.");
  }
}

// Executa o programa
main();
