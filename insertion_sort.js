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

// Função de Insertion Sort
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;

    // Move os elementos maiores que "current" para uma posição à frente
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }

    // Insere o elemento na posição correta
    array[j + 1] = current;
  }
  return array;
}

// Principal
function main() {
  const filename = "array_data.txt";
  const array = readArrayFromFile(filename);

  if (array) {
    console.log("Array original:", array);

    // Medindo o tempo de execução do Insertion Sort
    const startTime = performance.now(); // Início
    const sortedArray = insertionSort(array);
    const endTime = performance.now(); // Fim

    console.log("Array ordenado:", sortedArray);
    console.log(`Tempo de execução do Insertion Sort: ${(endTime - startTime).toFixed(4)} ms`);
  } else {
    console.error("Falha ao processar o arquivo.");
  }
}

// Executa o programa
main();
