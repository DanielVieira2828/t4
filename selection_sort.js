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

// Função de Selection Sort
function selectionSort(array) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Encontra o índice do menor elemento na sublista desordenada
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    // Troca o menor elemento encontrado com o elemento na posição atual
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }

  return array;
}

// Principal
function main() {
  const filename = "array_data.txt";
  const array = readArrayFromFile(filename);

  if (array) {
    console.log("Array original:", array);

    // Medindo o tempo de execução do Selection Sort
    const startTime = performance.now(); // Início
    const sortedArray = selectionSort(array);
    const endTime = performance.now(); // Fim

    console.log("Array ordenado:", sortedArray);
    console.log(`Tempo de execução do Selection Sort: ${(endTime - startTime).toFixed(4)} ms`);
  } else {
    console.error("Falha ao processar o arquivo.");
  }
}

// Executa o programa
main();
